# url endpoints for the admin, frontend and backend
from django.contrib import admin
from django.urls import include, path

# MAIN app urls.py
urlpatterns = [
    path('admin/', admin.site.urls),
    path('chat/', include('frontend.urls')),
    path("chat/", include('backend.urls')),
    path('api/accounts/', include('backend.urls')),
    path('', include('users.urls'))

]
