from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Product
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    output = []
    for user in users:
        user_data = {}
        user_data['id'] = user.id
        user_data['gender'] = user.gender
        user_data['name'] = user.name
        user_data['account_prefix'] = user.account_prefix
        user_data['account_number'] = user.account_number
        user_data['paypal'] = user.paypal
        user_data['email'] = user.email
        user_data['is_admin'] = user.is_admin
        user_data['login_username'] = user.login_username
        user_data['login_password'] = user.login_password
        user_data['location_street_number'] = user.location_street_number
        user_data['location_street_name'] = user.location_street_name
        user_data['location_city'] = user.location_city
        user_data['location_state'] = user.location_state
        user_data['location_country'] = user.location_country
        user_data['location_postcode'] = user.location_postcode
        user_data['dob_date'] = user.dob_date
        user_data['dob_age'] = user.dob_age
        user_data['registered_date'] = user.registered_date
        user_data['phone'] = user.phone
        user_data['picture_large'] = user.picture_large
        user_data['picture_medium'] = user.picture_medium
        user_data['picture_thumbnail'] = user.picture_thumbnail

        output.append(user_data)
    return jsonify({'users': output})


@api.route('/users/<int:id>', methods=['GET'])
def get_user_by_id(id):
    user = User.query.get(id)
    if not user:
        return jsonify({'message': 'No user found with that ID'}), 404

    user_data = {}
    user_data['id'] = user.id
    user_data['gender'] = user.gender
    user_data['name'] = user.name
    user_data['account_prefix'] = user.account_prefix
    user_data['account_number'] = user.account_number
    user_data['paypal'] = user.paypal
    user_data['email'] = user.email
    user_data['is_admin'] = user.is_admin
    user_data['login_username'] = user.login_username
    user_data['login_password'] = user.login_password
    user_data['location_street_number'] = user.location_street_number
    user_data['location_street_name'] = user.location_street_name
    user_data['location_city'] = user.location_city
    user_data['location_state'] = user.location_state
    user_data['location_country'] = user.location_country
    user_data['location_postcode'] = user.location_postcode
    user_data['dob_date'] = user.dob_date
    user_data['dob_age'] = user.dob_age
    user_data['registered_date'] = user.registered_date
    user_data['phone'] = user.phone
    user_data['picture_large'] = user.picture_large
    user_data['picture_medium'] = user.picture_medium
    user_data['picture_thumbnail'] = user.picture_thumbnail
    user_data['products'] = [{
        'id': product.id,
        'name': product.name,
        'price': product.price,
        'description': product.description,
        'images': product.images,
        'created_at_product': product.created_at_product,
        'status_shooping': product.status_shooping} for product in user.products]
    return jsonify({'user': user_data})


@api.route('/products', methods=['GET'])
def get_all_products():
    products = Product.query.all()
    output = []
    for product in products:
        product_data = {}
        product_data['id'] = product.id
        product_data['name'] = product.name
        product_data['description'] = product.description
        product_data['price'] = product.price
        output.append(product_data)
    return jsonify({'product': output})


@api.route('/products/<int:id>', methods=['GET'])
def get_product_by_id(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({'message': 'No product found with that ID'}), 404

    product_data = {}
    product_data['id'] = product.id
    product_data['name'] = product.name
    product_data['owner_id'] = product.owner_id
    product_data['description'] = product.description
    product_data['price'] = product.price
    product_data['images'] = product.images
    product_data['created_at_product'] = product.created_at_product
    product_data['status_shooping'] = product.status_shooping

    return jsonify({'product': product_data})
