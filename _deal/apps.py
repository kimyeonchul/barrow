from django.apps import AppConfig


class DealConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = '_deal'
    def ready(self):
        from .cron import _main
        _main()