from django.core.exceptions import ImproperlyConfigured
from django.utils.deprecation import MiddlewareMixin
from django.utils.functional import SimpleLazyObject
from django.contrib.auth import get_user_model
User = get_user_model()

# https://stackoverflow.com/a/5377282/11573842
# ^ replacing the default get_user function
# Modified version of this: https://github.com/django/django/blob/d7394cfa13a4d1a02356e3a83e10ec100fbb9948/django/contrib/auth/__init__.py#L169


def get_user(request):
    """
    Return the user model instance associated with the given request session.
    If no user is retrieved, return an instance of `AnonymousUser`.
    """
    from django.contrib.auth.models import AnonymousUser
    user = None
    try:
        user_id = request.session['user_id']
    except KeyError:
        pass
    else:
        user = User.objects.get(id=user_id)
        session_id = request.COOKIES['sessionid']
        from django.utils.crypto import constant_time_compare
        session_id_verified = session_id and constant_time_compare(
            session_id,
            user.get_session_auth_hash()
        )
        if not session_id_verified:
            if not session_id:
                request.session.flush()
                user = None

    return user or AnonymousUser()


# taken from https://github.com/django/django/blob/d7394cfa13a4d1a02356e3a83e10ec100fbb9948/django/contrib/auth/middleware.py#L9
class AuthenticationMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if not hasattr(request, 'session'):
            raise ImproperlyConfigured(
                "The Django authentication middleware requires session "
                "middleware to be installed. Edit your MIDDLEWARE setting to "
                "insert "
                "'django.contrib.sessions.middleware.SessionMiddleware' before "
                "'django.contrib.auth.middleware.AuthenticationMiddleware'."
            )
        request.user = SimpleLazyObject(lambda: get_user(request))
