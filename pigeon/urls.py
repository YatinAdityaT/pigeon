# url endpoints for the admin, frontend and backend
from django.contrib import admin
from django.urls import include, path, re_path
from frontend.views import index


urlpatterns = [
    path('admin/', admin.site.urls),
    path('chat/', include('frontend.urls')),
    path("", include('backend.chat.urls')),
    path('', include('backend.users.urls')),
    # for all urls react router
    re_path(r'^.*/?', index)
]


paths = ['login/', 'register/', 'activate/.*']
urlpatterns += [re_path(url_path, index) for url_path in paths]
