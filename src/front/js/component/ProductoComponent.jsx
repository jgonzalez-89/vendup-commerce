import React, { useState } from 'react';
import { Container, Form, FormGroup, FormLabel, FormControl, Button, FormSelect } from 'react-bootstrap';
import { HttpHandler } from '../../../http/handler';
import {fill} from "@cloudinary/url-gen/actions/resize";
import {CloudinaryImage} from '@cloudinary/url-gen';

const myImage = new CloudinaryImage('sample', {cloudName: 'dazdmgrf8'}).resize(fill().width(100).height(150));

const categories = [
  { value: 'Coches', label: 'Coches' },
  { value: 'Coches eléctricos', label: 'Coches eléctricos' },
  { value: 'Motos', label: 'Motos' },
];

const ProductoComponent = ({ userId }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [product, setProduct] = useState({
    owner_id: userId,
    category: '',
    name: '',
    description: '',
    price: '',
    image: '',
  });
  const httpHandler = new HttpHandler();

  const resetForm = () => {
    setProduct((prevState) => ({
      ...prevState,
      name: '',
      description: '',
      price: '',
      image: '',
    }));
  };

  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        ...product,
        created_at_product: new Date().toISOString(),
      };
      const response = await httpHandler.postProduct(payload);
      console.log(response);
      setShowMessage(true);
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-center my-5">¿Qué subirás? En Vendup hay sitio para (casi) todo</h1>
      </div>
      <Container className="my-5 border shadow p-5 rounded">
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
            <FormControl type="file" name="image" onChange={handleInputChange} placeholder="Selecciona una imagen del producto" />
          </FormGroup>
          <div className="d-flex justify-content-center m-4">
            <Button variant="warning" type="submit">
              Subir producto
            </Button>
          </div>
        </Form>
      </Container>
      {showMessage && <div className="alert alert-success text-center">El producto se ha enviado con éxito</div>}
    </>
  );
};

export default ProductoComponent;

// { value: 'Motor y Accesorios', label: 'Motor y Accesorios' },
// { value: 'Moda y Accesorios', label: 'Moda y Accesorios' },
// { value: 'Inmobiliaria', label: 'Inmobiliaria' },
// { value: 'TV, Audio y Foto', label: 'TV, Audio y Foto' },
// { value: 'Móviles y Telefonía', label: 'Móviles y Telefonía' },
// { value: 'Informática y Electrónica', label: 'Informática y Electrónica' },
// { value: 'Deporte y Ocio', label: 'Deporte y Ocio' },
// { value: 'Bicicletas', label: 'Bicicletas' },
// { value: 'Consolas y Videojuegos', label: 'Consolas y Videojuegos' },
// { value: 'Hogar y Jardín', label: 'Hogar y Jardín' },
// { value: 'Electrodomésticos', label: 'Electrodomésticos' },
// { value: 'Cine, Libros y Música', label: 'Cine, Libros y Música' },
// { value: 'Niños y Bebés', label: 'Niños y Bebés' },
// { value: 'Coleccionismo', label: 'Coleccionismo' },
// { value: 'Construcción y Reformas', label: 'Construcción y Reformas' },
// { value: 'Industria y Agricultura', label: 'Industria y Agricultura' },
// { value: 'Otros', label: 'Otros' },
