import React from 'react'
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { HttpHandler } from "../../../http/handler";



const ProductoComponent = ({userId}) => {
    const handler = new HttpHandler();

    const [product, setProduct] = useState({
        owner_id : userId,
        name: '',
        description: '',
        price: 0,
        image: '',
      });

    const handleInputChange = (event) => {
        const { name, value, type, files } = event.target;
        if (type === 'file') {
            setProduct({ ...product, [name]: files[0] });
        } else {
            setProduct({ ...product, [name]: value });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const payload = {
            owner_id: product.owner_id,
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            created_at_product: new Date().toISOString(), // Agregar fecha actual
          };
          console.log('Payload:', payload);
          const response = await handler.postProduct(payload);
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <>
            <div><h1 className="text-center my-5">¿Qué subirás?
                En Vendup hay sitio para (casi) todo</h1></div>
            <div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="productName">
                        <Form.Label>Nombre del producto</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleInputChange}
                            placeholder="Introduce el nombre del producto"
                        />
                    </Form.Group>

                    <Form.Group controlId="productDescription">
                        <Form.Label>Descripción del producto</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={product.description}
                            onChange={handleInputChange}
                            placeholder="Introduce la descripción del producto"
                        />
                    </Form.Group>

                    <Form.Group controlId="productPrice">
                        <Form.Label>Precio del producto</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleInputChange}
                            placeholder="Introduce el precio del producto"
                        />
                    </Form.Group>

                    <Form.Group controlId="productImage">
                        <Form.Label>Imagen del producto</Form.Label>
                        <Form.Control
                            type="file"
                            name="image"
                            onChange={handleInputChange}
                            placeholder="Selecciona una imagen del producto"
                        />
                    </Form.Group>

                    <Button variant="warning" type="submit">
                        Subir producto
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default ProductoComponent

