# Generated by Django 3.2.5 on 2021-10-07 03:31

import backend.users.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('password', models.CharField(
                    max_length=128, verbose_name='password')),
                ('email', models.EmailField(max_length=60, primary_key=True,
                 serialize=False, verbose_name='email address')),
                ('username', models.CharField(max_length=40)),
                ('private_channel_layer', models.CharField(
                    blank=True, max_length=80)),
                ('is_admin', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
                ('date_joined', models.DateTimeField(
                    auto_now_add=True, verbose_name='date joined')),
                ('last_login', models.DateTimeField(
                    auto_now=True, verbose_name='last joined')),
                ('profile_image', models.ImageField(blank=True, default='profile_images/default.png',
                 max_length=255, null=True, upload_to=backend.users.models.CustomUser.return_profile_image_path)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
                 related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.',
                 related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
