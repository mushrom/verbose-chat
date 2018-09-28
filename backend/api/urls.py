from django.urls import path
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

#app_name = "api"
urlpatterns = [
    url(r"^$", views.api_root, name="api_root"),
    url(r"^servers/$",
        views.VerbServerList.as_view(),
        name="verbserver-list"),
    url(r"^servers/(?P<pk>[0-9]+)/$",
        views.VerbServerDetail.as_view(),
        name="verbserver-detail"),
    url(r"^servers/(?P<pk>[0-9]+)/channels/$",
        views.VerbServerChannels.as_view(),
        name="verbserver-channels"),
    url(r"^channels/$",
        views.VerbChannelList.as_view(),
        name="verbchannel-list"),
    url(r"^channels/(?P<pk>[0-9]+)/$",
        views.VerbChannelDetail.as_view(),
        name="verbchannel-detail"),
    url(r"^channels/(?P<pk>[0-9]+)/users/$",
        views.VerbChannelUsers.as_view(),
        name="verbchannel-users"),
    url(r"^channels/(?P<pk>[0-9]+)/messages/$",
        views.VerbChannelMessages.as_view(),
        name="verbchannel-messages"),
    url(r"^messages/$",
        views.VerbMessageList.as_view(),
        name="verbmessage-list"),
    url(r"^messages/(?P<pk>[0-9]+)/$",
        views.VerbMessageDetail.as_view(),
        name="verbmessage-detail"),
    url(r"^user/(?P<pk>[0-9]+)/$",
        views.UserDetail.as_view(),
        name="user-detail"),
]

urlpatterns = format_suffix_patterns(urlpatterns)
