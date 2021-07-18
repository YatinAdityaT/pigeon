# This view renders the main index.html
from django.shortcuts import render


def index(request):
    return render(request, "frontend/index.html")
