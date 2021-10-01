from django.contrib.auth.base_user import BaseUserManager


class CustomUserManager(BaseUserManager):
    # A custom user manager where email is the unique identifier

    def _create_user(self, email, username, password, **kwargs):
        # a utility function to create a generic user
        if not email:
            # if the user didn't give an email then raise a value error
            raise ValueError("Email must be provided")
        if not username:
            # if the user didn't give a username then raise a value error
            raise ValueError("Username must be provided")

        # normalize the email before storing in the db
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            username=username,
            **kwargs
        )  # create a user
        user.set_password(password)  # set the password for that user
        user.save(using=self._db)  # save the user
        return user

    def create_user(self, email, username, password, **kwargs):
        # This function is called when someone tries to create a regular user
        kwargs.setdefault('is_staff', False)
        kwargs.setdefault('is_superuser', False)
        kwargs.setdefault('is_admin', False)
        return self._create_user(
            email,
            username,
            password,
            **kwargs
        )

    def create_superuser(self, email, username, password, **kwargs):
        # This function is called when someone tries to create a superuser
        kwargs.setdefault('is_staff', True)
        kwargs.setdefault('is_superuser', True)
        kwargs.setdefault('is_admin', True)

        if kwargs.get('is_staff') is not True:
            raise ValueError(
                'Superuser must have is_staff=True.'
            )
        if kwargs.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must have is_superuser=True.'
            )

        return self._create_user(
            email,
            username,
            password,
            **kwargs
        )
