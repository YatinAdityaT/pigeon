from .views import ChatGroupListView, MessageListView, ChatGroupCreateView
from django.urls import re_path, include, path


urlpatterns = [
    path(r'api/', include([

        path('chats/create',
             ChatGroupCreateView.as_view()),

        re_path(r'messages/(?P<chat_id>[\w-]+)',
                MessageListView.as_view(),
                name='messages in a chat'),

        re_path(r'chats/(?P<chat_id>[\w-]+)',
                ChatGroupListView.as_view(),
                name='chat details'),

    ]))
]
