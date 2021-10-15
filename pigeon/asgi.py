# the asgi configuration file is used to configure ASGI settings of the
# app
import django
django.setup()  # WARNING: make sure that this is on top of this file.


from django.core.asgi import get_asgi_application
from channels.security.websocket import OriginValidator
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.middleware import BaseMiddleware
import backend.chat.routing
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pigeon.settings')


application = ProtocolTypeRouter({
    "http": get_asgi_application(),  # for http protocol we are using asgi application
    "websocket": OriginValidator(BaseMiddleware(
        URLRouter(backend.chat.routing.websocket_urlpatterns)
    ), ["*", "http://pigeon-chat-application.herokuapp.com", "http://localhost:8000"])
})
