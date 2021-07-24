# Views are used to return a HTTP (web) response, webpage,
# redirect, error, image etc

# from rest_framework.response import Response  # to return a HTTP response
# from rest_framework.decorators import api_view  # for functional views

# from .serializers import RegistrationSerializer


# @api_view(['POST', ])
# def registration_view(request):
#     # Here I have created a functional view that accepts POST requests
#     # for user registration. This view takes in the registation request
#     # and returns a response that, if successful, will contain the email
#     # and username of the user else, if failed, will contain the error

#     # create serializers using the RegistrationSerializer
#     serializers = RegistrationSerializer(data=request.data)
#     data = {}  # output data that will be sent out as a response
#     if serializers.is_valid():
#         # if the serializer is valid then store the username and email in the
#         # data dictionary
#         account = serializers.save()
#         data['response'] = 'successfully registered a new user.'
#         data['email'] = account.email
#         data['username'] = account.username
#     else:
#         data = serializers.errors
#     return Response(data)

from users import serializers
from rest_framework.response import Response
from django.contrib import auth
from django.contrib.auth import authenticate, login, logout
import json
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import ensure_csrf_cookie
from django.middleware.csrf import get_token
from rest_framework import permissions
from rest_framework import authentication
from rest_framework.authentication import SessionAuthentication
from users.authentication import EmailCustomAuthentication

from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.http import JsonResponse


# class UserActivationView(APIView):
#     def get(self, request, uid, token):
#         protocol = "https://" if request.is_secure() else "http://"
#         web_url = protocol + request.get_host()
#         post_url = web_url + '/auth/users/activation/'
#         post_data = {'uid': uid, "token": token}
#         print(f"Sending request to {post_url} with {post_data}")
#         headers = {'Content-Type': 'application/json'}
#         result = requests.post(post_url, data=post_data, headers=headers)
#         return Response(result.text)

#     # This view is reached when a user clicks on the activate your account link
#     # it extracts the web_url, uid and token from the request and sends a request of
#     # its own to /activate/ to activate the user account. The result of this request is
#     # returned as a response

# https://testdriven.io/blog/django-spa-auth/#django-drf-frontend-served-separately-same-domain
class SessionView(APIView):
    authentication_classes = [
        EmailCustomAuthentication, SessionAuthentication, ]
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get(request, format=None):
        return JsonResponse({'isAuthenticated': True})


class WhoAmIView(APIView):
    authentication_classes = [SessionAuthentication, EmailCustomAuthentication]
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get(request, format=None):
        return JsonResponse({'email': request.user.email})


def get_csrf(request):
    response = JsonResponse({'details': 'CSRF cookie set'})
    response['X-CSRFToken'] = get_token(request)
    return response


class LoginView(APIView):
    authentication_classes = [SessionAuthentication,
                              EmailCustomAuthentication]

    def post(self, request):
        content = {'user': request.user, 'auth': request.auth}
        return Response(f'The user was logged in')
        # return Response(serializer.data)


def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'details': 'You are not logged in.'}, status=400)
    logout(request)
    return JsonResponse({"details": "Successfully logged out"})


@ensure_csrf_cookie
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"isAuthenticated": False})
    return JsonResponse({"isAuthenticated": True})


def whoami_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})
    return JsonResponse({'email': request.user.email})
