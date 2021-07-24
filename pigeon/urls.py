# url endpoints for the admin, frontend and backend
from django.contrib import admin
from django.urls import include, path

# MAIN app urls.py
urlpatterns = [
    path('admin/', admin.site.urls),
    path('chat/', include('frontend.urls')),
    path("chat/", include('backend.chat.urls')),
    path('api/accounts/', include('backend.chat.urls')),
    path('', include('backend.users.urls'))

]
