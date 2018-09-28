from django.db import models

class VerbServer(models.Model):
    admin = models.ForeignKey("auth.user",
                               related_name="server_admin",
                               on_delete=models.CASCADE)

    name = models.CharField(max_length=100, blank=False, default="Unnamed server")
    topic = models.CharField(max_length=127, blank=False, default="[Server topic]")

class VerbChannel(models.Model):
    name = models.CharField(max_length=127, blank=False, default="Unnamed channel")
    topic = models.CharField(max_length=127, blank=False, default="[Channel topic]")

    users = models.ManyToManyField("auth.user", related_name="channel_users")
    server = models.ForeignKey(VerbServer,
                               related_name="server",
                               on_delete=models.CASCADE)

class VerbMessage(models.Model):
    user = models.ForeignKey("auth.user",
                             related_name="messages",
                             on_delete=models.CASCADE)
    channel = models.ForeignKey(VerbChannel,
                                related_name="channel",
                                on_delete=models.CASCADE)

    content     = models.TextField()
    date_posted = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("date_posted",)
