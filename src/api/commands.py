
import click
import string
import random
import names
import uuid
import requests
import bcrypt
from sqlalchemy import func
from api.models import db, User, Product
from datetime import datetime

categories = {
    "Coches": [["Audi A5", "Nissan Qashqai", "Toyota LandCruiser", "Volkswagen Passat", "Mazda X8", "BMW X5", "Ford Focus", "Mercedes Vito", "Renault Trafic"], ["https://i.ibb.co/mR95PFy/Coches.png"]],
    "Coches eléctricos": [["Smart", "Renault Twingo E-Tech", "Opel Corsa-e Elegance", "Citroën ë-Berlingo", "Tesla Model 3", "BMW i3", "Hyundai Kona Electric", "Chevrolet Bolt", "Volkswagen ID.4"], ["https://i.ibb.co/nM3Xnzy/Coches-Electricos.png"]],
    "Motos": [["Yamaha T-MAX", "Harley Davidson", "Kymco", "Honda CBR", "Yamaha R1", "Kawasaki Ninja", "Ducati Monster", "BMW R1200GS", "Triumph Tiger", "Aprilia RSV4", "KTM Duke"], ["https://i.ibb.co/wyj9x2F/Motos.png"]],
    "Motor y Accesorios": [["Baúl moto", "Llantas Audi", "Chaleco reflectante", "Cámara de acción", "Sistema de navegación GPS", "Guantes", "Funda para lluvia o mal tiempo", "Pantalón de moto"], ["https://i.ibb.co/YpRv3zc/Motor-y-Accesorios.png"]],
    "Moda y Accesorios": [["Anillo", "Vestido de novia", "Sandalias", "Bolsos", "Zapatos", "Relojes", "Gafas de sol", "Anillos", "Collares", "Pulseras", "Sombreros"], ["https://i.ibb.co/z5kYGKL/Moda-y-Accesorios.png"]],
    "Inmobiliaria": [["Piso", "Traspaso Bar", "Departamentos", "Propiedad en alquiler", "Bienes raíces comerciales", "Gestión de propiedades", "Terrenos"], ["https://i.ibb.co/pnbQXf0/Inmobiliaria.png"]],
    "TV, Audio y Foto": [["Cámara de fotos reflex", "Proyector", "Televisor", "Barras de sonido", "Reproductores de Blu-ray", "Altavoces inalámbricos", "Drones", "Reproductores de MP3"], ["https://i.ibb.co/3pQdkVh/TV-Audio-y-Foto.png"]],
    "Móviles y Telefonía": [["Iphone 12", "Samsung Galaxy", "Huawei P", "Google Pixel", "Oppo", "Vivo G", "Motorola Moto", "LG G"], ["https://i.ibb.co/MRWQRh9/M-viles-y-Telefon-a.png"]],
    "Informática y Electrónica": [["MacBook Pro", "Pulsómetro", "iPad Pro", "Apple Watch", "Audífonos", "PC de escritorio", "Impresora", "Adaptador de corriente", "Tarjeta gráfica", "Memoria RAM"], ["https://i.ibb.co/F5Ph3Ns/Inform-tica-y-Electr-nica.png"]],
    "Deporte y Ocio": [["Caña de pescar", "Botas de fútbol", "Raqueta de tenis", "Golf club", "Pelota de baloncesto", "Mochila deportiva", "Gorra", "Botella de agua", "Guantes de boxeo", "Sacos de dormir"], ["https://i.ibb.co/FWqfZ08/Deporte-y-Ocio.png"]],
    "Bicicletas": [["Bicicleta Trek", "Rodillo Bkool", "Casco de ciclismo", "Luz trasera", "Bolsa de manubrio", "Cámara de aire", "Cubrebotas de ciclismo", "Cables de freno", "Herramientas para bicicletas", "Portabultos"], ["https://i.ibb.co/sj4GtnY/Bicicletas.png"]],
    "Consolas y Videojuegos": [["Xbox one", "PlayStation 4 pro", "Nintendo Switch", "Mandos inalámbricos", "Tarjeta de memoria", "Juegos de video", "Headset", "Volante de carreras", "Adaptador HDMI", "Cargador inalámbrico"], ["https://i.ibb.co/L6X25Jb/Consolas-y-Videojuegos.png"]],
    "Hogar y Jardín": [["Mueble Ikea", "Lámparas", "Sillas de jardín", "Mesas de jardín", "Sofá", "Cama", "Muebles de baño", "Colchón", "Toallas de baño", "Almohadas"], ["https://i.ibb.co/gyvjB5n/Hogar-y-Jard-n.png"]],
    "Electrodomésticos": [["Lavadora", "Thermomix", "Horno", "Frigorífico", "Vitrocerámica", "Microondas", "Aire acondicionado", "Secadora", "Lavavajillas", "Calentador de agua"], ["https://i.ibb.co/Fqjc6Fw/Electrodom-sticos.png"]],
    "Cine, Libros y Música": [["Libros infantiles", "Piano", "Batería", "Guitarra", "Altavoces", "Libros de cocina", "Libros de arte", "CDs de música", "Películas en DVD", "MP3 player"], ["https://i.ibb.co/fv8hvg3/Cine-Libros-y-M-sica.png"]],
    "Niños y Bebés": [["Muñeca", "Juguetes", "Bebé Reborn", "Cochecito", "Trona", "Juguetes educativos", "Chupete", "Bañera para bebés", "Biberón", "Pañales"], ["https://i.ibb.co/JR45Kfd/Ni-os-y-Beb-s.png"]],
    "Coleccionismo": [["Figuras de Lladró", "Teléfono antiguo", "Reloj antiguo", "Moneda antigua", "Taza antigua", "Sello antiguo", "Fotografía antigua", "Objeto de arte antiguo", "Militaría antigua", "Cromo antiguo"], ["https://i.ibb.co/CvZHK0H/Coleccionismo.png"]],
    "Construcción y Reformas": [["Puertas de madera", "Soplador", "Herramientas eléctricas", "Llaves de tuza", "Taladro", "Mampostería", "Pintura", "Ladrillos", "Azulejos", "Grifos", "Ventanas", "Techo"], ["https://i.ibb.co/mczCy45/Construcci-n-y-Reformas.png"]],
    "Industria y Agricultura": [["Retroexcavadora", "Tractores", "Maquinaria agrícola", "Montacargas", "Motores diesel", "Generadores eléctricos", "Herramientas manuales", "Compresores de aire", "Herramientas de jardinería", "Sistemas de riego"], ["https://i.ibb.co/DGSqsyk/Industria-y-Agricultura.png"]],
    "Otros": [["Playmobil", "Mesa de billar", "Mueble de juegos", "Decoración para el hogar", "Artículos de oficina", "Regalos personalizados", "Productos de belleza", "Artículos de viaje", "Instrumentos musicales", "Productos de limpieza"], ["https://i.ibb.co/1GtgXCT/Captura-de-pantalla-20230131-212753.png"]]
}

