from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .authentication import EmailCustomAuthentication
from django.contrib.auth import get_user_model
from django.contrib.sessions.models import Session


class SessionView(APIView):
    # Session view: returns if a user is logged_in or not
    @staticmethod
    def get(request, format=None):
        session_request = request.session
        session_key_request = session_request.session_key

        try:
            session_db = Session.objects.get(session_key=session_key_request)
        except:
            return JsonResponse({'isLoggedIn': False})

        session_db_decoded = session_db.get_decoded()

        try:
            user_id_db = session_db_decoded['user_id']
        except KeyError:
            return JsonResponse({'isLoggedIn': False})

        user_id_request = session_request['user_id']

        if user_id_db != user_id_request:
            return JsonResponse({'isLoggedIn': False})

        User = get_user_model()
        user = User.objects.get(id=user_id_db)

        if not user.is_active or not user.is_authenticated:
            return JsonResponse({'isLoggedIn': False})

        return JsonResponse({'isLoggedIn': True})


# class WhoAmIView(APIView):
#     # Returns the logged in user's email id
#     @staticmethod
#     def get(request, format=None):
#         return JsonResponse({'email': request.user.email})


def get_csrf(request):
    # Returns the CSRF token currently in use
    response = JsonResponse({'details': 'CSRF cookie set'})
    response['X-CSRFToken'] = get_token(request)
    return response


class LoginView(APIView):
    # Logs a user in
    authentication_classes = [SessionAuthentication,
                              EmailCustomAuthentication]

    def post(self, request):
        return JsonResponse({'logged_in': True})


@ensure_csrf_cookie
def logout_view(request):
    # Logs a user out
    permission_classes = [IsAuthenticated]

    try:
        del request.session['user_id']
    except KeyError:
        return JsonResponse({'details': 'You are not logged in!'})

    return JsonResponse({"details": "Successfully logged out"})
