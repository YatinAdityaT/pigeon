# The urls file creates endpoints where users can send requests
from django.urls import path, include
from .views import UserActivationView

app_name = "users"

# users urls.py
urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('activate/<str:uid>/<str:token>',
         UserActivationView.as_view())
]
