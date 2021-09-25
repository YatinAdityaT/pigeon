from backend.chat.utils import filter_email
from channels.layers import get_channel_layer
from django.db.models.signals import m2m_changed, post_save
from django.dispatch import receiver
from .models import ChatGroup, Invitation

from django.db import transaction
# https://stackoverflow.com/a/23326971/11573842


# On change of ChatGroup.participant m2m field, create an
# invitation for the owner & the participants for that chat
# instance
@receiver(m2m_changed, sender=ChatGroup.participants.through)
def create_invitations(instance, **kwargs):

    participants = instance.participants.all()
    owner_email = instance.chat_owner.email
    participant_emails = [participant.email for participant in participants]
    emails = set([owner_email, *participant_emails])  # remove duplicates

    for email in emails:
        with transaction.atomic():  # in case of failure
            # create an invitation only if one doesn't already exist
            if not Invitation.objects.filter(chat_room=instance, participant_email=email):
                Invitation.objects.create(chat_room=instance,
                                          participant_email=email).save()
