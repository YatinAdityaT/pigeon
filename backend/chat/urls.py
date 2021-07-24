from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register('api/chats', ChatViewSet, 'chats')

urlpatterns = router.urls
