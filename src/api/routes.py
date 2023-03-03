import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Product, Purchase
from api.utils import generate_sitemap, APIException
from sqlalchemy.exc import IntegrityError
from datetime import datetime
import stripe


api = Blueprint("api", __name__)

stripe.api_key = os.getenv("FLASK_STRIPE_KEY")

##################### Endpoints de User #####################


def serialize_user(user):
    return {
        "id": user.id,
        "name": user.name,
        "surnames": user.surnames,
        "email": user.email,
        "is_premium": user.is_premium,
        "password": user.password,
        "location_city": user.location_city,
        "location_state": user.location_state,
        "location_country": user.location_country,
        "location_postcode": user.location_postcode,
        "dob_date": user.dob_date,
        "registered_date": user.registered_date,
        "phone": user.phone,
        "profile_picture": user.profile_picture,
    }


def serialize_product(product):
    return {
        "id": product.id,
        "owner_id": product.owner_id,
        "name": product.name,
        "premium": product.premium,
        "description": product.description,
        "category": product.category,
        "price": str(product.price),
        "images": product.images,
        "created_at_product": product.created_at_product.strftime("%Y-%m-%d %H:%M:%S"),
        "status_shooping": product.status_shooping,
    }


def serialize_purchase(purchase):
    return {
        "id": purchase.id,
        "owner_id": purchase.owner_id,
        "product_id": purchase.product_id,
        "status_shopping": purchase.status_shopping,
        "created_at_shopping": purchase.created_at_shopping,
        "updated_at_shopping": purchase.updated_at_shopping,
        "price": float(purchase.price) if purchase.price is not None else None,
        "status_paid": purchase.status_paid,
        "paid_at": purchase.paid_at,
        "purchase_method": purchase.purchase_method,
        "commission": float(purchase.commission) if purchase.commission is not None else None,
    }


def serialize_user_with_products(user):
    return {
        **serialize_user(user),
        "products": [serialize_product(product) for product in user.products],
        "purchases": [serialize_product(product.product) for product in user.purchases],
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
        is_premium=data.get("is_premium", False),
        password=data.get("password"),
        hash=data.get("hash"),
        location_city=data.get("location_city"),
        location_state=data.get("location_state"),
        location_country=data.get("location_country"),
        location_postcode=data.get("location_postcode"),
        dob_date=data.get("dob_date"),
        registered_date=data.get("registered_date"),
        phone=data.get("phone"),
        profile_picture=data.get("profile_picture"),
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
    user.is_premium = data.get("is_premium", user.is_premium)
    user.password = data.get("password", user.password)
    user.location_city = data.get("location_city", user.location_city)
    user.location_state = data.get("location_state", user.location_state)
    user.location_country = data.get("location_country", user.location_country)
    user.location_postcode = data.get("location_postcode", user.location_postcode)
    user.dob_date = data.get("dob_date", user.dob_date)
    user.registered_date = data.get("registered_date", user.registered_date)
    user.phone = data.get("phone", user.phone)
    user.profile_picture = data.get("profile_picture", user.profile_picture)

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

##################### Endpoints de Products #####################


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
        premium=data.get("premium", False),
        description=data.get("description"),
        category=data.get("category"),
        price=data.get("price"),
        images=data.get("images"),
        created_at_product=data.get("created_at_product"),
        status_shooping=data.get("status_shooping", True),
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
    product.created_at_product = data.get("created_at_product", product.created_at_product)
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

##################### Endpoints de Purchases #####################


@api.route("/purchases", methods=["GET"])
def get_all_purchases():
    purchases = Purchase.query.all()
    return jsonify({"purchases": [serialize_purchase(purchase) for purchase in purchases]})

@api.route('/purchases/<int:id>', methods=['PUT'])
def update_purchase(id):
    # Obtener el producto comprado por su ID
    purchase = Purchase.query.get(id)

    # Verificar si el producto existe
    if not purchase:
        return jsonify({'message': 'No purchase found with that ID'}), 404

    # Obtener los datos enviados en la solicitud PUT
    data = request.get_json()

    # Actualizar el parámetro deseado del producto comprado
    purchase.status_shopping = data.get('status_shopping', purchase.status_shopping)

    # Guardar los cambios en la base de datos
    db.session.commit()

    # Retornar el producto comprado actualizado
    return jsonify({'purchase': serialize_purchase(purchase)})


@api.route('/purchases', methods=['POST'])
def create_purchases():
    data = request.get_json()

    purchase = Purchase(
        owner_id=data.get('owner_id'),
        product_id=data.get('product_id'),
        status_shopping=True,
        created_at_shopping=datetime.utcnow(),
        price=data.get('price'),
        status_paid='paid',
        paid_at=datetime.utcnow(),
        purchase_method='stripe',
        commission=0.05 * float(data.get('price'))
    )
    db.session.add(purchase)
    db.session.commit()

    # Retornar una respuesta satisfactoria
    return jsonify({'message': 'Shopping product created successfully'}), 201


##################### Endpoints de Stripe #####################


@api.route('/stripe', methods=['POST'])
def procesar_pago():
    # Obtener la información de pago del formulario de pago de Stripe en el frontend
    token = request.json["stripeToken"]
    monto = request.json["monto"]

    try:
        # Utilizar la biblioteca Stripe para procesar el pago
        cargo = stripe.Charge.create(
            amount=int(float(monto) * 100),
            currency="eur",
            description="Descripción del pago",
            source=token
        )
        # Retornar una respuesta satisfactoria si el pago se procesó correctamente
        return jsonify({"status": "success"})
    except stripe.error.CardError as e:
        # Retornar una respuesta de error si el pago falló
        return jsonify({"status": "error", "message": e.user_message})
