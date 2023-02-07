"""empty message

Revision ID: 1a3e1ac6d863
Revises: 
Create Date: 2023-02-03 10:31:14.919550

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1a3e1ac6d863'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('User',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('account_number', sa.Integer(), nullable=False),
    sa.Column('paypal', sa.String(length=255), nullable=False),
    sa.Column('user_profile_img', sa.String(), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('password', sa.String(length=255), nullable=False),
    sa.Column('is_admin', sa.Boolean(), nullable=False),
    sa.Column('created_at_user', sa.DateTime(), nullable=False),
    sa.Column('update_at_user', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('paypal')
    )
    op.create_table('Product',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('price', sa.Numeric(precision=19, scale=4), nullable=False),
    sa.Column('images', sa.String(), nullable=False),
    sa.Column('created_at_product', sa.DateTime(), nullable=False),
    sa.Column('status_shooping', sa.Enum('active', 'inactive', 'reserved', name='_status_shopping_enum'), nullable=False),
    sa.ForeignKeyConstraint(['owner_id'], ['User.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('Shopping_Product',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('buyer_id', sa.Integer(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.Column('status_shopping', sa.Enum('active', 'inactive', 'completed', name='_shoppingProduct_enum'), nullable=False),
    sa.Column('created_at_shopping', sa.DateTime(), nullable=False),
    sa.Column('updated_at_shopping', sa.DateTime(), nullable=False),
    sa.Column('price', sa.Numeric(), nullable=False),
    sa.Column('status_paid', sa.Enum('paid', 'pending', 'refunded', name='_status_paid_enum'), nullable=False),
    sa.Column('paid_at', sa.DateTime(), nullable=False),
    sa.Column('purchase_method', sa.String(), nullable=False),
    sa.Column('commission', sa.Numeric(precision=6, scale=2), nullable=False),
    sa.ForeignKeyConstraint(['buyer_id'], ['User.id'], ),
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