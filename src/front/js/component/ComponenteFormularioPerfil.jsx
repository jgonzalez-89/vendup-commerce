import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import { HttpHandler } from '../../../http/handler';
import { CloudinaryImage } from '@cloudinary/url-gen';

const cld = new CloudinaryImage('Prueba', {
  cloudName: process.env.CLOUDINARY_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
});

const AjustesComponent = ({ userId }) => {
  const [validated, setValidated] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [userName, setUserName] = useState({
    email: '',
    name: '',
    surnames: '',
    phone: '',
    dob_age: '',
    dob_date: '',
    location_country: '',
    location_city: '',
    location_postcode: '',
    profile_picture: '',
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false); // nuevo estado para controlar la aceptación de términos y condiciones
  const handler = new HttpHandler();

  useEffect(() => {
    async function getUser() {
      const { user } = await handler.getUserById(userId);
      setUserName(user);
    }
    getUser();
  }, [userId]);

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
      console.log(data);
      setUserName((prevState) => ({
        ...prevState,
        profile_picture: data.secure_url,
      }));
      handleImagePreview(file); // crea una vista previa de la imagen
    } else {
      setUserName((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false || acceptedTerms === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const payload = {
        name: userName.name,
        surnames: userName.surnames,
        email: userName.email,
        phone: userName.phone,
        dob_date: userName.dob_date,
        location_country: userName.location_country,
        location_city: userName.location_city,
        location_postcode: userName.location_postcode,
        profile_picture: userName.profile_picture,
      };
      const response = await handler.putUserById(userId, payload);
      setShowMessage(true);
      window.location.reload(); // recargar la página completa
    } catch (error) {
      console.error(error);
    }
  };

  const handleImagePreview = (file) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setUserName((prevState) => ({
        ...prevState,
        imagePreviewUrl: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  console.log(userName);

  return (
    <>
      <div>
        <h1 className="text-center my-5">Aquí podrás ver y editar los datos de tu perfil</h1>
      </div>
      <Container className="my-5 border shadow p-5 rounded">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <FormGroup as={Col} md="4" controlId="validationCustom01">
              <FormLabel>Nombre</FormLabel>
              <FormControl
                required
                type="text"
                placeholder="Nombre"
                value={userName.name || ''}
                onChange={(e) => setUserName({ ...userName, name: e.target.value })}
              />
              <FormControl.Feedback>Looks good!</FormControl.Feedback>
            </FormGroup>

            <FormGroup as={Col} md="4" controlId="validationCustom02">
              <FormLabel>Apellidos</FormLabel>
              <FormControl
                required
                type="text"
                placeholder="Apellidos"
                value={userName.surnames || ''}
                onChange={(e) => setUserName({ ...userName, surnames: e.target.value })}
              />
              <FormControl.Feedback>Looks good!</FormControl.Feedback>
            </FormGroup>

            <FormGroup as={Col} md="4" controlId="validationCustom03">
              <FormLabel>Fecha de nacimiento</FormLabel>
              <FormControl
                type="date"
                placeholder="Fecha de nacimiento"
                value={userName.dob_date || ''}
                onChange={(e) => setUserName({ ...userName, dob_date: e.target.value })}
              />
              <FormControl.Feedback>¡Se ve bien!</FormControl.Feedback>
            </FormGroup>
          </Row>

          <Row className="mb-3">
            <FormGroup as={Col} md="4" controlId="validationCustom04">
              <FormLabel>Teléfono</FormLabel>
              <FormControl
                type="tel"
                placeholder="Teléfono"
                value={userName.phone || ''}
                onChange={(e) => setUserName({ ...userName, phone: e.target.value })}
              />
              <FormControl.Feedback>¡Se ve bien!</FormControl.Feedback>
            </FormGroup>

            <FormGroup as={Col} md="8" controlId="validationCustom05">
              <FormLabel>Email address</FormLabel>
              <FormControl
                required
                type="email"
                placeholder="name@example.com"
                value={userName.email || ''}
                onChange={(e) => setUserName({ ...userName, email: e.target.value })}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              />
              <FormControl.Feedback>Looks good!</FormControl.Feedback>
            </FormGroup>
          </Row>

          <Row className="mb-3">
            <FormGroup as={Col} md="4" controlId="validationCustom07">
              <FormLabel>País</FormLabel>
              <FormControl
                type="text"
                placeholder="País"
                value={userName.location_country || ''}
                required
                onChange={(e) => setUserName({ ...userName, location_country: e.target.value })}
              />
              <FormControl.Feedback type="invalid">Por favor, proporciona un país válido.</FormControl.Feedback>
            </FormGroup>

            <FormGroup as={Col} md="4" controlId="validationCustom08">
              <FormLabel>Ciudad</FormLabel>
              <FormControl
                type="text"
                placeholder="Ciudad"
                value={userName.location_city || ''}
                required
                onChange={(e) => setUserName({ ...userName, location_city: e.target.value })}
              />
              <FormControl.Feedback type="invalid">Por favor, proporciona una ciudad válida.</FormControl.Feedback>
            </FormGroup>

            <FormGroup as={Col} md="4" controlId="validationCustom09">
              <FormLabel>Código Postal</FormLabel>
              <FormControl
                type="text"
                placeholder="Código Postal"
                value={userName.location_postcode || ''}
                required
                onChange={(e) => setUserName({ ...userName, location_postcode: e.target.value })}
              />
              <FormControl.Feedback type="invalid">
                Por favor, proporciona un código postal válido.
              </FormControl.Feedback>
            </FormGroup>
          </Row>

          <FormGroup controlId="productImage" className="mt-3">
            <FormLabel>Imagen de Perfil</FormLabel>
            {userName.imagePreviewUrl && (
              <img
                src={userName.imagePreviewUrl}
                alt="Vista previa de la imagen"
                style={{
                  maxWidth: '150px',
                  width: '150px',
                  maxHeight: '150px',
                  height: '150px',
                  margin: '30px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
            )}
            <FormControl
              type="file"
              name="image"
              onChange={handleInputChange}
              placeholder="Selecciona una imagen de perfil"
            />
          </FormGroup>

          <FormGroup className="mb-3 m-4">
            <Form.Check
              required
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
              feedbackType="invalid"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
          </FormGroup>

          <div className="d-flex justify-content-center m-4">
            <Button variant="warning" type="submit" disabled={!acceptedTerms}>
              Actualizar Perfil
            </Button>
          </div>
          {showMessage && <div className="alert alert-success text-center">Has actualizado tus datos con éxito</div>}
        </Form>
      </Container>
    </>
  );
};

export default AjustesComponent;
