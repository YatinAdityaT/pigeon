from django.urls import include, path, re_path

from .views import (
    ChatGroupCreateView, ChatGroupDestroyView,
    ChatGroupListView,
    ChatGroupUpdateView, InvitationCreateView,
    InvitationDestroyView, InvitationListView,
    MessageCreateView, MessageDestroyView,
    MessageListView, MessageUpdateView
    # ChatGroupDetailView
)

urlpatterns = [
    path(r'api/', include([

        # Lists out all the chat groups that a user is in
        path('chats/', ChatGroupListView.as_view()),

        # Create a chat group
        path('chats/create',
             ChatGroupCreateView.as_view()),

        # # Get the details of a specific chat group
        # re_path(r'chats/(?P<chat_id>[\w-]{36})',
        #         ChatGroupDetailView.as_view(),
        #         name='chat details'),

        # Update a chat group's details
        re_path(r'chats/update/(?P<chat_id>[\w-]{36})',
                ChatGroupUpdateView.as_view()),

        # Delete a chat group
        re_path(r'chats/delete/(?P<chat_id>[\w-]{36})',
                ChatGroupDestroyView.as_view()),

        # Show the messages in a chat group
        re_path(r'messages/(?P<chat_id>[\w-]{36})',
                MessageListView.as_view(),
                name='messages in a chat'),

        # Create new messages
        path('messages/create', MessageCreateView.as_view()),

        # Update a message's text
        re_path(r'messages/update/(?P<pk>[\w-]{36})',
                MessageUpdateView.as_view()),

        # Delete a message
        re_path(r'messages/delete/(?P<pk>[\w-]{36})',
                MessageDestroyView.as_view()),

        # Create an invitation
        path('invitation/create', InvitationCreateView.as_view()),

        # List all invitations
        path('invitation', InvitationListView.as_view()),

        # Delete an invitation
        re_path(r'invitation/delete/(?P<pk>[\w-]+)',
                InvitationDestroyView.as_view()),
    ]))
]
