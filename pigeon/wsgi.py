# wsgi file - to configure wsgi
import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pigeon.settings')
application = get_wsgi_application()
