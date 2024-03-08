import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function SimpleHeader() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href={"/"}>
          {" "}
          <img
            src="https://res.cloudinary.com/mishaprojectcloud/image/upload/v1696245541/BARBER/logo_1_c8vwqs.png"
            height="50"
          />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default SimpleHeader;
