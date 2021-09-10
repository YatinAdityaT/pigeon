from rest_framework import permissions
from rest_framework.exceptions import PermissionDenied
from .models import Invitation
from django.core.exceptions import ObjectDoesNotExist


class IsParticipantOr404(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.custom_user
        if user.is_authenticated:
            try:
                Invitation.objects.get(participant_email=user.email)
            except ObjectDoesNotExist:
                raise PermissionDenied(
                    {"message": "You don't have permission to access this api endpoint!"})
            else:
                return True