select_words = ["Nuevo", "Usado", "Semi", "Fresco", "Feliz", "Brillante", "Mágico", "Max", "Pro", "Ultra", "Elite", "Super", "Plus", "Eco", "Vibrante",
                "Elegante", "Moderno", "Futurista", "Dinámico", "De Lujo", "Avanzado", "Calidad", "Impresionante", "Genial", "Experto", "Esencial", "Práctico", "Lujo"]


# Use this command to create Users and Products
# $ flask test-users 50 && flask test-products 100

# class User(db.Model):
#     __tablename__ = 'User'
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(100))
#     password = db.Column(db.String(100))

#     def set_password(self, password):
#         self.password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

#     def check_password(self, password):
#         return bcrypt.checkpw(password.encode('utf-8'), self.password)

#     def insert_test_user(count):
#         def generate_random_person():
#             response = requests.get("https://randomuser.me/api/")
#             if response.status_code == 200:
#                 data = response.json()
#                 username = data["results"][0]["login"]["username"]
#                 password = data["results"][0]["login"]["password"]
#                 return(username, password)
#             else:
#                 print("Error al llamar a la API: ", response.status_code)
#                 return ""
#         print("Creating test users...")
#         for x in range(1, int(count) + 1):
#             user = User()
#             username, password =  generate_random_person()
#             user.username = username
#             user.password = password

#             db.session.add(user)
#             db.session.commit()

#         print(f"Created {count} Users")

def setup_commands(app):
    """Set up the test-users command for the Flask app."""

    @app.cli.command("test-users")  # flask test-users $
    @click.argument("count")  # argument of out command
    def insert_test_user(count):

        def generate_random_person():
            response = requests.get("https://randomuser.me/api/")
            if response.status_code == 200:
                data = response.json()
                gender = data["results"][0]["gender"]
                name = data["results"][0]["name"]["first"] + \
                    " " + data["results"][0]["name"]["last"]
                email = data['results'][0]['email']
                username = data["results"][0]["login"]["username"]
                password = data["results"][0]["login"]["password"]
                location_street_name = data['results'][0]['location']['street']['name']
                location_street_number = data['results'][0]['location']['street']['number']
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
                return (gender, name, email, username, password, location_street_name, location_street_number, location_city, location_state, location_country, location_postcode, dob_date, dob_age, registered_date, phone, picture_large, picture_medium, picture_thumbnail)
            else:
                print("Error al llamar a la API: ", response.status_code)
                return ""

        print("Creating test users...")
        for x in range(1, int(count) + 1):
            user = User()
            gender, name, email, username, password, location_street_name, location_street_number, location_city, location_state, location_country, location_postcode, dob_date, dob_age, registered_date, phone, picture_large, picture_medium, picture_thumbnail = generate_random_person()

            user.gender = gender
            user.name = name
            user.account_prefix = 'ES'
            user.account_number = 14650100722030876293
            user.paypal = user.name.lower().replace(" ", "") + "@paypal.com"
            user.email = email
            user.is_admin = False
            user.username = username
            user.set_password(password)
            user.location_street_number = location_street_number
            user.location_street_name = location_street_name
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

        status_options = ["active", "inactive", "completed"]

        print("Creating test products...")
        for x in range(1, int(count) + 1):

            # Obtener un objeto de usuario aleatorio desde la base de datos
            random_user = User.query.order_by(func.random()).first()
            category = random.choice(list(categories.keys()))
            product_name = random.choice(categories[category][0])
            http_url = categories[category][1]
            word = random.choice(select_words)

            if category == http_url:
                return http_url

            product = Product()
            product.name = f"{product_name} {word}"
            product.description = f"A brief description of {product_name} located in the ({category}) category."
            product.price = random_price()
            product.images = ':'.join(http_url)
            product.created_at_product = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            product.status_shooping = "active"
            product.owner_id = random_user.id
            db.session.add(product)
            db.session.commit()

        print(f"Created {count} products")
