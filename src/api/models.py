from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey, Enum

db = SQLAlchemy()


# class User_Test(db.Model):
#     id = db.db.Column(db.db.Integer, primary_key=True)
#     email = db.db.Column(db.db.String(120), unique=True, nullable=False)
#     password = db.db.Column(db.db.String(80), unique=False, nullable=False)
#     is_active = db.db.Column(db.Boolean(), unique=False, nullable=False)

#     def __repr__(self):
#         return f'<User_Test {self.email}>'

#     def serialize(self):
#         return {
#             "id": self.id,
#             "email": self.email,
#             # do not serialize the password, its a security breach
#         }

class Product(db.Model):
    __tablename__ = 'Product'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    description = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, nullable=False)
    images = db.Column(db.String, nullable=False)
    shopping_cart_products = db.relationship('ShoppingCartProduct', back_populates='product')

class User(db.Model):
    __tablename__ = 'User'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    is_admin = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)
    shopping_cart = db.relationship('ShoppingCart', back_populates='user')

class ShoppingCart(db.Model):
    __tablename__ = 'Shopping_Cart'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)
    status = db.Column(db.Enum('active', 'inactive', 'completed', name='shopping_cart_status_enum'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)
    user = db.relationship('User', back_populates='shopping_cart')
    products = db.relationship('ShoppingCartProduct', back_populates='shopping_cart')
    bill = db.relationship('Bill', uselist=False, back_populates='shopping_cart')

class ShoppingCartProduct(db.Model):
    __tablename__ = 'Shopping_Cart_Product'
    shopping_cart_id = db.Column(db.Integer, db.ForeignKey('Shopping_Cart.id'), primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('Product.id'), primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    shopping_cart = db.relationship('ShoppingCart', back_populates='products')
    product = db.relationship('Product', back_populates='shopping_cart_products')

class Bill(db.Model):
    __tablename__ = 'Bill'
    id = db.Column(db.Integer, primary_key=True)
    shopping_cart_id = db.Column(db.Integer, ForeignKey('Shopping_Cart.id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    status = db.Column(db.Enum('paid', 'pending', 'refunded', name='bill_status_enum'), nullable=False)
    shopping_cart = db.relationship('ShoppingCart', back_populates='bill')
