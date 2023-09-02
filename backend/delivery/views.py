from django.shortcuts import render
from rest_framework import viewsets
from .serializers import OrderSerializer, UserSerializer, EmployeeSerializer
from .models import Order, User, Employee

# Create your views here.

class OrderView(viewsets.ModelViewSet):
	serializer_class = OrderSerializer
	queryset = Order.objects.all()

class UserView(viewsets.ModelViewSet):
	serializer_class = UserSerializer
	queryset = User.objects.all()

class EmployeeView(viewsets.ModelViewSet):
	serializer_class = EmployeeSerializer
	queryset = Employee.objects.all()