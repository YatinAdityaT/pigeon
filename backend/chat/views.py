from django.http import request
from .models import *
from rest_framework import permissions, viewsets
from .serializers import *
from django.contrib.auth import get_user_model
from .models import ChatGroup
from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    RetrieveAPIView,
    UpdateAPIView,
    DestroyAPIView,
)

User = get_user_model()


class ChatGroupViewSet(viewsets.ModelViewSet):
    queryset = ChatGroup.objects.all()
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = ChatGroupSerializer


class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer

    def get_queryset(self):
        print(self.request.user)
        queryset = Message.objects.all()
        chat_id = self.request.query_params.get('chat_id')
        if chat_id:
            queryset = Message.objects.filter(chat_room_id=chat_id)
        return queryset


class ChatGroupListView(ListAPIView):
    serializer_class = ChatGroupSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        queryset = ChatGroup.objects.all()
        username = self.request.query_params.get('username', None)
        return queryset


class ChatGroupDetailView(RetrieveAPIView):
    queryset = ChatGroup.objects.all()
    serializer_class = ChatGroupSerializer
    permission_classes = (permissions.AllowAny, )


class ChatGroupCreateView(CreateAPIView):
    queryset = ChatGroup.objects.all()
    serializer_class = ChatGroupSerializer
    permission_classes = (permissions.IsAuthenticated, )


class ChatGroupUpdateView(UpdateAPIView):
    queryset = ChatGroup.objects.all()
    serializer_class = ChatGroupSerializer
    permission_classes = (permissions.IsAuthenticated, )


class ChatGroupDeleteView(DestroyAPIView):
    queryset = ChatGroup.objects.all()
    serializer_class = ChatGroupSerializer
    permission_classes = (permissions.IsAuthenticated, )
