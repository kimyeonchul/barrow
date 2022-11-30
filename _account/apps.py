from django.apps import AppConfig


class AccountConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = '_account'
    def ready(self):
        from _deal.cron import _main
        _main()
