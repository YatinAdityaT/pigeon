from django.contrib.auth import get_user_model
from rest_framework.generics import (
    CreateAPIView, DestroyAPIView,
    ListAPIView, UpdateAPIView
)
from .models import ChatGroup, Invitation, Message
from .permissions import IsAuthenticated, IsParticipantOr404
from .serializers import (
    ChatGroupSerializer, InvitationSerializer,
    MessageSerializer
)

User = get_user_model()


# ---------------------List------------------------------------
class ChatGroupListView(ListAPIView):
    """
        User's chat room list

        Checks if a user is authenticated and
        returns a list of chat groups that a user is part
        of.
    """
    serializer_class = InvitationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Invitation.objects.filter(
            participant_email=self.request.custom_user.email
        )
        return queryset


class MessageListView(ListAPIView):
    """
        List of all messages in a chat

        Checks if a user is a participant in
        a chat group and returns all the messages
        in a chat room
    """
    serializer_class = MessageSerializer
    permission_classes = [IsParticipantOr404]

    def get_queryset(self):
        queryset = Message.objects.filter(
            chat_room__id=self.kwargs.get('chat_id'))
        return queryset


class InvitationListView(ListAPIView):
    """
        People who are allowed
        to speak in a chat room.

        Checks if a user is a participant
        and returns all the Invitations that
        to a chat room.
    """
    serializer_class = InvitationSerializer
    permission_classes = [IsParticipantOr404]

    def get_queryset(self):
        queryset = Invitation.objects.filter(
            chat_room__id=self.kwargs.get('chat_id'))
        return queryset


# # ---------------------Detail------------------------------------
# class ChatGroupDetailView(ListAPIView):
#     """
#         A chat groups detail view
#     """
#     serializer_class = ChatGroupSerializer
#     permission_classes = [IsParticipantOr404]

#     def get_queryset(self):
#         queryset = ChatGroup.objects.get(
#             id=self.kwargs.get('chat_id')
#         )
#         return queryset

# ---------------------Create------------------------------------


class ChatGroupCreateView(CreateAPIView):
    """
        A view to create chat groups.
        User must be authenticated.
    """
    serializer_class = ChatGroupSerializer
    permission_classes = [IsAuthenticated]


class MessageCreateView(CreateAPIView):
    """
        Creates a message.
        User must be participant
    """
    serializer_class = MessageSerializer
    permission_classes = [IsParticipantOr404]


class InvitationCreateView(CreateAPIView):
    """
        Creates an invitation to a chat room.
        User must be a participant.
    """
    serializer_class = InvitationSerializer
    permission_classes = [IsParticipantOr404]

# ---------------------Update---------------------------


class ChatGroupUpdateView(UpdateAPIView):
    """
        Update a chat's details. User must
        be a participant.
    """
    queryset = ChatGroup.objects.all()
    serializer_class = ChatGroupSerializer
    permission_classes = [IsParticipantOr404]


class MessageUpdateView(UpdateAPIView):
    """
        Message text update view.
        User must be a participant.
    """
    serializer_class = MessageSerializer
    permission_classes = [IsParticipantOr404]
    queryset = Message.objects.all()


# ---------------------Delete-----------------------------

class ChatGroupDestroyView(DestroyAPIView):
    """
        Deletes a chat group.
        User must be a participant.
    """
    serializer_class = ChatGroupSerializer
    permission_classes = [IsParticipantOr404]
    queryset = ChatGroup.objects.all()


class MessageDestroyView(DestroyAPIView):
    """
        Deletes a message.
        User must be a participant.
    """
    serializer_class = MessageSerializer
    permission_classes = [IsParticipantOr404]
    queryset = Message.objects.all()


class InvitationDestroyView(DestroyAPIView):
    """
        Delete an invitation.
        User must be a participant.
    """
    serializer_class = InvitationSerializer
    permission_classes = [IsParticipantOr404]
    queryset = Invitation.objects.all()
