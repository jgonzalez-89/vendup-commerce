import React from "react";
import { Carousel, Button } from "react-bootstrap";

class MyCarousel extends React.Component {
  render() {
    return (
      <Carousel slidesToShow={2}>
        <Carousel.Item>
          <img
            className="fotocarrousel img-fluid"
            src="https://img.freepik.com/iconos-gratis/carro_318-810194.jpg?w=2000"
            alt="Coches"
          />
          <Carousel.Caption>
            <h2>Coches</h2>
            <Button variant="primary">Learn More</Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="fotocarrousel img-fluid"
            src="https://img.freepik.com/iconos-gratis/carro_318-810194.jpg?w=2000"
            alt="Coches"
          />
          <Carousel.Caption>
            <h2>Coches electricos</h2>
            <Button variant="primary">Learn More</Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="fotocarrousel img-fluid"
            src="https://img.freepik.com/iconos-gratis/carro_318-810194.jpg?w=2000"
            alt="Coches"
          />
          <Carousel.Caption>
            <h2>Motos</h2>
            <Button variant="primary">Learn More</Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="fotocarrousel img-fluid"
            src="https://img.freepik.com/iconos-gratis/carro_318-810194.jpg?w=2000"
            alt="Coches"
          />
          <Carousel.Caption>
            <h2>Motor y Accesorios</h2>
            <Button variant="primary">Learn More</Button>
          </Carousel.Caption>
        </Carousel.Item>
        {/* <Carousel.Item>
          <img
            className="d-block w-100 bg-primary"
            src="img2.png"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Coches</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <Button variant="primary">Learn More</Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 bg-primary"
            src="img3.png"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>KTMs</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
            <Button variant="primary">Learn More</Button>
          </Carousel.Caption>
        </Carousel.Item> */}
      </Carousel>
    );
  }
}
export default MyCarousel;
