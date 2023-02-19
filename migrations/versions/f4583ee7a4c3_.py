"""empty message

Revision ID: f4583ee7a4c3
Revises: 
Create Date: 2023-02-18 23:50:48.726743

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f4583ee7a4c3'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('User',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=True),
    sa.Column('surnames', sa.String(length=100), nullable=True),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('is_admin', sa.Boolean(), nullable=True),
    sa.Column('password', sa.String(length=200), nullable=True),
    sa.Column('hash', sa.Text(), nullable=True),
    sa.Column('location_city', sa.String(length=50), nullable=True),
    sa.Column('location_state', sa.String(length=50), nullable=True),
    sa.Column('location_country', sa.String(length=50), nullable=True),
    sa.Column('location_postcode', sa.String(length=50), nullable=True),
    sa.Column('dob_date', sa.String(length=100), nullable=True),
    sa.Column('dob_age', sa.Integer(), nullable=True),
    sa.Column('registered_date', sa.String(length=100), nullable=True),
    sa.Column('phone', sa.String(length=20), nullable=True),
    sa.Column('picture_large', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('Product',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('category', sa.String(), nullable=True),
    sa.Column('price', sa.Numeric(precision=7, scale=2), nullable=True),
    sa.Column('images', sa.String(), nullable=True),
    sa.Column('created_at_product', sa.DateTime(), nullable=True),
    sa.Column('status_shooping', sa.Enum('active', 'inactive', 'reserved', name='status_shooping_enum_3'), nullable=True),
    sa.ForeignKeyConstraint(['owner_id'], ['User.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('Shopping_Product',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.Column('status_shopping', sa.Enum('active', 'inactive', 'completed', name='status_shopping_enum_4'), nullable=False),
    sa.Column('created_at_shopping', sa.DateTime(), nullable=False),
    sa.Column('updated_at_shopping', sa.DateTime(), nullable=False),
    sa.Column('price', sa.Numeric(), nullable=False),
    sa.Column('status_paid', sa.Enum('paid', 'pending', 'refunded', name='status_paid_enum_3'), nullable=False),
    sa.Column('paid_at', sa.DateTime(), nullable=False),
    sa.Column('purchase_method', sa.String(), nullable=False),
    sa.Column('commission', sa.Numeric(precision=6, scale=2), nullable=False),
    sa.ForeignKeyConstraint(['owner_id'], ['User.id'], ),
    sa.ForeignKeyConstraint(['product_id'], ['Product.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('Shopping_Product')
    op.drop_table('Product')
    op.drop_table('User')
    # ### end Alembic commands ###