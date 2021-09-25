import json
import re
from backend.chat.utils import filter_email
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth import get_user_model
from django.contrib.sessions.models import Session
from .models import ChatGroup, Invitation

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
        self.user_email = None

        try:
            headers = self.scope['headers']
        except KeyError:
            await self.close()

        for (key, value) in headers:
            if key == b"cookie":
                string = value.decode('utf-8')  # convert bytes to string
                self.session_id = re.findall(
                    r'sessionid=([\w]{32})',
                    string
                )[0]  # get the session id
                try:
                    self.user_email = await get_user_email(self.session_id)
                except Exception as e:
                    await self.close()

        all_ok = await check_exists_and_authenticated(self.user_email)
        if all_ok:
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
