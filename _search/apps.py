from django.apps import AppConfig


class SearchConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = '_search'
    def ready(self):
        from _deal.cron import _main
        _main()

