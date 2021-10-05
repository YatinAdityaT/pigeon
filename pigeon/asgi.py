# the asgi configuration file is used to configure ASGI settings of the
# app


import django
django.setup()  # WARNING: make sure that this is on top of this file.



from channels.middleware import BaseMiddleware
import os
import backend.chat.routing
from channels.middleware import BaseMiddleware
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application

import backend.chat.routing
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
import os
from channels.middleware import BaseMiddleware

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pigeon.settings')
django.setup()

application = ProtocolTypeRouter({
    "http": get_asgi_application(),  # for http protocol we are using asgi application
    "websocket": BaseMiddleware(
        URLRouter(backend.chat.routing.websocket_urlpatterns)
    )
})
