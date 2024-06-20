from django.contrib.auth.models import User
from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.parsers import JSONParser
from rest_framework.response import Response

from .models import FriendshipRequest
from .serializers import FriendshipRequestSerializer
from user_profile.permissions import IsOwnerOrReadOnly
from users.serializers import UserSerializer


# Create your views here.
class FriendshipRequestViewSet(viewsets.ViewSet):

    parser_classes = [JSONParser]
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        user = self.request.user.pk
        q1 = FriendshipRequest.objects.filter(
            request_from=user, status_request="accepted"
        )
        q2 = FriendshipRequest.objects.filter(
            request_to=user, status_request="accepted"
        )
        result = []
        if q1.exists and not q2.exists:
            for i in range(len(q1.values())):
                result.append(q1.values()[i]["request_from_id"])
        elif not q1.exists and q2.exists:
            for i in range(len(q2.values())):
                result.append(q2.values()[i]["request_to_id"])
        elif q1.exists and q2.exists:
            for i in range(len(q1.values())):
                result.append(q1.values()[i]["request_from_id"])
            for i in range(len(q2.values())):
                result.append(q2.values()[i]["request_to_id"])
        else:
            pass

        return User.objects.filter(id__in=result).values().order_by("id")

    def get_object(self, pk):
        user = self.request.user.pk
        try:
            friend = FriendshipRequest.objects.filter(request_from=user, request_to=pk)
            if self.request.method == "GET":
                if friend.exists:
                    friend_id = friend.values()[0]["request_to_id"]
                    return User.objects.get(id=friend_id)
            elif self.request.method == "PUT" or self.request.method == "DELETE":
                return friend
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def list(self, request):
        friends = self.get_queryset().order_by("id")
        serializer = UserSerializer(friends, many=True)
        return Response(serializer.data)

    def create(self, request):
        request.data["_mutable"] = True
        request.data["request_from"] = self.request.user.pk
        request.data["_mutable"] = False
        already_friends = FriendshipRequest.objects.filter(
            request_from=request.data["request_from"],
            request_to=request.data["request_to"],
            status_request="accepted",
        ).exists
        already_sent = FriendshipRequest.objects.filter(
            request_from=request.data["request_from"],
            request_to=request.data["request_to"],
            status_request="pending",
        ).exists

        if already_friends:
            return Response({"message": "Vocês já são amigos..."})
        elif already_sent:
            return Response(
                {
                    "message": "Você já enviou a solicitação de amizade para essa pessoa..."
                }
            )
        else:
            serializer = FriendshipRequestSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        friend = self.get_object(pk)
        serializer = UserSerializer(friend)
        return Response(serializer.data)

    def update(self, request, pk=None):
        friend = self.get_object(pk)
        serializer = FriendshipRequestSerializer(friend, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        friend = self.get_object(pk)
        friend.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=["GET"])
    def find_friends(self, request):
        user = self.request.user.pk
        q1 = FriendshipRequest.objects.filter(
            request_from=user, status_request="accepted"
        )
        q2 = FriendshipRequest.objects.filter(
            request_to=user, status_request="accepted"
        )
        result = [user]
        if q1.exists and not q2.exists:
            for i in range(len(q1.values())):
                result.append(q1.values()[i]["request_to_id"])
        elif not q1.exists and q2.exists:
            for i in range(len(q2.values())):
                result.append(q2.values()[i]["request_from_id"])
        elif q1.exists and q2.exists:
            for i in range(len(q1.values())):
                result.append(q1.values()[i]["request_to_id"])
            for i in range(len(q2.values())):
                result.append(q2.values()[i]["request_from_id"])
        else:
            pass

        find_friends = User.objects.exclude(id__in=result).order_by("id")
        serializer = UserSerializer(find_friends, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["GET"])
    def incoming_requests(self, request):
        incoming_requests = FriendshipRequest.objects.filter(
            request_to=self.request.user, status_request="pending"
        )
        if incoming_requests.exists:
            request_from_users = []
            for i in range(len(incoming_requests.values())):
                request_from_users.append(
                    incoming_requests.values()[i]["request_from_id"]
                )
            pending = User.objects.filter(id__in=request_from_users).values()
            serializer = UserSerializer(pending, many=True)
            return Response(serializer.data)
        else:
            return Response({"message": "Nenhuma solicitação pendente..."})

    @action(detail=True, methods=["PUT"], name="Accept Friend Request")
    def friendrequests(self, request, pk):
        incoming_request = FriendshipRequest.objects.filter(
            request_to=self.request.user, request_from=pk, status_request="pending"
        ).get()
        serializer = FriendshipRequestSerializer(incoming_request, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @friendrequests.mapping.delete
    def delete_request(self, request, pk):
        print(pk)
        try:
            incoming_request = FriendshipRequest.objects.filter(
                request_to=self.request.user, request_from=pk, status_request="pending"
            )
            print(incoming_request)
            incoming_request.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=["GET"])
    def sent_requests(self, request):
        sent_requests = FriendshipRequest.objects.filter(
            request_from=self.request.user, status_request="pending"
        )
        print(sent_requests)
        if sent_requests.exists():
            request_to_users = []
            for i in range(len(sent_requests.values())):
                request_to_users.append(sent_requests.values()[i]["request_to_id"])
            pending = User.objects.filter(id__in=request_to_users).values()
            serializer = UserSerializer(pending, many=True)
            return Response(serializer.data)
        else:
            return Response({"message": "No sent Requests Found!!!"})

    @action(detail=True, methods=["DELETE"])
    def undo_request(self, request, pk):
        try:
            sent_request = FriendshipRequest.objects.filter(
                request_from=self.request.user, request_to=pk, status_request="pending"
            )
            sent_request.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
