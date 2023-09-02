from django.contrib import admin
from .models import Order, User, Employee

# Register your models here.
class OrderAdmin(admin.ModelAdmin):
	list_display = ('id', 'order_id', 'dealer_name', 'client_name', 'location', 'order_price', 'order_currency', 'delivery_LBP', 'delivery_Dollar', 'final_amount_LBP', 'final_amount_Dollar', 'driver_tax', 'driver_tax_Currency', 'remaining_amount_LBP', 'remaining_amount_Dollar', 'items', 'date', 'user', 'status')

class UserAdmin(admin.ModelAdmin):
	list_display = ('id', 'username', 'password', 'admin')

class EmployeeAdmin(admin.ModelAdmin):
	list_display = ('id','payment_id', 'name', 'payment', 'quantity', 'currency', 'date', 'user')

admin.site.register(Order, OrderAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Employee, EmployeeAdmin)