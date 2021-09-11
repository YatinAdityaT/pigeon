from django.urls import include, path, re_path

from .views import (ChatGroupCreateView, ChatGroupListView,
                    ChatGroupUpdateView, MessageCreateView, MessageListView, MessageUpdateView)

urlpatterns = [
    path(r'api/', include([

        path('chats/create',
             ChatGroupCreateView.as_view()),

        re_path(r'chats/update/(?P<pk>[\w-]{36})',
                ChatGroupUpdateView.as_view()),

        path('messages/create', MessageCreateView.as_view()),

        re_path(r'messages/update/(?P<pk>[\w-]{36})',
                MessageUpdateView.as_view()),

        re_path(r'messages/(?P<chat_id>[\w-]{36})',
                MessageListView.as_view(),
                name='messages in a chat'),

        re_path(r'chats/(?P<chat_id>[\w-]{36})',
                ChatGroupListView.as_view(),
                name='chat details'),

    ]))
]
