"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    output = []
    for user in users:
        user_data = {}
        user_data['id'] = user.id
        user_data['name'] = user.name
        user_data['paypal'] = user.paypal
        user_data['user_profile_img'] = user.user_profile_img
        user_data['email'] = user.email
        user_data['password'] = user.password
        user_data['is_admin'] = user.is_admin
        user_data['created_at_user'] = user.created_at_user
        output.append(user_data)
    return jsonify({'users' : output})

@api.route('/users/<int:id>', methods=['GET'])
def get_user_by_id(id):
    user = User.query.get(id)
    if not user:
        return jsonify({'message': 'No user found with that ID'}), 404

    user_data = {}
    user_data['id'] = user.id
    user_data['name'] = user.name
    user_data['paypal'] = user.paypal
    user_data['user_profile_img'] = user.user_profile_img
    user_data['email'] = user.email
    user_data['password'] = user.password
    user_data['is_admin'] = user.is_admin
    user_data['created_at_user'] = user.created_at_user
    user_data['products'] = [{'id': product.id, 'name': product.name, 'price': product.price} for product in user.products]
    return jsonify({'user': user_data})