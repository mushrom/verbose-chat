from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
import json

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        print("websocket: " + str(self.scope["user"]) + " sent " + text_data)

        self.send(text_data = json.dumps({
            "testing": text_data,
        }))

    def chat_message(self, event):
        pass
