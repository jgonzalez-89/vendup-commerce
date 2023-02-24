from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Product, ShoppingProduct
from api.utils import generate_sitemap, APIException
from sqlalchemy.exc import IntegrityError


api = Blueprint("api", __name__)


def serialize_user(user):
    return {
        "id": user.id,
        "name": user.name,
        "surnames": user.surnames,
        "email": user.email,
        "is_admin": user.is_admin,
        "password": user.password,
        "location_city": user.location_city,
        "location_state": user.location_state,
        "location_country": user.location_country,
        "location_postcode": user.location_postcode,
        "dob_date": user.dob_date,
        "dob_age": user.dob_age,
        "registered_date": user.registered_date,
        "phone": user.phone,
        "picture_large": user.picture_large,
    }


def serialize_product(product):
    return {
        "id": product.id,
        "owner_id": product.owner_id,
        "name": product.name,
        "description": product.description,
        "category": product.category,
        "price": str(product.price),
        "images": product.images,
        "created_at_product": product.created_at_product.strftime("%Y-%m-%d %H:%M:%S"),
        "status_shooping": str(product.status_shooping),
    }


def serialize_user_with_products(user):
    return {
        **serialize_user(user),
        "products": [serialize_product(product) for product in user.products],
        "shopping_products": [
            serialize_product(product.product) for product in user.shopping_products
        ],
    }


def serialize_number_of_products(user):
    return {**serialize_user(user), "number_of_products": len(user.products)}


@api.route("/users", methods=["GET"])
def get_all_users():
    users = User.query.all()
    return jsonify({"users": [serialize_number_of_products(user) for user in users]})


@api.route("/users/<int:id>", methods=["GET"])
def get_user_by_id(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"message": "No user found with that ID"}), 404
    return jsonify({"user": serialize_user_with_products(user)})


@api.route("/users", methods=["POST"])
def create_user():
    data = request.get_json()
    user = User(
        name=data.get("name"),
        surnames=data.get("surnames"),
        email=data.get("email"),
        is_admin=data.get("is_admin", False),
        password=data.get("password"),
        hash=data.get("hash"),
        location_city=data.get("location_city"),
        location_state=data.get("location_state"),
        location_country=data.get("location_country"),
        location_postcode=data.get("location_postcode"),
        dob_date=data.get("dob_date"),
        dob_age=data.get("dob_age"),
        registered_date=data.get("registered_date"),
        phone=data.get("phone"),
        picture_large=data.get("picture_large"),
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({"user": serialize_user(user)}), 201


@api.route("/users/<int:id>", methods=["PUT"])
def update_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"message": "No user found with that ID"}), 404

    data = request.get_json()
    user.name = data.get("name", user.name)
    user.surnames = data.get("surnames", user.surnames)
    user.email = data.get("email", user.email)
    user.is_admin = data.get("is_admin", user.is_admin)
    user.password = data.get("password", user.password)
    user.location_city = data.get("location_city", user.location_city)
    user.location_state = data.get("location_state", user.location_state)
    user.location_country = data.get("location_country", user.location_country)
    user.location_postcode = data.get("location_postcode", user.location_postcode)
    user.dob_date = data.get("dob_date", user.dob_date)
    user.dob_age = data.get("dob_age", user.dob_age)
    user.registered_date = data.get("registered_date", user.registered_date)
    user.phone = data.get("phone", user.phone)
    user.picture_large = data.get("picture_large", user.picture_large)

    db.session.commit()
    return jsonify({"user": serialize_user(user)})


@api.route("/users/<int:id>", methods=["DELETE"])
def delete_user(id):
    user = User.query.get(id)
    if user is None:
        return jsonify({"error": "User not found"}), 404

    products = Product.query.filter_by(owner_id=user.id).all()
    for product in products:
        db.session.delete(product)

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User and their products deleted successfully"})


@api.route("/products", methods=["GET"])
def get_all_products():
    products = Product.query.all()
    return jsonify({"product": [serialize_product(product) for product in products]})


@api.route("/products/<int:id>", methods=["GET"])
def get_product_by_id(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({"message": "No product found with that ID"}), 404
    return jsonify({"product": serialize_product(product)})


@api.route("/products", methods=["POST"])
def create_products():
    data = request.get_json()
    product = Product(
        owner_id=data.get("owner_id"),
        name=data.get("name"),
        description=data.get("description"),
        category=data.get("category"),
        price=data.get("price"),
        images=data.get("images"),
        created_at_product=data.get("created_at_product"),
        status_shooping=data.get("status_shooping"),
    )
    db.session.add(product)
    db.session.commit()
    return jsonify({"product": serialize_product(product)}), 201


@api.route("/products/<int:id>", methods=["PUT"])
def update_product(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({"messenge": "No product found with that ID"}), 404

    data = request.get_json()

    product.owner_id = data.get("owner_id", product.owner_id)
    product.name = data.get("name", product.name)
    product.description = data.get("description", product.description)
    product.category = data.get("category", product.category)
    product.price = data.get("price", product.price)
    product.images = data.get("images", product.images)
    product.created_at_product = data.get(
        "created_at_product", product.created_at_product
    )
    product.status_shooping = data.get("status_shooping", product.status_shooping)

    db.session.commit()
    return jsonify({"product": serialize_product(product)})


@api.route("/products/<int:id>", methods=["DELETE"])
def delete_product(id):
    product = Product.query.get(id)
    if product is None:
        return jsonify({"error": "Product not found"}), 404

    db.session.delete(product)
    db.session.commit()

    return jsonify({"message": "Product deleted successfully"})
