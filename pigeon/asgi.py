# the asgi configuration file is used to configure ASGI settings of the
# app
import os
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack
import backend.chat.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pigeon.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),  # for http protocol we are using asgi application
    # for websockets we are using the routing file from the chat backend
    "websocket": AuthMiddlewareStack(URLRouter(backend.chat.routing.websocket_urlpatterns)),
})
