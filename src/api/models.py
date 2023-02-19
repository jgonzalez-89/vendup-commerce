from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey, Enum


db = SQLAlchemy()


class Product(db.Model):
    __tablename__ = "Product"
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("User.id"), nullable=False)
    name = db.Column(db.String(255))
    description = db.Column(db.String)
    category = db.Column(db.String)
    price = db.Column(db.Numeric(precision=7, scale=2))
    images = db.Column(db.String)
    created_at_product = db.Column(db.DateTime)
    status_shooping = db.Column(
        db.Enum("active", "inactive", "reserved", name="status_shooping_enum_3")
    )


class User(db.Model):
    __tablename__ = "User"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    surnames = db.Column(db.String(100))
    email = db.Column(db.String(255), nullable=False, unique=True)
    is_admin = db.Column(db.Boolean)
    password = db.Column(db.String(200))
    hash = db.Column(db.Text)
    location_city = db.Column(db.String(50))
    location_state = db.Column(db.String(50))
    location_country = db.Column(db.String(50))
    location_postcode = db.Column(db.String(50))
    dob_date = db.Column(db.String(100))
    dob_age = db.Column(db.Integer)
    registered_date = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    picture_large = db.Column(db.String)
    products = db.relationship("Product", backref="owner")
    shopping_products = db.relationship("ShoppingProduct", backref="owner")


class ShoppingProduct(db.Model):
    __tablename__ = "Shopping_Product"
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, ForeignKey("User.id"), nullable=False)
    product_id = db.Column(db.Integer, ForeignKey("Product.id"), nullable=False)
    status_shopping = db.Column(
        db.Enum("active", "inactive", "completed", name="status_shopping_enum_4"),
        nullable=False,
    )
    created_at_shopping = db.Column(db.DateTime, nullable=False)
    updated_at_shopping = db.Column(db.DateTime, nullable=False)
    price = db.Column(db.Numeric, nullable=False)
    status_paid = db.Column(
        db.Enum("paid", "pending", "refunded", name="status_paid_enum_3"),
        nullable=False,
    )
    paid_at = db.Column(db.DateTime, nullable=False)
    purchase_method = db.Column(db.String, nullable=False)
    commission = db.Column(db.Numeric(6, 2), nullable=False)

    product = db.relationship(
        "Product", backref=db.backref("shopping_products", lazy=True)
    )
