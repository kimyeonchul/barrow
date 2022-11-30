from django.apps import AppConfig


class PaymentConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = '_payment'
    def ready(self):
        from _deal.cron import _main
        _main()

