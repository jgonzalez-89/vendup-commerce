import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { HttpHandler } from '../../../http/handler.js';
import { CloudinaryImage } from '@cloudinary/url-gen';

const cld = new CloudinaryImage('Prueba', {
  cloudName: process.env.CLOUDINARY_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
});

const FormularioComponent = ({ selectedProduct, onCloseModal }) => {
  const handler = new HttpHandler();
  const [product, setProduct] = useState({
    id: selectedProduct.id,
    owner_id: selectedProduct.owner_id,
    name: selectedProduct.name,
    description: selectedProduct.description,
    price: selectedProduct.price,
    images: selectedProduct.images,
  });

  const handleInputChange = async (event) => {
    const { name, value, type, files } = event.target;
    if (type === 'file') {
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'ml_default'); // incluye el upload preset de Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cld.cloudName}/image/upload`, // endpoint de Cloudinary para subir imágenes
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();
      // console.log(data);
      setProduct((prevState) => ({
        ...prevState,
        images: data.secure_url,
      }));
      handleImagePreview(file); // crea una vista previa de la imagen
    } else {
      setProduct((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        id: selectedProduct.id,
        owner_id: product.owner_id,
        name: product.name,
        description: product.description,
        price: product.price,
        images: product.images,
      };
      const response = await handler.putProductById(selectedProduct.id, payload);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    onCloseModal();
  };

  const handleImagePreview = (file) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setProduct((prevState) => ({
        ...prevState,
        imagePreviewUrl: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

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
          {product.imagePreviewUrl && <img src={product.imagePreviewUrl} alt="Vista previa de la imagen" style={{ maxWidth: '100%', maxHeight: '150px', margin: '30px' }} />}
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
