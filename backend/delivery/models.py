from django.db import models
from datetime import date

# Create your models here.
class Order(models.Model):
	id = models.AutoField(primary_key=True)
	order_id = models.IntegerField(default=0)
	dealer_name = models.CharField(max_length=255, default="null")
	client_name = models.CharField(max_length=255, default="null")
	location = models.CharField(max_length=255, default="null")
	order_price = models.FloatField(default=0)
	order_currency = models.CharField(max_length=255, default="null")
	delivery_LBP = models.FloatField(default=0)
	delivery_Dollar = models.FloatField(default=0)
	final_amount_LBP = models.FloatField(default=0)
	final_amount_Dollar = models.FloatField(default=0)
	driver_tax = models.FloatField(default=0)
	driver_tax_Currency = models.CharField(max_length=255, default="dollar")
	remaining_amount_LBP = models.FloatField(default=0)
	remaining_amount_Dollar = models.FloatField(default=0)
	items = models.CharField(max_length=1000, default="null")
	date = models.DateField(default=date.today)
	user = models.CharField(max_length=255, default="null")
	status = models.CharField(max_length=255, default="Pending")

	def __str__(self):
		return f"id={self.id}, name={self.name}, delivery={self.delivery}, status={self.status}"


class User(models.Model):
	id = models.AutoField(primary_key=True)
	username = models.CharField(max_length=255)
	password = models.CharField(max_length=255)
	admin = models.BooleanField(default=False)

	def __str__(self):
		return f"id={self.id}, user={self.username}, admin={self.admin}"

class Employee(models.Model):
	id = models.AutoField(primary_key=True)
	payment_id = models.IntegerField(default=5)
	name = models.CharField(max_length=255)
	payment = models.CharField(max_length=255)
	quantity = models.FloatField()
	currency = models.CharField(max_length=255)
	date = models.DateField(default=date.today)
	user = models.CharField(max_length=255)

	def __str__(self):
		return f"id={self.id}, name={self.name}, quantity={self.quantity}, currency={self.currency}, user={self.user}"
