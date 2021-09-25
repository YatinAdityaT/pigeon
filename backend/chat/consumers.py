import json
import re
from backend.chat.utils import filter_email
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth import get_user_model
from django.contrib.sessions.models import Session
from .models import ChatGroup, Invitation, Message

User = get_user_model()


@database_sync_to_async
def get_user_email(session_id):
    """
        Gets the user's email from a given
        session_id
    """
    value = None
    session = Session.objects.get(session_key=session_id)
    decoded = session.get_decoded()

    try:
        value = decoded['user_id']

    except KeyError:
        # for admin users
        try:
            value = decoded['_auth_user_id']
        except:
            value = None
    return value


@database_sync_to_async
def check_exists_and_authenticated(user_email):
    """
        Check if the user exists and is authenticated
    """
    if user_email == None:
        return False
    try:
        user = User.objects.get(email=user_email)
        if not user.is_authenticated:
            return False
    except:
        return False
    return True


@database_sync_to_async
def update_private_channel_layer_value(user_email, value):
    """
        Sets the private_channel_layer field in
        the user model to the channel's name
    """
    user = User.objects.get(email=user_email)
    user.private_channel_layer = value
    user.save()


@database_sync_to_async
def send_group_names(user_email):
    """
        Takes the user's email as input and
        returns their chat group names
    """
    group_names = []
    invitations = Invitation.objects.filter(participant_email=user_email)
    for invitation in invitations:
        chat_room_id = invitation.chat_room_id
        chat_room_name = ChatGroup.objects.get(id=chat_room_id).group_name
        group_names.append((str(chat_room_id), chat_room_name))
    return group_names


def get_session_id(value):
    """
        Convert the value to string.
        Extract the session id and return it
    """
    string = value.decode('utf-8')
    regex = r'sessionid=([\w]{32})'
    return re.findall(regex, string)[0]


async def get_user_email_and_session_data(scope):
    """
        Extract the session id & user_email and 
        return them and whether access should be
        granted or not
    """
    output = {'access': False}
    user_email = None
    session_id = None

    try:
        headers = scope['headers']
    except KeyError:
        return output

    for (key, value) in headers:
        if key == b"cookie":
            try:
                session_id = get_session_id(value)
                user_email = await get_user_email(session_id)
            except Exception as e:
                return output

    if await check_exists_and_authenticated(user_email):
        output['access'] = True
        output['user_email'] = user_email
        output['session_id'] = session_id

    return output


@database_sync_to_async
def send_group_messages(chat_id):
    """
        Returns all messages on a given chat id
    """
    messages = []
    queryset = Message.objects.filter(
        chat_room__id=chat_id)

    for value in queryset:
        messages.append([value.owner.username, value.owner.email, value.text])

    return messages


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
            object. If so, then sends then the lattest list of groups
        """
        if event['email'] == self.user_email:
            group_names = await send_group_names(self.user_email)
            await self.send(json.dumps(group_names))

    async def send_messages(self, event):
        """
            Sends the requested chat room's messages
        """
        print('send messages called')
        messages = await send_group_messages(event['chat_id'])
        await self.send(json.dumps(messages))


@database_sync_to_async
def get_private_layer_name(user_email):
    return User.objects.get(email=user_email).private_channel_layer


class GroupChannelConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        """
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

            self.room_group_name = await get_private_layer_name(self.user_email)
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
