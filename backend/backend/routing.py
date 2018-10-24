from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import channels_interface.routing

application = ProtocolTypeRouter({
    "websocket" : AuthMiddlewareStack(
        URLRouter(channels_interface.routing.websocket_urlpatterns),
    )
})
