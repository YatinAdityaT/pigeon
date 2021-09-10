from django.contrib.auth import get_user_model
from rest_framework.generics import (CreateAPIView, DestroyAPIView,
                                     ListAPIView,
                                     UpdateAPIView)

from .models import ChatGroup, Invitation, Message
from .permissions import IsParticipantOr404
from .serializers import ChatGroupSerializer, MessageSerializer, InvitationSerializer

User = get_user_model()


class ChatGroupListView(ListAPIView):
    serializer_class = ChatGroupSerializer
    permission_classes = [IsParticipantOr404]

    def get_queryset(self):
        queryset = ChatGroup.objects.filter(
            id=self.kwargs.get('chat_id'))
        return queryset


class MessageListView(ListAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsParticipantOr404]

    def get_queryset(self):
        queryset = Message.objects.filter(
            chat_room__id=self.kwargs.get('chat_id'))
        return queryset


class InvitationListView(ListAPIView):
    serializer_class = InvitationSerializer
    permission_classes = [IsParticipantOr404]

    def get_queryset(self):
        queryset = Invitation.objects.filter(
            chat_room__id=self.kwargs.get('chat_id'))
        return queryset

# ---------------------------------------------------------


class ChatGroupCreateView(CreateAPIView):
    serializer_class = ChatGroupSerializer
    # permission_classes = [IsParticipantOr404]


class MessageCreateView(CreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsParticipantOr404]


class InvitationCreateView(CreateAPIView):
    serializer_class = InvitationSerializer
    permission_classes = [IsParticipantOr404]

# --------------------------------------------------


# class ChatGroupListView(UpdateAPIView):
#     serializer_class = ChatGroupSerializer
#     permission_classes = [IsParticipantOr404]


# class MessageListView(UpdateAPIView):
#     serializer_class = MessageSerializer
#     permission_classes = [IsParticipantOr404]

#     def get_queryset(self):
#         queryset = Message.objects.filter(
#             chat_room__id=self.kwargs.get('chat_id'))
#         return queryset


# class InvitationListView(UpdateAPIView):
#     serializer_class = InvitationSerializer
#     permission_classes = [IsParticipantOr404]

#     def get_queryset(self):
#         queryset = Invitation.objects.filter(
#             chat_room__id=self.kwargs.get('chat_id'))
#         return queryset
