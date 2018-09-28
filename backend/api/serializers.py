from rest_framework import serializers
from api.models import VerbServer, VerbChannel, VerbMessage
from django.contrib.auth.models import User

class VerbServerSerializer(serializers.HyperlinkedModelSerializer):
    admin = serializers.ReadOnlyField(source = "admin.username")
    channels = serializers.HyperlinkedIdentityField(view_name="verbserver-channels")

    class Meta:
        model = VerbServer
        fields = ("url", "id", "admin", "name", "topic", "channels",)

class VerbChannelSerializer(serializers.HyperlinkedModelSerializer):
    users = serializers.HyperlinkedIdentityField(view_name = "verbchannel-users")
    messages = serializers.HyperlinkedIdentityField(view_name = "verbchannel-messages")
    server = serializers.HyperlinkedRelatedField(view_name = "verbserver-detail",
                                                 read_only = True)
    class Meta:
        model = VerbChannel
        fields = ("url", "id", "name", "topic", "server", "users", "messages",)

class VerbMessageSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.HyperlinkedRelatedField(view_name = "user-detail",
                                               read_only = True)
    channel = serializers.HyperlinkedRelatedField(view_name = "verbchannel-detail",
                                                  read_only = True)
    username = serializers.ReadOnlyField(source = "user.username")

    class Meta:
        model = VerbMessage
        fields = ("url", "id", "username", "user", "channel", "date_posted",
                  "content",)

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ("url", "id", "username",)
