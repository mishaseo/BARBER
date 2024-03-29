import { useEffect, useState } from "react";
import "./Login.css";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";
import SimpleHeader from "../Components/SimpleHeader";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  //-----------WHERE WE WILL SEND TO API-----------------
  function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const onSubmit = (event) => {
    event.preventDefault();

    const data = {
      email: email,
      password: password,
    };
    //if both fields filled out
    if (email && password) {
      //check if the email is valid
      if (emailIsValid(email)) {
        axios
          .post(`${process.env.REACT_APP_URL}/login`, data)
          .then((res) => {
            //successful login
            if (res.data.success === true) {
              localStorage.setItem("token", res.data.token);
              window.location.href = "/";
            }
          })
          //user not found or password don't match
          .catch((err) => {
            //if error 401 is returned
            if (err.response.status === 401) {
              alert("Invalid email or password. Please try again!");
            }
          });
      } else {
        alert("Must input a valid email");
      }
    } else {
      alert("All fields must be filled out");
    }
  };

  return (
    <div>
      <SimpleHeader />
      <MDBContainer fluid>
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className="bg-dark text-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "400px" }}
            >
              <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className="text-white-50 mb-5">
                  Please enter your login and password!
                </p>

                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-white"
                  label="Email address"
                  id="formControlLgEmail"
                  type="email"
                  size="lg"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-white"
                  label="Password"
                  id="formControlLgPassword"
                  type="password"
                  size="lg"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />

                <Button
                  outline
                  variant="outline-light"
                  color="white"
                  size="lg"
                  onClick={onSubmit}
                >
                  Login
                </Button>

                <div>
                  <p className="mb-0">
                    Don't have an account?{" "}
                    <a href="/signup" class="text-white-50 fw-bold">
                      Sign Up
                    </a>
                  </p>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default LoginPage;
