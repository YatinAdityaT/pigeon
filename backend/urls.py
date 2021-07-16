from backend.views import ChatViewSet
from rest_framework import routers, urlpatterns
from .views import *

router = routers.DefaultRouter()
router.register('api/chats', ChatViewSet, 'chats')

urlpatterns = router.urls
