# The models file defines how the data should be stored in the db
# Django models are translated to SQL
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from .managers import CustomUserManager


class CustomUser(AbstractBaseUser, PermissionsMixin):
    # I am creating a custom user model that extends the AbstractBaseUser class
    # so as to add a unique identifier field called email that takes the place of
    # username as the unique identifier. We will be overriding all the following
    # fields of the AbstractBaseUser class.

    # set email field to be unique
    email = models.EmailField(
        verbose_name='email address', max_length=60, unique=True)
    username = models.CharField(max_length=40, unique=True)

    # by default, user accounts will not be admin accounts or superusers
    # by default, each account will be active (deactivate ~ deleting the account)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    # automatically store the date-time of joining and last login
    date_joined = models.DateTimeField(
        verbose_name="date joined", auto_now_add=True)
    last_login = models.DateTimeField(
        verbose_name="last joined", auto_now=True)

    # profile image is optional and default image is provided
    def return_profile_image_path(self, filename):
        return f"profile_images/{self.pk}/profile_image.png"

    profile_image = models.ImageField(
        max_length=255, upload_to=return_profile_image_path, null=True, blank=True, default=f"profile_images/default.png")

    USERNAME_FIELD = 'email'  # make the email field to be the unique identifier
    REQUIRED_FIELDS = ['username']  # the fields that are required to be filled
    # email is also required as it is a USERNAME_FIELD
    objects = CustomUserManager()  # add the custom user manager to this model

    def __str__(self):
        # str function to get the username as output in the admin
        return self.username

    def has_perm(self, perm, obj=None):
        # returns if a user has admin permissions
        return self.is_admin

    def has_module_perms(self, app_label):
        return True
