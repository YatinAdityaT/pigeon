# from .models import Participant
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
from django.contrib import admin
from .models import Message, ChatGroup, Invitation

admin.site.register(Message)
admin.site.register(ChatGroup)
admin.site.register(Invitation)

admin.site.unregister(Group)
