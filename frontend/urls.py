# this is what attaches React with Django. The '' endpoint will render the index.html - where all of my react componenets are attached
from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
]
