from rest_framework import serializers
from .models import Message, ChatGroup, Participant


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = "__all__"


class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participant
        fields = ('id', 'email', 'username', 'is_active',
                  'date_joined', 'last_login', 'profile_image')


class ChatGroupSerializer(serializers.ModelSerializer):
    participants = ParticipantSerializer(many=True, read_only=True)

    class Meta:
        model = ChatGroup
        fields = ('id', 'group_name', 'chat_owner',
                  'timestamp', 'participants')
