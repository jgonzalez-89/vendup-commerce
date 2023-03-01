from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey, Enum


db = SQLAlchemy()


class Product(db.Model):
    __tablename__ = "Product"
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("User.id"), nullable=False)
    name = db.Column(db.String(255))
    description = db.Column(db.String)
    premium = db.Column(db.Boolean)
    category = db.Column(db.String)
    price = db.Column(db.Numeric(precision=8, scale=2))
    images = db.Column(db.String)
    created_at_product = db.Column(db.DateTime)
    status_shooping = db.Column(db.Enum("active", "inactive", "reserved", name="Product_enum_a2"))


class User(db.Model):
    __tablename__ = "User"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    surnames = db.Column(db.String(100))
    email = db.Column(db.String(255), nullable=False, unique=True)
    is_premium = db.Column(db.Boolean)
    password = db.Column(db.String(200))
    hash = db.Column(db.Text)
    location_city = db.Column(db.String(50))
    location_state = db.Column(db.String(50))
    location_country = db.Column(db.String(50))
    location_postcode = db.Column(db.String(50))
    dob_date = db.Column(db.String(100))
    registered_date = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    profile_picture = db.Column(db.String)
    products = db.relationship("Product", backref="owner")
    purchases = db.relationship("Purchase", backref="owner")


class Purchase(db.Model):
    __tablename__ = "Purchase"
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, ForeignKey("User.id"), nullable=False)
    product_id = db.Column(db.Integer, ForeignKey("Product.id"), nullable=False)
    status_shopping = db.Column(db.Enum("active", "inactive", "completed", name="Purchase_enum_a2"))
    created_at_shopping = db.Column(db.DateTime)
    updated_at_shopping = db.Column(db.DateTime)
    price = db.Column(db.Numeric(precision=8, scale=2))
    status_paid = db.Column(db.Enum("paid", "pending", "refunded", name="status_paid_enum_a2"))
    paid_at = db.Column(db.DateTime)
    purchase_method = db.Column(db.String)
    commission = db.Column(db.Numeric(6, 2))
    product = db.relationship("Product", backref=db.backref("purchases", lazy=True))

