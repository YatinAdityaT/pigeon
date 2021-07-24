# Serializers are used to 'serialize' or convert incoming request data into
# data that is compatible for storage in the db
from django.db.models import fields
from rest_framework import serializers
from .models import CustomUser

# Using ModelSerializer allows us to not repeat a lot of things
# that were already specified in the Model (here CustomUser)


class RegistrationSerializer(serializers.ModelSerializer):
    # we are adding password2 field because this wasn't present
    # in the model (as we don't need to store it in the db)
    password2 = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)

    class Meta:
        # the Meta sub-class allows us to provide Meta data to the
        # serializer - basically information that we can't provide as
        # fields
        model = CustomUser  # the model we are using
        fields = ['email', 'username', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}  # password = write-only
        }

    def save(self):
        # we are overriding the save method to check if the 2 passwords match or not
        # account is a CustomUser instace that takes in
        # the validated email and username
        account = CustomUser(
            email=self.validated_data['email'], username=self.validated_data['username'])

        password = self.validated_data['password']
        password2 = self.validated_data['password2']
        if password != password2:
            # if both passwords aren't equal then raise a validation error
            raise serializers.ValidationError(
                {'password': "Passwords don't match"})
        account.set_password(password)  # set passwords with set_password only
        account.save()  # save the account
        return account  # return the account just created


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['__all__']
