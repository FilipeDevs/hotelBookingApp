import { Container } from "react-bootstrap";

function ParallaxScrolling() {
  return (
    <div className="parallax mb-5">
      <Container className="text-center px-5 py-5 justify-content-center">
        <div className="animated-texts bounceIn">
          <h1>
            Experience the best hospitality at {""}
            <span className="">Filipe Oasis Hotel</span>
          </h1>
          <h3>We offer the best services for all your needs.</h3>
        </div>
      </Container>
    </div>
  );
}

export default ParallaxScrolling;
