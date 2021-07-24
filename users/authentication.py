import json

from rest_framework.response import Response
from users import serializers
from django.contrib.auth import get_user_model
from rest_framework import authentication, exceptions
from django.contrib.auth import authenticate
from .serializers import LoginSerializer


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
            raise exceptions.AuthenticationFailed("No such user exists")

        credentials = {'username': email, 'password': password}

        user = authenticate(**credentials)

        if not user:
            raise exceptions.AuthenticationFailed("No such user exists")

        if not user.is_active:
            raise exceptions.AuthenticationFailed(
                'User is not active. Check you email for activation mail.')

        return (user, None)
