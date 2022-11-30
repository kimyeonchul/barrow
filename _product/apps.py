from django.apps import AppConfig


class ProductConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = '_product'
    def ready(self):
        from _deal.cron import _main
        _main()

