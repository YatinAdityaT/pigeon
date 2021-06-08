import uuid
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Message(models.Model):
    owner = models.ForeignKey(
        User, related_name='messages', on_delete=models.CASCADE)
    text = models.CharField(max_length=1000)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username


class Chat(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    group_name = models.CharField(max_length=30, blank=False, default="Chat")
    participants = models.ManyToManyField(
        User, related_name='chats', blank=True)
    messages = models.ManyToManyField(Message, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Chat uuid: {self.id}'
