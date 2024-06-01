from api.views import BlacklistTokenUpdateView
from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from comments.views import CommentViewSet
from friendship.views import FriendshipRequestViewSet
from posts.views import PostViewSet
from users.views import UserViewSet
from user_profile.views import ProfileViewSet
from votes.views import VoteViewSet
from .views import CustomTokenObtainPairView, UserLogout

urlpatterns = [
    path("token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("logout/blacklist/", BlacklistTokenUpdateView.as_view(), name="blacklist"),
    path("logout/", UserLogout.as_view(), name="logout"),
]

router = DefaultRouter()
router.register(r"users", UserViewSet, basename="users")
router.register(r"profiles", ProfileViewSet)
router.register(r"posts", PostViewSet)
router.register(r"comments", CommentViewSet)
router.register(r"votes", VoteViewSet)
router.register(r"friendship", FriendshipRequestViewSet, basename="friendship")

urlpatterns += router.urls
