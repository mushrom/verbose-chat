from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from django.utils import timezone
import json

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.chat_channel = None
        self.accept()

    def disconnect(self, close_code):
        if self.chat_channel is not None:
            async_to_sync(self.channel_layer.group_discard)(
                self.chat_channel,
                self.channel_name
            )

    def receive(self, text_data):
        print("websocket: " + str(self.scope["user"]) + " sent " + text_data)
        obj = json.loads(text_data);

        if obj["type"] == "channel-switch":
            if self.chat_channel is not None:
                async_to_sync(self.channel_layer.group_discard)(
                    self.chat_channel,
                    self.channel_name
                )

            self.chat_channel = str(obj["data"])
            async_to_sync(self.channel_layer.group_add)(
                self.chat_channel,
                self.channel_name
            )

        elif obj["type"] == "message":
            if self.chat_channel is None:
                return

            async_to_sync(self.channel_layer.group_send)(
                self.chat_channel,
                {
                    "type": "message",
                    "data": {
                        "content":     obj["data"]["content"],
                        "username":    str(self.scope["user"]),
                        "date_posted": timezone.now().isoformat(),
                    },
                }
            )

        else:
            # just ignore for now
            pass

    def message(self, event):
        msg = event["data"]
        self.send(text_data = json.dumps({
            "type": "message",
            "data": msg,
        }))
        pass
