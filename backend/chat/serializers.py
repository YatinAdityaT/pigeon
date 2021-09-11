from django.core.checks import messages
from rest_framework import serializers
from .models import Invitation, Message, ChatGroup
from django.contrib.auth import get_user_model

User = get_user_model()


class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.

    Code taken from: https://www.django-rest-framework.org/api-guide/serializers/#example
    """

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)

        # Instantiate the superclass normally
        super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class ParticipantSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'username', 'is_active',
                  'date_joined', 'last_login', 'profile_image')


class InvitationSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = Invitation
        fields = '__all__'


class MessageSerializer(DynamicFieldsModelSerializer):
    def create(self, validated_data):
        message = Message(
            owner=validated_data['owner'],
            chat_room=validated_data['chat_room'],
            text=validated_data['text']
        )
        message.save()
        return message

    def update(self, instance, validated_data):
        print('this was called')
        instance.text = validated_data.get(
            'text', instance.text)
        instance.save()
        return instance

    class Meta:
        model = Message
        fields = ('owner', 'chat_room', 'text')
        read_only_fields = ['id', 'timestamp']


class ChatGroupSerializer(DynamicFieldsModelSerializer):

    def to_representation(self, instance):
        self.fields['participants'] = ParticipantSerializer(
            many=True, read_only=True)
        return super().to_representation(instance)

    def create(self, validated_data):

        chat_group = ChatGroup(
            group_name=validated_data['group_name'],
            chat_owner=validated_data['chat_owner']
        )

        chat_group.save()

        for participant in validated_data['participants']:
            chat_group.participants.add(participant)

        chat_group.save()

        return chat_group

    def update(self, instance, validated_data):
        instance.group_name = validated_data.get(
            'group_name', instance.group_name)
        for participant in validated_data.get('participants', []):
            instance.participants.add(participant)
        instance.save()
        return instance

    class Meta:
        model = ChatGroup
        fields = ('id', 'group_name', 'chat_owner',
                  'timestamp', 'participants')
        read_only_fields = ['id', 'timestamp']
