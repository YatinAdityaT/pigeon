from rest_framework import permissions
from rest_framework.exceptions import PermissionDenied
from .models import ChatGroup, Invitation
from django.core.exceptions import ObjectDoesNotExist


class IsParticipantOr404(permissions.BasePermission):
    """
        Checks if a user is authenticated and part of the claimed chat group 
        or not.

        Uses request.custom_user (set by CustomAuthenticationMiddleware) 
        that is either a user object or an AnonymousUser object.
        user.is_authenticated is always True for a "real" user and always 
        false for an anonymous one. If false then a not authenticated error 
        is throw.

        If a user is authenticated then Invitations objects are searched to 
        find an invitation to the user for the requested chat group. If none 
        is found then another error is raised. Else permission is granted.
    """

    # has_permission is called for all views that inherit from the APIView
    def has_permission(self, request, view):
        user = request.custom_user
        if user and user.is_authenticated:
            try:
                chat_room = ChatGroup.objects.get(
                    id=view.kwargs.get('chat_id'))
                Invitation.objects.get(
                    chat_room=chat_room, participant_email=user.email)
            except ObjectDoesNotExist:
                raise PermissionDenied(
                    {"message": "You don't have permission to access this api endpoint!"})
            except Exception as e:
                raise PermissionDenied({'message': e})
            else:
                return True


class IsAuthenticated(permissions.BasePermission):
    """
        Override the default IsAuthenticated to use request.custom_user instead
        of request.user
    """

    def has_permission(self, request, view):
        return bool(request.custom_user and request.custom_user.is_authenticated)
