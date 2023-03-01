import React, { useState } from 'react';
import { Container, Form, FormGroup, FormLabel, FormControl, Button, FormSelect, ModalFooter, InputGroup } from 'react-bootstrap';
import { HttpHandler } from '../../../http/handler.js';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { categories } from '../../../../data';

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
        <FormGroup controlId="categoryName" className="mt-3">
          <FormLabel>Categoría del producto</FormLabel>
          <FormSelect aria-label="Default select example" name="category" value={product.category} onChange={handleInputChange} required>
            <option value="">Selecciona una categoría para tu producto</option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </FormSelect>
        </FormGroup>

        <FormGroup controlId="productName">
          <FormLabel>Nombre del producto</FormLabel>
          <FormControl type="text" name="name" value={product.name} onChange={handleInputChange} placeholder="Introduce el nombre del producto" />
        </FormGroup>

        <FormGroup controlId="productDescription">
          <FormLabel>Descripción del producto</FormLabel>
          <FormControl as="textarea" rows={3} name="description" value={product.description} onChange={handleInputChange} placeholder="Introduce la descripción del producto" />
        </FormGroup>

        <FormGroup controlId="productPrice">
          <FormLabel>Precio del producto</FormLabel>
          <InputGroup>
            <FormControl
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              placeholder="Introduce el precio del producto"
              aria-label="Precio del producto"
            />
            <InputGroup.Text>€</InputGroup.Text>
          </InputGroup>
        </FormGroup>

        <FormGroup controlId="productImage">
          <FormLabel>Imagen del producto</FormLabel>
          {product.imagePreviewUrl && <img src={product.imagePreviewUrl} alt="Vista previa de la imagen" style={{ maxWidth: '100%', maxHeight: '150px', margin: '30px' }} />}
          <FormControl type="file" name="image" onChange={handleInputChange} placeholder="Selecciona una imagen del producto" />
        </FormGroup>
        <ModalFooter>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="warning" type="submit">
            Guardar cambios
          </Button>
        </ModalFooter>
      </Form>
    </>
  );
};

export default FormularioComponent;
