from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'username', 'date_joined',
                    'last_login', 'is_admin', 'is_active')
    fields = ('email', 'username', 'is_active')
    search_fields = ('email', 'username')
    readonly_fields = ('id', 'date_joined', 'last_login')
    filter_horizontal = ()
    last_filter = ()
    fieldsets = ()


admin.site.register(CustomUser, CustomUserAdmin)
