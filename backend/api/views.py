from rest_framework import status, mixins, generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.reverse import reverse
from rest_framework.authtoken.models import Token
from api.models import VerbServer, VerbChannel, VerbMessage
from api.serializers import VerbServerSerializer
from api.serializers import VerbChannelSerializer
from api.serializers import VerbMessageSerializer
from api.serializers import UserSerializer
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_protect

@api_view(["GET"])
def api_root(request, format=None):
    return Response({
        "servers":  reverse("verbserver-list", request=request, format=format),
        "channels": reverse("verbchannel-list", request=request, format=format),
        "messages": reverse("verbmessage-list", request=request, format=format),
    })

class VerbServerList(generics.ListCreateAPIView):
    queryset = VerbServer.objects.all()
    serializer_class = VerbServerSerializer
    # TODO: token auth
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(admin = self.request.user)

class VerbServerChannels(generics.ListCreateAPIView):
    #queryset = VerbServer.objects.all()
    serializer_class = VerbChannelSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_server(self):
        filter_kwargs = {self.lookup_field: self.kwargs[self.lookup_field]}
        return generics.get_object_or_404(VerbServer.objects.all(), **filter_kwargs)

    def get_queryset(self):
        return VerbChannel.objects.filter(server = self.get_server())

    def perform_create(self, serializer):
        serializer.save(server = self.get_server())

class VerbServerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = VerbServer.objects.all()
    serializer_class = VerbServerSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class VerbChannelList(generics.ListAPIView):
    queryset = VerbChannel.objects.all()
    serializer_class = VerbChannelSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class VerbChannelDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = VerbChannel.objects.all()
    serializer_class = VerbChannelSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class VerbChannelUsers(generics.GenericAPIView):
    queryset = VerbChannel.objects.all()
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get(self, request, *args, **kwargs):
        channel = self.get_object()
        users = User.objects.filter(channel_users = channel)
        chan_serializer = VerbChannelSerializer(channel, context={"request": request})
        user_serializer = UserSerializer(users, context={"request": request}, many=True)

        return Response({
            "channel": chan_serializer.data,
            "users": user_serializer.data,
        })

class VerbChannelMessages(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = VerbMessageSerializer

    def get_channel(self):
        filter_kwargs = {self.lookup_field: self.kwargs[self.lookup_field]}
        return generics.get_object_or_404(VerbChannel.objects.all(), **filter_kwargs)

    def get_queryset(self):
        return VerbMessage.objects.filter(channel = self.get_channel())

    def perform_create(self, serializer):
        serializer.save(user = self.request.user, channel = self.get_channel())

class VerbMessageList(generics.ListCreateAPIView):
    queryset = VerbMessage.objects.all()
    serializer_class = VerbMessageSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class VerbMessageDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = VerbMessage.objects.all()
    serializer_class = VerbMessageSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

# Used to upgrade from session auth to token auth
@api_view(["POST"])
@permission_classes((permissions.IsAuthenticated,))
@csrf_protect
def auth_get_token(request, format=None):
    user = request.user
    print(user)
    token = Token.objects.get(user = user)

    return Response({
        "user": user.id,
        "username": user.username,
        "token": str(token),
    })
