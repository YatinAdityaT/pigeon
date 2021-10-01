import json
from django.contrib.auth import get_user_model
from django.contrib.sessions.models import Session
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.authentication import SessionAuthentication
from backend.chat.permissions import IsAuthenticated
from rest_framework.views import APIView

from .authentication import EmailCustomAuthentication


class SessionView(APIView):
    # Session view: returns if a user is logged_in or not
    @staticmethod
    def get(request, format=None):
        session_request = request.session
        session_key_request = session_request.session_key

        if not session_key_request:
            return JsonResponse({
                'isLoggedIn': False,
                "error": "Browser didn't attach session cookie"
            }, status=400)

        # see if the session key is also present in the db
        try:
            session_db = Session.objects.get(
                session_key=session_key_request
            )
        except:
            return JsonResponse({
                'isLoggedIn': False,
                "error": "Session key doesn't exist in the database "
            }, status=404)

        # decode the db session key
        session_db_decoded = session_db.get_decoded()

        # see if the user is present in the db
        try:
            user_id_db = session_db_decoded['user_id']
        except KeyError:

            return JsonResponse({
                'isLoggedIn': False,
                "error": "user was not found in the db"
            }, status=400)

        # pull the user id from the cookie
        user_id_request = session_request['user_id']

        # check if the user id in the db is the same as that in
        # the cookie
        if user_id_db != user_id_request:
            return JsonResponse({
                'isLoggedIn': False,
                "error": "User id in cookie doesn't match that in the database"
            }, status=400)

        # get the user object for corresponding to that user id
        User = get_user_model()
        user = User.objects.get(email=user_id_db)

        # check if that user is active and not anonymous
        if not user.is_active or not user.is_authenticated:
            return JsonResponse({
                'isLoggedIn': False,
                "error": "User is not active"
            }, status=400)

        # all good
        return JsonResponse({
            'isLoggedIn': True,
            'user_email': user.email,
            "username": user.username
        })


class WhoAmIView(APIView):
    # Returns the logged in user's email id
    @staticmethod
    def get(request, format=None):
        return JsonResponse({'email': request.user.email})


def get_csrf(request):
    # Returns the CSRF token currently in use
    response = JsonResponse({'detail': 'CSRF cookie set'})
    response['X-CSRFToken'] = get_token(request)
    return response


class LoginView(APIView):
    # Logs a user in (the main work is done by EmailCustomAuthentication)
    authentication_classes = [
        SessionAuthentication,
        EmailCustomAuthentication
    ]

    def post(self, request):
        data = json.loads(json.dumps(request.data))
        user_email = data.get('email')
        User = get_user_model()
        user = User.objects.get(email=user_email)
        return JsonResponse({
            "detail": "Logged in successfully!",
            'logged_in': True,
            'user_email': user_email,
            'username': user.username
        })


@ensure_csrf_cookie
def logout_view(request):
    # Logs a user out
    permission_classes = [IsAuthenticated]

    try:
        # clear session from db
        del request.session['user_id']
    except KeyError:
        return JsonResponse({
            'detail': 'You are not logged in!'
        }, status=200)

    return JsonResponse({"detail": "Successfully logged out"})
