from django.contrib.auth import logout
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView


# Create your views here.
class UserLogout(APIView):
    def get(self, request):
        # Directly logs out the user who made the request and deletes their session.
        logout(request)
        # Return success response
        return Response({"detail": "Logout Successful"}, status=status.HTTP_200_OK)


class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token["custom_field"] = "Custom value"

        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        user = self.user
        # data["user_id"] = user.id
        # data["username"] = user.username
        # ... add other user information as needed

        return data


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
