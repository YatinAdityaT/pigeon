from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from users.authentication import EmailCustomAuthentication


# Session view: returns if a user is authenticated or not
class SessionView(APIView):
    authentication_classes = [
        EmailCustomAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get(request, format=None):
        return JsonResponse({'isAuthenticated': True})


# Returns the logged in user's email id
class WhoAmIView(APIView):
    authentication_classes = [SessionAuthentication, EmailCustomAuthentication]
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get(request, format=None):
        return JsonResponse({'email': request.user.email})


# Returns the CSRF token currently in use
def get_csrf(request):
    response = JsonResponse({'details': 'CSRF cookie set'})
    response['X-CSRFToken'] = get_token(request)
    return response


# Logs a user in
class LoginView(APIView):
    authentication_classes = [SessionAuthentication,
                              EmailCustomAuthentication]

    def post(self, request):
        return Response(f'The user was logged in')

# Logs a user out


@ensure_csrf_cookie
def logout_view(request):
    try:
        del request.session['user_id']
    except KeyError:
        return JsonResponse({'details': 'You are not logged in!'})
    return JsonResponse({"details": "Successfully logged out"})
