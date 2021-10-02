# the asgi configuration file is used to configure ASGI settings of the
# app
from channels.middleware import BaseMiddleware
import os
import django
import backend.chat.routing
from channels.middleware import BaseMiddleware
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
import backend.chat.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pigeon.settings')
django.setup()

application = ProtocolTypeRouter({
    "http": get_asgi_application(),  # for http protocol we are using asgi application
    "websocket": BaseMiddleware(
        URLRouter(backend.chat.routing.websocket_urlpatterns)
    )
})
