from rest_framework import routers
from django.urls import re_path, include
from .views import *

router = routers.DefaultRouter()
router.register('products', ProductViewSet, basename='product')
router.register('cart-items', CartItemViewSet, basename='cart_items')
router.register('orders', OrderViewSet, basename='order')

urlpatterns = [
    re_path(r'^', include(router.urls)),
]
