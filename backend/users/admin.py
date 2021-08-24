from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'username',
                    'is_admin', 'is_active')
    fieldsets = (
        (None, {'fields': ('email',
                           'username', 'password')}),
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2', 'email')}
         ),
    )


try:
    admin.site.unregister(User)
except:
    pass

admin.site.register(CustomUser, CustomUserAdmin)
