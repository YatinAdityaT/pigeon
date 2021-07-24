import json

from django.contrib.auth import authenticate, get_user_model
from rest_framework import authentication, exceptions

User = get_user_model()


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
            raise exceptions.AuthenticationFailed("No such user exists.")

        credentials = {'username': email, 'password': password}

        user = authenticate(**credentials)

        if not user:
            raise exceptions.AuthenticationFailed("No such user exists.")

        if not user.is_active:
            raise exceptions.AuthenticationFailed(
                'User is not active. Check you email for activation mail.')

        request.session['user_id'] = user.pk
        return (user, None)
