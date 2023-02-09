from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey, Enum
import bcrypt

db = SQLAlchemy()


class Product(db.Model):
    __tablename__ = 'Product'
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)
    name = db.Column(db.String(255), nullable=False, unique=True)
    description = db.Column(db.String, nullable=False)
    price = db.Column(db.Numeric(precision=7, scale=2), nullable=False)
    images = db.Column(db.String, nullable=False)
    created_at_product = db.Column(db.DateTime, nullable=False)
    status_shooping = db.Column(db.Enum('active', 'inactive', 'reserved', name="status_shooping_"), nullable=False)
    owner = db.relationship('User', backref=db.backref('products', lazy=True))



class User(db.Model):
    __tablename__ = 'User'
    id = db.Column(db.Integer, primary_key=True)
    gender = db.Column(db.String(10))
    name = db.Column(db.String(100))
    account_prefix = db.Column(db.String(10))
    account_number = db.Column(db.Numeric(30, 0))
    paypal = db.Column(db.String(255), unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    is_admin = db.Column(db.Boolean)
    username = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(200))
    hash = db.Column(db.Text)
    # hash = db.Column(db.String(200))
    location_street_number = db.Column(db.Integer)
    location_street_name = db.Column(db.String(100))
    location_city = db.Column(db.String(50))
    location_state = db.Column(db.String(50))
    location_country = db.Column(db.String(50))
    location_postcode = db.Column(db.String(50))
    dob_date = db.Column(db.String(100))
    dob_age = db.Column(db.Integer)
    registered_date = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    picture_large = db.Column(db.String)
    picture_medium = db.Column(db.String)
    picture_thumbnail = db.Column(db.String)


class ShoppingProduct(db.Model):
    __tablename__ = "Shopping_Product"
    id = db.Column(db.Integer, primary_key=True)
    buyer_id = db.Column(db.Integer, ForeignKey("User.id"), nullable=False)
    product_id = db.Column(db.Integer, ForeignKey("Product.id"), nullable=False)
    status_shopping = db.Column(db.Enum("active", "inactive", "completed", name="status_shopping_enum_"), nullable=False)
    created_at_shopping = db.Column(db.DateTime, nullable=False)
    updated_at_shopping = db.Column(db.DateTime, nullable=False)
    price = db.Column(db.Numeric, nullable=False)
    status_paid = db.Column(db.Enum("paid", "pending", "refunded", name="status_paid_enum_"), nullable=False)
    paid_at = db.Column(db.DateTime, nullable=False)
    purchase_method = db.Column(db.String, nullable=False)
    commission = db.Column(db.Numeric(6, 2), nullable=False)
    buyer = db.relationship('User', backref=db.backref('shopping_products', lazy=True))
    product = db.relationship('Product', backref=db.backref('shopping_products', lazy=True))
