from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey, Enum

db = SQLAlchemy()


class Product(db.Model):
    __tablename__ = 'Product'
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)
    name = db.Column(db.String(255), nullable=False, unique=True)
    description = db.Column(db.String, nullable=False)
    price = db.Column(db.Numeric(precision=19, scale=4), nullable=False)
    images = db.Column(db.String, nullable=False)
    created_at_product = db.Column(db.DateTime, nullable=False)
    status_shooping = db.Column(db.Enum(
        'active', 'inactive', 'reserved', name="_status_shopping_enum"), nullable=False)
    shopping_products = db.relationship(
        'ShoppingProduct', backref='Product', lazy=True)


class User(db.Model):
    __tablename__ = 'User'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    account_number = db.Column(db.Integer, nullable=False)
    paypal = db.Column(db.String(255), nullable=False, unique=True)
    user_profile_img = db.Column(db.String, nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    is_admin = db.Column(db.Boolean, nullable=False)
    created_at_user = db.Column(db.DateTime, nullable=False)
    update_at_user = db.Column(db.DateTime, nullable=False)
    products = db.relationship('Product', backref='User', lazy=True)
    shopping_products = db.relationship(
        'ShoppingProduct', backref='User', lazy=True)


class ShoppingProduct(db.Model):
    __tablename__ = "Shopping_Product"
    id = db.Column(db.Integer, primary_key=True)
    buyer_id = db.Column(db.Integer, ForeignKey("User.id"), nullable=False)
    product_id = db.Column(db.Integer, ForeignKey(
        "Product.id"), nullable=False)
    status_shopping = db.Column(db.Enum(
        "active", "inactive", "completed", name="_shoppingProduct_enum"), nullable=False)
    created_at_shopping = db.Column(db.DateTime, nullable=False)
    updated_at_shopping = db.Column(db.DateTime, nullable=False)
    price = db.Column(db.Numeric, nullable=False)
    status_paid = db.Column(db.Enum(
        "paid", "pending", "refunded", name="_status_paid_enum"), nullable=False)
    paid_at = db.Column(db.DateTime, nullable=False)
    purchase_method = db.Column(db.String, nullable=False)
    commission = db.Column(db.Numeric(6, 2), nullable=False)
    buyer = db.relationship("User", back_populates="shopping_products")
    product = db.relationship("Product", back_populates="shopping_products")
