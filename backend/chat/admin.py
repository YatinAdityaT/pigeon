# from .models import Participant
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
from django.contrib import admin
from .models import Message, ChatGroup, Invitation

admin.site.register(Message)
admin.site.register(ChatGroup)
admin.site.register(Invitation)

admin.site.unregister(Group)


# class CustomParticipantAdmin(UserAdmin):
#     list_display = ('email', 'username',
#                     'is_admin', 'is_active')
#     fieldsets = (
#         (None, {'fields': ('email',
#                            'username', 'password')}),
#         ('Permissions', {
#             'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
#         }),
#     )

#     add_fieldsets = (
#         (None, {
#             'classes': ('wide',),
#             'fields': ('username', 'password1', 'password2', 'email')}
#          ),
#     )


# try:
#     admin.site.unregister(Participant)
# except:
#     pass

# admin.site.register(Participant, CustomParticipantAdmin)
