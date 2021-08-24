from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register('api/chats', ChatGroupViewSet, 'chats')
router.register('api/messages', MessageViewSet, 'messages')

urlpatterns = router.urls
