import uuid
from django.db import models
from django.contrib.auth import get_user_model


class Message(models.Model):
    """
        Message model

        - owner: owner of the message
        - text: content of the message
        - timestamp: timestamp of the message
    """
    owner = models.ForeignKey(
        'users.CustomUser', related_name='owner', on_delete=models.CASCADE)
    chat_room = models.ForeignKey('ChatGroup', on_delete=models.CASCADE)
    text = models.CharField(max_length=1000)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"'{self.text}' by '{self.owner.username}' in '{self.chat_room}' "


class ChatGroup(models.Model):
    """
        Chat group model

        - id: UUID of chat
        - group_name: Name of the chat group
        - owner: Owner of the group
        - participants: People in the chat group
        - messages: Messages shared in the chat group
        - timestamp: Timestamp of group creation
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    group_name = models.CharField(
        max_length=30, blank=False, default="Group name")
    chat_owner = models.ForeignKey(
        "users.CustomUser", to_field='email', related_name='owner_chat_group', on_delete=models.CASCADE)
    participants = models.ManyToManyField(
        'users.CustomUser', related_name='participant_chat_group', blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.group_name


class Invitation(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    chat_room = models.ForeignKey(
        'ChatGroup', related_name='chat_room_invitation', default='', on_delete=models.CASCADE)
    participant_email = models.CharField(
        max_length=59, default='yatint5@gmail.com')

    def __str__(self):
        return f'{self.participant_email} was invited to {self.chat_room}'

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['chat_room', 'participant_email'],
                                    name='one invitation per email per chat room')
        ]
