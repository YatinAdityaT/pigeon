# The urls file creates endpoints where users can send requests
from django.urls import path, include
from . import views

app_name = "users"

# users urls.py
urlpatterns = [

    path('auth/', include([
        # djoser.urls allows for several useful endpoints:
        # /users/
        # /users/activation /
        # /users/resend_activation /
        # /users/me /
        # /users/set_{USERNAME_FIELD} /
        # /users/set_{USERNAME_FIELD}_confirm /
        # /users/set_password /
        # /users/reset_password /
        # and so on (see:  https://djoser.readthedocs.io/en/latest/base_endpoints.html)
        path('', include('djoser.urls')),

        # Session authentication - https://testdriven.io/blog/django-spa-auth/#django-drf-frontend-served-separately-same-domain
        path('csrf/',    views.get_csrf,              name='auth-csrf'),
        path('login/',   views.LoginView.as_view(),   name='auth-login'),
        path('logout/',  views.logout_view,           name='auth-logout'),
        path('session/', views.SessionView.as_view(), name='auth-session'),
        # path('whoami/',  views.WhoAmIView.as_view(),  name='auth-whoami'),
    ]))
]
