from django.contrib.auth.models import Group
from django.contrib import admin
from .models import Message, ChatGroup, Participant

admin.site.register(Message)
admin.site.register(Participant)
admin.site.register(ChatGroup)
admin.site.unregister(Group)
