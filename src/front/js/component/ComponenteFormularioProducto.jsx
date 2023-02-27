import React, { useState } from 'react';
import { Container, Form, FormGroup, FormLabel, FormControl, Button, FormSelect } from 'react-bootstrap';
import { HttpHandler } from '../../../http/handler';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { categories } from '../../../../data';

const cld = new CloudinaryImage('Prueba', {
  cloudName: 'dazdmgrf8',
  apiKey: '183117376743833',
  apiSecret: 'RFasbAmBv7LtgBfTyUAQcJCEfcA',
});

const ProductoComponent = ({ userId }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [product, setProduct] = useState({
    owner_id: userId,
    category: '',
    name: '',
    description: '',
    price: '',
    images: '', // incluye la información de la imagen
    imagePreviewUrl: '', // incluye una vista previa de la imagen
  });
  const httpHandler = new HttpHandler();

  const resetForm = () => {
    setProduct((prevState) => ({
      ...prevState,
      name: '',
      category: '',
      description: '',
      price: '',
      images: '',
      imagePreviewUrl: '',
    }));
  };

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
        owner_id: product.owner_id,
        name: product.name,
        description: product.description,
        price: product.price,
        images: product.images,
        created_at_product: new Date().toISOString(), // Agregar fecha actual
      };
      const response = await httpHandler.postProduct(payload);
      // console.log(response);
      setShowMessage(true);
      resetForm();
    } catch (error) {
      console.error(error);
    }
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

  // console.log(product);

  return (
    <>
      <div>
        <h1 className="text-center">¿Qué subirás? En Vendup hay sitio para (casi) todo</h1>
      </div>
      <Container className="my-5 border shadow p-5 rounded mb-5">
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

          <FormGroup controlId="productName" className="mt-3">
            <FormLabel>Nombre del producto</FormLabel>
            <FormControl type="text" name="name" value={product.name} onChange={handleInputChange} placeholder="Introduce el nombre del producto" required />
          </FormGroup>

          <FormGroup controlId="productDescription" className="mt-3">
            <FormLabel>Descripción del producto</FormLabel>
            <FormControl as="textarea" rows={3} name="description" value={product.description} onChange={handleInputChange} placeholder="Introduce la descripción del producto" required />
          </FormGroup>

          <FormGroup controlId="productPrice" className="mt-3">
            <FormLabel>Precio del producto</FormLabel>
            <FormControl type="number" name="price" value={product.price} onChange={handleInputChange} placeholder="Introduce el precio del producto" required />
          </FormGroup>

          <FormGroup controlId="productImage" className="mt-3">
            <FormLabel>Imagen del producto</FormLabel>
            {product.imagePreviewUrl && <img src={product.imagePreviewUrl} alt="Vista previa de la imagen" style={{ maxWidth: '100%', maxHeight: '150px', margin: '30px' }} />}
            <FormControl type="file" name="image" onChange={handleInputChange} placeholder="Selecciona una imagen del producto" />
          </FormGroup>

          <div className="d-flex justify-content-center m-4">
            <Button variant="warning" type="submit">
              Subir producto
            </Button>
          </div>
          {showMessage && <div className="alert alert-success text-center">El producto se ha enviado con éxito</div>}
        </Form>
      </Container>
    </>
  );
};

export default ProductoComponent;
