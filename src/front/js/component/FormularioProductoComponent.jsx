import React from 'react'
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { HttpHandler } from '../../../http/handler.js'

const FormularioProductoComponent = ({selectedProduct, userId}) => {

    const handler = new HttpHandler();

    
    const [product, setProduct] = useState({
        owner_id: userId,
        name: "",
        description: "",
        price: "",
        image: "",
      });

    const handleInputChange = (event) => {
        const { name, value, type, files } = event.target;
        if (type === "file") {
            setProduct({ ...selectedProduct, [name]: files[0] });
        } else {
            setProduct({ ...selectedProduct, [name]: value });
        }
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const payload = {
            owner_id: selectedProduct.owner_id,
            name: selectedProduct.name,
            description: selectedProduct.description,
            price: selectedProduct.price,
            image: selectedProduct.image,
            created_at_product: new Date().toISOString(), // Agregar fecha actual
          };
          console.log("Payload:", payload);
          const response = await handler.putProductById(payload, id);
          console.log(response);
        //   setShowMessage(true); // Cambiar el estado para mostrar el mensaje
        //   resetForm();
        } catch (error) {
          console.error(error);
        }
      };

    //   console.log(selectedProduct)

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="productName">
                    <Form.Label>Nombre del producto</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={selectedProduct.name}
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
                        value={selectedProduct.description}
                        onChange={handleInputChange}
                        placeholder="Introduce la descripción del producto"
                    />
                </Form.Group>

                <Form.Group controlId="productPrice">
                    <Form.Label>Precio del producto</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={selectedProduct.price}
                        onChange={handleInputChange}
                        placeholder="Introduce el precio del producto"
                    />
                </Form.Group>

                {/* <Form.Group controlId="productImage">
                    <Form.Label>Imagen del producto</Form.Label>
                    <Form.Control
                        type="file"
                        name="image"
                        onChange={handleInputChange}
                        placeholder="Selecciona una imagen del producto"
                    />
                </Form.Group> */}
                <div className="d-flex justify-content-center m-4">
                    <Button variant="warning" type="submit">
                        Actualizar producto
                    </Button>
                </div>
            </Form></div>
    )
}

export default FormularioProductoComponent