from django.shortcuts import render
from rest_framework import viewsets
from .models import SiteUser
from .serializers import UserSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework import status
from rest_framework.response import Response

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = SiteUser.objects.all()
    serializer_class = UserSerializer


class UserObtainToken(ObtainAuthToken):
    def post(self,request, *args, **kwargs):
        username = request.data.get('username')
        chekUser = SiteUser.objects.filter(username=username)

        if not chekUser:
            return Response({'error':'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        response = super(UserObtainToken,self).post(request, *args, **kwargs)
        token = response.data['token']
        user = SiteUser.objects.get(username=username)
        userserializer = UserSerializer(user)
        return Response({'token':token, 'user':userserializer.data})
