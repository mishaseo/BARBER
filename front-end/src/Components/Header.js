import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Header.css";

function Header() {
  //AUTHENTICATED EMELEMENTS
  const jwtToken = localStorage.getItem("token"); // the JWT token, if we have already received one and stored it in localStorage
  const [logged, setLogged] = useState(jwtToken && true);
  const [name, setName] = useState("");
  //FUNCTION TO LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/checkLogin`, {
        headers: { Authorization: `JWT ${jwtToken}` }, // pass the token, if any, to the server
      })
      .then((res) => {
        //if we get status 200, then user is signed in
        if (res.data.success === true) {
          setName(res.data.firstName + " " + res.data.lastName);
          setLogged(true);
        } else {
          setLogged(false);
        }
      })
      .catch((err) => {});
  }, []);

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
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {logged ? (
            <Nav>
              <b>
                <i>
                  <Nav.Link>Hello {name}! </Nav.Link>
                </i>
              </b>
              <Nav.Link href={"/"}>Home</Nav.Link>
              <Nav.Link
                onClick={() => {
                  logout();
                }}
              >
                <b>Logout</b>
              </Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link href={"/"}>Home</Nav.Link>
              <Nav.Link href={"/signup"}>Sign Up</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header;
