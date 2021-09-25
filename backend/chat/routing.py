# chat/routing.py
from django.urls import re_path
from .consumers import PrivateChannelConsumer  # ,  ChatConsumer

websocket_urlpatterns = [
    re_path(r'^chat/', PrivateChannelConsumer.as_asgi()),
    # re_path(r'^chat/(?P<group_id>[\w-]{36})/$', ChatConsumer.as_asgi()),
]
