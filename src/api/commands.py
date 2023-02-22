import click
import random
import requests
import json
from sqlalchemy import func
from api.models import db, User, Product
from datetime import datetime
from flask_bcrypt import Bcrypt


with open("data.json", "r") as f:
    data = json.load(f)

# --------------- Use this command to create Users and Products ---------------
# -->            $ flask test-users 10 && flask test-products 50


def setup_commands(app):
    """Set up the test-users command for the Flask app."""

    @app.cli.command("test-users")  # flask test-users $
    @click.argument("count")  # argument of out command
    def insert_test_user(count):
        bcrypt = Bcrypt()

        def generate_random_person():
            response = requests.get("https://randomuser.me/api/")
            if response.status_code == 200:
                data = response.json()
                name = data["results"][0]["name"]["first"]
                surnames = data["results"][0]["name"]["last"]
                email = data["results"][0]["email"]
                password = data["results"][0]["login"]["password"]
                location_city = data["results"][0]["location"]["city"]
                location_state = data["results"][0]["location"]["state"]
                location_country = data["results"][0]["location"]["country"]
                location_postcode = data["results"][0]["location"]["postcode"]
                dob_date = data["results"][0]["dob"]["date"]
                dob_age = data["results"][0]["dob"]["age"]
                registered_date = data["results"][0]["registered"]["date"]
                phone = data["results"][0]["phone"]
                picture_large = data["results"][0]["picture"]["large"]
                picture_medium = data["results"][0]["picture"]["medium"]
                picture_thumbnail = data["results"][0]["picture"]["thumbnail"]
                return (
                    name,
                    surnames,
                    email,
                    password,
                    location_city,
                    location_state,
                    location_country,
                    location_postcode,
                    dob_date,
                    dob_age,
                    registered_date,
                    phone,
                    picture_large,
                    picture_medium,
                    picture_thumbnail,
                )
            else:
                print("Error al llamar a la API: ", response.status_code)
                return ""

        print("Creating test users...")
        for x in range(1, int(count) + 1):
            user = User()
            (
                name,
                surnames,
                email,
                password,
                location_city,
                location_state,
                location_country,
                location_postcode,
                dob_date,
                dob_age,
                registered_date,
                phone,
                picture_large,
                picture_medium,
                picture_thumbnail,
            ) = generate_random_person()

            user.name = name
            user.surnames = surnames
            user.email = email
            user.is_admin = False
            user.password = password
            user.hash = bcrypt.generate_password_hash(password).decode("utf-8")
            user.location_city = location_city
            user.location_state = location_state
            user.location_country = location_country
            user.location_postcode = location_postcode
            user.dob_age = dob_age
            user.dob_date = dob_date
            user.registered_date = registered_date
            user.phone = phone
            user.picture_large = picture_large
            user.picture_medium = picture_medium
            user.picture_thumbnail = picture_thumbnail

            db.session.add(user)
            db.session.commit()

        print(f"Created {count} Users")

    @app.cli.command("test-products")  # flask test-products $
    @click.argument("count")  # argument of out command
    def insert_test_product(count):
        """Insert test data for the specified number of products."""

        def random_price():
            return random.randint(1, 9000)

        print("Creating test products...")
        for x in range(1, int(count) + 1):
            # Obtener un objeto de usuario aleatorio desde la base de datos
            random_user = User.query.order_by(func.random()).first()
            category = random.choice(list(data["categories"].keys()))
            product_name = random.choice(data["categories"][category][0])
            http_url = data["categories"][category][1]
            word = random.choice(data["select_words"])
            product_description = data["description"]

            if category == http_url:
                return http_url

            product = Product()
            product.name = f"{product_name} {word}"
            product.description = product_description
            product.category = category
            product.price = random_price()
            product.images = ":".join(http_url)
            product.created_at_product = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            product.status_shooping = "active"
            product.owner_id = random_user.id
            db.session.add(product)
            db.session.commit()

        print(f"Created {count} products")