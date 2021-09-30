import uuid
from asgiref.sync import async_to_sync
from backend.users.models import CustomUser
from channels.layers import get_channel_layer
from django.db import models
from django.core.exceptions import ObjectDoesNotExist


class Message(models.Model):
    """
        Message model

        - id: UUID pk
        - owner: owner of the message, fk
        - text: content of the message
        - timestamp: timestamp of the message
    """
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    owner = models.ForeignKey(
        'users.CustomUser',
        related_name='owner',
        on_delete=models.CASCADE
    )
    chat_room = models.ForeignKey(
        'ChatGroup',
        on_delete=models.CASCADE
    )
    text = models.CharField(max_length=1000)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"'{self.text}' by '{self.owner.username}' in '{self.chat_room}'. Message id: {self.id} "


class ChatGroup(models.Model):
    """
        Chat group model

        - id: UUID of chat, pk
        - group_name: Name of the chat group
        - owner: Owner of the group, fk
        - participants: People in the chat group, m2m
        - timestamp: Timestamp of group creation
    """
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    group_name = models.CharField(
        max_length=30,
        blank=False,
        default="Group name"
    )
    chat_owner = models.ForeignKey(
        "users.CustomUser",
        related_name='owner_chat_group',
        on_delete=models.CASCADE
    )
    participants = models.ManyToManyField(
        'users.CustomUser',
        related_name='participant_chat_group',
        blank=True
    )
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.group_name} : {self.id}"


class Invitation(models.Model):
    """
        Invitation model: people who can speak in a chat group

        - timestamp: date-time of invitation creation
        - chat_room: chat room to which the invitation points to, fk
        - participant_email: email id that is part of the chat group
        - chat_room & participant email together must be unique
    """
    timestamp = models.DateTimeField(auto_now_add=True)
    chat_room = models.ForeignKey(
        'ChatGroup',
        related_name='chat_room_invitation',
        default='',
        on_delete=models.CASCADE
    )
    participant_email = models.CharField(
        max_length=59,
        default='yatint5@gmail.com'
    )

    def __str__(self):
        return f'{self.participant_email} was invited to {self.chat_room}'

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['chat_room', 'participant_email'],
                name='one invitation per email per chat room'
            )
        ]

    def save(self, *args, **kwargs):
        """
            On save of the Invitation object, notify the user
            who was added to added to a group.

            Calls the send_group_list function in 
            PrivateChannelConsumer.
        """
        super().save(*args, **kwargs)

        try:

            channel_layer = get_channel_layer()
            channel_name = CustomUser.objects.get(
                email=self.participant_email).private_channel_layer

            if channel_name:
                async_to_sync(channel_layer.group_send)(
                    channel_name,
                    {
                        "type": "send_group_list",
                        "email": self.participant_email
                    }
                )

        except ObjectDoesNotExist:
            # if the CustomUser doesn't exist then fail silently
            pass
