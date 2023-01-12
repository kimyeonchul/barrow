from django.db import models

class Notification(models.Model):
    content = models.TextField(null = False, default = "")
    is_read = models.BooleanField(null = False,default = False)
    created = models.DateTimeField(null = False, auto_now_add=True)
    user = models.ForeignKey("_account.user",on_delete=models.CASCADE,related_name="notifications")

    def read(self):
        self.is_read = True

    