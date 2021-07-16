import uuid

from django.conf import settings
from django.db import models

# Use settings.AUTH_USER_MODEL instead of get_user_model if foreign key/many2many relations are involved
# https://stackoverflow.com/a/40954392/11573842
customUserModel = settings.AUTH_USER_MODEL


class Message(models.Model):
    """
        Message model

        - owner: owner of the message
        - text: content of the message
        - timestamp: timestamp of the message
    """
    owner = models.ForeignKey(
        customUserModel, related_name='messages', on_delete=models.CASCADE)
    text = models.CharField(max_length=1000)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message author: {self.user.username}"


class Chat(models.Model):
    """
        Chat model

        - id: UUID of chat
        - group_name: Name of the chat group
        - owner: Owner of the group
        - participants: People in the chat group
        - messages: Messages shared in the chat group
        - timestamp: Timestamp of group creation
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    group_name = models.CharField(max_length=30, blank=False, default="Chat")
    # chat_owner = models.ForeignKey(
    # User, related_name='chats', on_delete=models.CASCADE)
    participants = models.ManyToManyField(
        customUserModel, related_name='chats', blank=True)
    messages = models.ManyToManyField(Message, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Chat uuid: {self.id}'
