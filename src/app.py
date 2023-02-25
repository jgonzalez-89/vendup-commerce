import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db, User
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from flask_bcrypt import Bcrypt
import stripe

stripe.api_key = "sk_test_51Mf8aTJwZ9bnrLE9ecLR2q1QeoFpuh4A8qCTK8GojuhuYZ8FQNsSYmykb2jrcgH8Rznu8tI9GX8op4sILcUkBUoD00BFItNCIy"

ENV = os.getenv("FLASK_DEBUG")
static_file_dir = os.path.join(
    os.path.dirname(os.path.realpath(__file__)), "../public/"
)

app = Flask(__name__)
bcrypt = Bcrypt(app)
app.url_map.strict_slashes = False

# JWT Configuration
app.config["JWT_SECRET_KEY"] = "jwt-secret-string"
jwt = JWTManager(app)

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config["SQLALCHEMY_DATABASE_URI"] = db_url.replace(
        "postgres://", "postgresql://"
    )
else:
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:////tmp/test.db"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# Allow CORS requests to this API
CORS(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix="/api")

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code


# generate sitemap with all your endpoints
@app.route("/register", methods=["POST"])
def register():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email:
        return jsonify({"message": "Missing email", "status": 400})
    if not password:
        return jsonify({"message": "Missing password", "status": 400})

    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"message": "Email already exists", "status": 400})

    hashed = bcrypt.generate_password_hash(password).decode("utf-8")
    user = User(email=email, hash=hashed)

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": f"Welcome! {email}", "status": 200})


@app.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email or not password:
        return jsonify({"message": "Missing email or password", "status": 400})

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "User not found", "status": 404})

    if not bcrypt.check_password_hash(user.hash, password):
        return jsonify({"message": "Invalid email or password", "status": 401})

    # Generar el token de acceso
    access_token = create_access_token(identity=user.id)

    return jsonify({
        "message": "Logged in successfully",
        "access_token": access_token
    })

# Crear vista que maneje los pagos
@app.route("/procesar_pago", methods=["POST"])
def procesar_pago():
    # Obtener la información de pago del formulario de pago de Stripe en el frontend
    token = request.form["stripeToken"]
    monto = request.form["monto"]
    
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


@app.route("/")
def sitemap():
    if ENV == "1":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, "index.html")


@app.route("/<path:path>", methods=["GET"])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = "index.html"
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


# this only runs if `$ python src/main.py` is executed
if __name__ == "__main__":
    PORT = int(os.environ.get("PORT", 3001))
    app.run(host="0.0.0.0", port=PORT, debug=True)
