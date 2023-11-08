from django.db import models
from datetime import datetime
from user_api.models import SiteUser

# Create your models here.
def upload_location(instance, filename):
    filebase,extension = filename.split('.')
    return "product_image/%s_%s.%s" % (str(instance.id), str(datetime.now()), extension)


class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=500)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    photo = models.ImageField(upload_to=upload_location, blank=True)

    def __str__(self):
        return self.name


class CartItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return self.product.name

    def total(self):
        return self.product.price * self.quantity


ORDER_STATUS = (
    ('Pending','Pending'),
    ('Delivered','Delivered'),
    ('Cancelled','Cancelled'),
)

class Orders(models.Model):
    user = models.ForeignKey(SiteUser, on_delete=models.CASCADE)
    items = models.ManyToManyField(CartItem)
    address = models.CharField(max_length=100)
    date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=ORDER_STATUS, default='Pending')
    total = models.DecimalField(max_digits=6, decimal_places=2, default=0)

    def __str__(self):
        return self.user.username + " " + str(self.date)

    def set_order_total(self):
        total = 0
        for item in self.items.all():
            total += item.total()
        self.total = total
        self.save()
        