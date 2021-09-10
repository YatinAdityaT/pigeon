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
        fields = ('id', 'email', 'username', 'is_active',
                  'date_joined', 'last_login', 'profile_image')


class InvitationSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = Invitation
        fields = '__all__'


class MessageSerializer(DynamicFieldsModelSerializer):
    owner = ParticipantSerializer(
        read_only=True, fields=('email', 'username'))

    class Meta:
        model = Message
        fields = ('owner', 'text', 'timestamp')


class ChatGroupSerializer(DynamicFieldsModelSerializer):

    def to_representation(self, instance):
        self.fields['participants'] = ParticipantSerializer(
            many=True, read_only=True)
        return super().to_representation(instance)

    def create(self, validated_data):
        print(validated_data)
        # chat_group = ChatGroup(
        #     group_name = validated_data['group_name'],
        #     chat_owner = validated_data['group_name'],
        #     group_name = validated_data['group_name'],
        # )

    # def update(self): pass

    class Meta:
        model = ChatGroup
        fields = ('id', 'group_name', 'chat_owner',
                  'timestamp', 'participants')
        read_only_fields = ['id', 'timestamp']
