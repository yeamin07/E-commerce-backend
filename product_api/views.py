from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions,filters
from .models import *
from .serializers import *

# Create your views here.
class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    #permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name','description')

    def perform_create(self,serializer):
        serializer.save()

    def perform_update(self,serializer):
        serializer.save()

    def perform_destroy(self,instance):
        instance.delete()


class CartItemViewSet(ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    #permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def perform_create(self,serializer):
        serializer.save()

    def perform_update(self,serializer):
        serializer.save()

    def perform_destroy(self,instance):
        instance.delete()


class OrderViewSet(ModelViewSet):
    queryset = Orders.objects.all()
    serializer_class = OrderSerializer
    #permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('=user__username')

    def perform_create(self,serializer):
        serializer.save()

    def perform_update(self,serializer):
        serializer.save()

    def perform_destroy(self,instance):
        instance.delete()