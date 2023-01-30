
import click
from api.models import db, User
from datetime import datetime
import string
import random
import names


def generate_random_person_name():
    """Generate a random full name using the names library."""
    return names.get_full_name()


def generate_random_password(length=16, chars=string.ascii_letters + string.digits + string.punctuation):
    """Generate a random password of specified length and character set."""
    return ''.join(random.choice(chars) for i in range(length))


def setup_commands(app):
    """Set up the test-users command for the Flask app."""

    @app.cli.command("test-users")  # flask test-users $
    @click.argument("count")  # argument of out command
    def insert_test_data(count):
        """Insert test data for the specified number of users."""
        print("Creating test users")
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
            print("User: ", user.email, " created.")

        print("All test users created")
