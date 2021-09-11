from django.core.exceptions import ImproperlyConfigured
from django.utils.deprecation import MiddlewareMixin
from django.utils.functional import SimpleLazyObject
from django.contrib.auth import get_user_model
User = get_user_model()

# https://stackoverflow.com/a/5377282/11573842
# ^ replacing the default get_user function
# Modified version of this: https://github.com/django/django/blob/d7394cfa13a4d1a02356e3a83e10ec100fbb9948/django/contrib/auth/__init__.py#L169
SESSION_KEY = '_auth_user_id'
BACKEND_SESSION_KEY = '_auth_user_backend'
HASH_SESSION_KEY = '_auth_user_hash'


def get_user(request):
    """
    Return the user model instance associated with the given request session.
    If no user is retrieved, return an instance of `AnonymousUser`.
    """
    from django.contrib.auth.models import AnonymousUser
    user = None
    try:
        user_id = request.session['user_id']
        user = User.objects.get(email=user_id)
        session_id = request.COOKIES['sessionid']
    except Exception as e:
        pass
    else:
        if not session_id:
            request.session.flush()
            user = None

    if user != None:
        return user
    else:
        return AnonymousUser()


# taken from https://github.com/django/django/blob/d7394cfa13a4d1a02356e3a83e10ec100fbb9948/django/contrib/auth/middleware.py#L9
class CustomAuthenticationMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if not hasattr(request, 'session'):
            raise ImproperlyConfigured(
                "The Django authentication middleware requires session "
                "middleware to be installed. Edit your MIDDLEWARE setting to "
                "insert "
                "'django.contrib.sessions.middleware.SessionMiddleware' before "
                "'django.contrib.auth.middleware.AuthenticationMiddleware'."
            )
        request.custom_user = get_user(request)
