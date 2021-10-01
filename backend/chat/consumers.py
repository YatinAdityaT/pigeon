import json

from backend.chat.utils import (
    create_message_object, filter_email,
    get_private_layer_name,
    get_user_email_and_session_data,
    send_group_messages, send_group_names,
    update_private_channel_layer_value
)
from channels.generic.websocket import AsyncWebsocketConsumer


class PrivateChannelConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        """
        Private channel for the user to receive updates from
        the backend.

        Checks the headers for session cookie. Decodes the session
        cookie and checks if the user exists and is authenticated. 
        If yes, then creates a private channel for them and stores
        the channel's name in their CustomUser object's 
        'private_channel_layer' field, accepts the connection and
        sends them their chat group list.
        """

        output = await get_user_email_and_session_data(self.scope)

        if output['access']:
            self.user_email = output['user_email']
            self.session_id = output['session_id']

            self.room_group_name = "group-list-for-" + \
                filter_email(self.user_email)

            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )

            await self.accept()

            # update the private channel layer value stored in the db
            await update_private_channel_layer_value(
                self.user_email,
                self.room_group_name
            )

            # send group names
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "send_group_list",  # name of handler to the called
                    "email": self.user_email  # bound to succeed in the if statement,
                    # was meant for external access via get_channel_layer()
                }
            )
        else:
            await self.close()

    async def send_group_list(self, event):
        """
            Called via type: "send_group_list" in group_send.
            Checks if the value of email in the dictionary is 
            the same as the email in the current PrivateChannelConsumer
            object. If so, then sends then the lattest list of groups.
            Also sets type to group_list.
        """
        if event['email'] == self.user_email:
            group_names = await send_group_names(
                self.user_email
            )
            message = {
                "type": "groups",
                "group_list": json.dumps(group_names)
            }
            await self.send(json.dumps(message))

    async def send_messages(self, event):
        """
            Sends the requested chat room's messages.
            Sets type to messages.
        """
        messages = await send_group_messages(
            event['chat_id']
        )
        message = {

            "type": "messages",
            "message_list": {
                event['chat_id']: json.dumps(messages)
            }
        }

        await self.send(json.dumps(message))


class GroupChannelConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        """
        Group channel layer/s for chat groups. Users are added to a 
        chat group's channel layer and can receive all messages and 
        can broadcast their messages to all users instantaniously!

        Performs the same authentication/authorization checks and 
        creates a channel with the name = group_id. Then sends the
        pre-existing messages to the user's PRIVATE channel (not this 
        one). 

        Also handels receiving and sending messages
        """
        output = await get_user_email_and_session_data(self.scope)
        if output['access']:
            self.user_email = output['user_email']
            self.session_id = output['session_id']

            self.chat_id = self.scope['url_route']['kwargs']['group_id']

            await self.channel_layer.group_add(
                self.chat_id,
                self.channel_name
            )

            await self.accept()

            self.room_group_name = await get_private_layer_name(
                self.user_email
            )
            await self.send(self.room_group_name)

            # send group's messages on the private layer
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "send_messages",  # name of handler to the called
                    "chat_id": self.chat_id
                }
            )

        else:
            await self.close()

    async def receive(self, text_data):
        """
            Called when the backend recives a message
            from the client
        """
        json_data = json.loads(text_data)
        json_data['owner_name'], datetime = await create_message_object(
            json_data['text'],
            self.chat_id,
            json_data['owner_email']
        )
        json_data['timestamp'] = str(datetime)
        await self.channel_layer.group_send(
            self.chat_id,
            {
                "type": 'send_message_to_group',
                "json_data": json_data
            }
        )

    async def send_message_to_group(self, event):
        """
            Send the message to all the clients in the 
            group
        """
        message = {
            "type": "single_message",
            "data": event['json_data']
        }
        await self.send(json.dumps(message))
