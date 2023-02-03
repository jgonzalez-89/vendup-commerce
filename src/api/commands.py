
import click, string, random, names, uuid
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

select_words = ["Nuevo", "Usado", "Semi", "Fresco", "Feliz", "Brillante", "Mágico", "Max", "Pro", "Ultra", "Elite", "Super", "Plus", "Eco", "Vibrante", "Elegante", "Moderno", "Futurista", "Dinámico", "De Lujo", "Avanzado", "Calidad", "Impresionante", "Genial", "Experto", "Esencial", "Práctico", "Lujo"]


# Use this command to create Users and Products
# $ flask test-users 10 && flask test-products 100

def setup_commands(app):
    """Set up the test-users command for the Flask app."""

    @app.cli.command("test-users")  # flask test-users $
    @click.argument("count")  # argument of out command
    def insert_test_user(count):
        def generate_random_password(length=16, chars=string.ascii_letters + string.digits + string.punctuation):
            return ''.join(random.choice(chars) for i in range(length))

        def generate_random_person_name():
            return names.get_full_name()

        print("Creating test users...")
        for x in range(1, int(count) + 1):
            user = User()
            user.name = generate_random_person_name()
            user.email = user.name.lower().replace(" ", "") + "@test.com"
            user.password = generate_random_password()
            user.is_admin = False
            user.created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            user.updated_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
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
            category = random.choice(list(categories.keys()))
            product_name = random.choice(categories[category][0])
            http_url = categories[category][1]
            word = random.choice(select_words)

            if category == http_url:
                return http_url

            product = Product()
            product.name = f"{product_name} {word}" 
            product.hash_id = str(uuid.uuid4())
            product.description = f"A brief description of {product_name} located in the ({category}) category."
            product.price = random_price()
            product.images = ':'.join(http_url)
            db.session.add(product)
            db.session.commit()

        print(f"Created {count} products")
