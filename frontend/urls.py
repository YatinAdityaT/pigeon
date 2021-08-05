from django.urls import path, re_path
from .views import index

urlpatterns = [
    # this is what attaches React with Django. The '' endpoint will render the index.html - where all of my react componenets are attached
    path('', index),

]
