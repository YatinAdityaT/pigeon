# the asgi configuration file is used to configure ASGI settings of the
# app
from channels.security.websocket import AllowedHostsOriginValidator
from channels.middleware import BaseMiddleware
from channels.db import database_sync_to_async
import os
from channels.routing import ProtocolTypeRouter, URLRouter
from django.contrib.sessions.models import Session
from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack
import backend.chat.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pigeon.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),  # for http protocol we are using asgi application
    "websocket": BaseMiddleware(
        URLRouter(backend.chat.routing.websocket_urlpatterns)
    )
})
