from django.contrib import admin
from django.urls import path, include
from config import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('_barrow.urls')),
    path('account/', include('_account.urls')),
    path('chatting/', include('_chatting.urls')),
    path('deal/', include('_deal.urls')),
    path('payment/', include('_payment.urls')),
    path('product/', include('_product.urls')),
    path('search/', include('_search.urls')),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)