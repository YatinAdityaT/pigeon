# The urls file creates endpoints where users can send requests
from django.urls import path, include
from . import views

app_name = "users"

# users urls.py
urlpatterns = [

    # djoser.urls allows for several useful endpoints:
    # / users /
    # /users/activation /
    # /users/resend_activation /
    # /users/me /
    # /users/set_{USERNAME_FIELD} /
    # /users/set_{USERNAME_FIELD}_confirm /
    # /users/set_password /
    # /users/reset_password /
    # and so on (see:  https://djoser.readthedocs.io/en/latest/base_endpoints.html)
    path('auth/', include('djoser.urls')),



    # djoser.urls.jwt allows for 3 endpoints:
    # /jwt/create - to generate the access and the refresh tokens
    # /jwt/refresh - to generate a fresh access token
    # /jwt/verify - to verify an access token
    # (seehttps://djoser.readthedocs.io/en/latest/jwt_endpoints.html )



    # Session authentication - https://testdriven.io/blog/django-spa-auth/#django-drf-frontend-served-separately-same-domain
    path('auth/', include('djoser.urls.jwt')),
    path('csrf/', views.get_csrf, name='api-csrf'),
    path('login/', views.LoginView.as_view(), name='api-login'),
    path('logout/', views.logout_view, name='api-logout'),
    path('session/', views.SessionView.as_view(), name='api-session'),
    path('whoami/', views.WhoAmIView.as_view(), name='api-whoami'),

]
