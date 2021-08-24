# used for login view. Authenticates the user given the email and password
from django.utils.module_loading import import_string
import json

from django.contrib.auth import SESSION_KEY, authenticate, get_user_model
from rest_framework import authentication, exceptions

User = get_user_model()


# taken from django/contrib/auth/__init__.py
SESSION_KEY = '_auth_user_id'
BACKEND_SESSION_KEY = '_auth_user_backend'


def load_backend(path):
    return import_string(path)()


class EmailCustomAuthentication(authentication.BasicAuthentication):
    def authenticate(self, request):
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        if not email:
            raise exceptions.AuthenticationFailed('No email provided.')
        if not password:
            raise exceptions.AuthenticationFailed('No password provided.')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise exceptions.AuthenticationFailed(
                "Incorrect email provided. No such user exists for this email.")

        credentials = {'username': email, 'password': password}

        if not user.is_active:
            raise exceptions.AuthenticationFailed(
                'The user account has not been active. Check your mailbox for activation mail & click on the activation url to activate your account.')

        user = authenticate(**credentials)

        if not user:
            raise exceptions.AuthenticationFailed(
                "Incorrect password provided.")

        request.session['user_id'] = user.pk
        return (user, None)

    # https://stackoverflow.com/a/5377282/11573842
    def get_user(request):
        print('get_user called!')
        from django.contrib.auth.models import AnonymousUser
        try:
            user_id = request.session[SESSION_KEY]
            backend_path = request.session[BACKEND_SESSION_KEY]
            backend = load_backend(backend_path)
            user = backend.get_user(user_id) or AnonymousUser()
            print(user, user_id)
        except KeyError:
            user = AnonymousUser()
        return user
