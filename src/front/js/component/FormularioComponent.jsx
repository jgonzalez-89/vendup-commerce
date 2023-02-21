import React from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { HttpHandler } from '../../../http/handler.js';

const FormularioComponent = ({ selectedProduct, onCloseModal }) => {
  const handler = new HttpHandler();
  const [product, setProduct] = useState({
    id : selectedProduct.id,
    owner_id: selectedProduct.owner_id,
    name: selectedProduct.name,
    description: selectedProduct.description,
    price: selectedProduct.price,
    image: selectedProduct.image,
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
        id : selectedProduct.id,
        owner_id: product.owner_id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
      };
      console.log('Payload:', payload);
      const response = await handler.putProductById(selectedProduct.id, payload);
      // console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    onCloseModal();
  };
  // console.log(selectedProduct);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="productName">
          <Form.Label>Nombre del producto</Form.Label>
          <Form.Control type="text" name="name" value={product.name} onChange={handleInputChange} placeholder="Introduce el nombre del producto" />
        </Form.Group>

        <Form.Group controlId="productDescription">
          <Form.Label>Descripción del producto</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" value={product.description} onChange={handleInputChange} placeholder="Introduce la descripción del producto" />
        </Form.Group>

        <Form.Group controlId="productPrice">
          <Form.Label>Precio del producto</Form.Label>
          <Form.Control type="number" name="price" value={product.price} onChange={handleInputChange} placeholder="Introduce el precio del producto" />
        </Form.Group>

        <Form.Group controlId="productImage">
          <Form.Label>Imagen del producto</Form.Label>
          <Form.Control type="file" name="image" onChange={handleInputChange} placeholder="Selecciona una imagen del producto" />
        </Form.Group>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="warning" type="submit">
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Form>
    </>
  );
};

export default FormularioComponent;
