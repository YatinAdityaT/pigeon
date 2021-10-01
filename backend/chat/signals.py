from django.contrib.auth import get_user_model
from django.db import transaction
from django.db.models.signals import m2m_changed, post_save
from django.dispatch import receiver

from .models import ChatGroup, Invitation

# https://stackoverflow.com/a/23326971/11573842


# On save of ChatGroup create invitation for the owner
@receiver(post_save, sender=ChatGroup)
def create_invitation_for_owner(instance, **kwargs):
    owner_email = instance.chat_owner.email
    if not Invitation.objects.filter(
            chat_room=instance,
            participant_email=owner_email
    ):
        Invitation.objects.create(
            chat_room=instance,
            participant_email=owner_email
        ).save()


# On change of ChatGroup.participant m2m field, create
# invitations for the participants for that chat
# instance
@receiver(m2m_changed, sender=ChatGroup.participants.through)
def create_invitations(instance, **kwargs):

    participants = instance.participants.all()
    participant_emails = [participant.email for participant in participants]

    for email in participant_emails:
        with transaction.atomic():  # in case of failure
            # create an invitation only if one doesn't already exist
            if not Invitation.objects.filter(
                    chat_room=instance,
                participant_email=email
            ):
                Invitation.objects.create(
                    chat_room=instance,
                    participant_email=email
                ).save()


User = get_user_model()


# When a user creates a new account, check if they have pending invitations from chat groups
# and add them into those
@receiver(post_save, sender=User)
def add_created_users_to_chat_rooms_that_they_are_invited_in(sender, instance, **kwargs):
    invitations = Invitation.objects.filter(
        participant_email=instance.email
    )
    for invitation in invitations:
        invitation.chat_room.participants.add(instance)
