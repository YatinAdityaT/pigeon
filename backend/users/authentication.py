# used for login view. Authenticates the user given the email and password
import json

from django.contrib.auth import authenticate, get_user_model
from rest_framework import authentication, exceptions

User = get_user_model()


class EmailCustomAuthentication(authentication.BasicAuthentication):
    def authenticate(self, request):
        # print('authenticate called')
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        if not email:
            print('No email')
            raise exceptions.AuthenticationFailed('No email provided.')
        if not password:
            print('No password')
            raise exceptions.AuthenticationFailed('No password provided.')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            print('Incorrect email provided. No such user exists for this email.')
            raise exceptions.AuthenticationFailed(
                "Incorrect email provided. No such user exists for this email.")

        credentials = {'username': email, 'password': password}

        if not user.is_active:
            print('Not active')
            raise exceptions.AuthenticationFailed(
                'The user account has not been active. Check your mailbox for activation mail & click on the activation url to activate your account.')

        user = authenticate(**credentials)
        print(user, credentials)

        if not user:
            print('Incorrect password provided')
            raise exceptions.AuthenticationFailed(
                "Incorrect password provided.")

        request.session['user_id'] = user.pk
        return (user, None)
