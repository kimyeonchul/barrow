from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('account/', include('_account.urls')),
    path('chatting/', include('_chatting.urls')),
    path('deal/', include('_deal.urls')),
    path('payment/', include('_payment.urls')),
    path('product/', include('_product.urls')),
    path('search/', include('_search.urls')),
]
