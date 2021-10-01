import re
from django.contrib.sessions.models import Session
from .models import ChatGroup, Invitation, Message
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
User = get_user_model()


def filter_email(email):
    """
        Removes all charecters except a-z A-Z 0-9 
        and literal . and -
    """
    return re.sub(r'[^a-zA-Z0-9.\-]', '', email)


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
    invitations = Invitation.objects.filter(
        participant_email=user_email
    )
    for invitation in invitations:
        chat_room_id = invitation.chat_room_id
        chat = ChatGroup.objects.get(id=chat_room_id)
        chat_room_name = chat.group_name
        chat_room_owner = chat.chat_owner.email
        group_names.append({
            str(chat_room_id): {
                "chat_room_name":   chat_room_name,
                "chat_owner":       chat_room_owner
            }
        },
        )
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
        messages.append({
            "owner_name":  value.owner.username,
            "owner_email":  value.owner.email,
            "text":         value.text,
            "timestamp":    str(value.timestamp)
        })

    return messages


@database_sync_to_async
def get_private_layer_name(user_email):
    """
        Returns the value of private_channel_layer field
        for a given user
    """
    return User.objects.get(email=user_email).private_channel_layer


@database_sync_to_async
def create_message_object(text_data, chat_room, user_email):
    """
        Creates a new message.
    """
    user = User.objects.get(email=user_email)
    chat_room = ChatGroup.objects.get(id=chat_room)
    message = Message.objects.create(
        owner=user, chat_room=chat_room, text=text_data)
    message.save()
    return user.username, message.timestamp
