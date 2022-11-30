from django.apps import AppConfig


class BarrowConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = '_barrow'
    def ready(self):
        from _deal.cron import _main
        _main()

