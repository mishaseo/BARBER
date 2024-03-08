import { Alert } from "react-alert";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import SimpleHeader from "../Components/SimpleHeader";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import { useState } from "react";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  //Use to navigate to the login page
  const navigate = useNavigate();

  //------------WHERE WE WILL SEND TO API---------------
  const onSubmit = (event) => {
    event.preventDefault();

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPass: password,
    };

    console.log(data);
    if (!firstName || !lastName || !email || !password || !confirmPass) {
      alert("You must fill out all fields to continue");
    } else if (confirmPass !== password) {
      alert("Passwords do not match!");
    } else {
      alert("Success! Creating account...");
      navigate("/login");
    }
  };
  return (
    <div>
      <SimpleHeader />
      <MDBContainer fluid>
        <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
          <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
            <MDBRow>
              <MDBCol
                md="10"
                lg="6"
                className="order-2 order-lg-1 d-flex flex-column align-items-center"
              >
                <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Sign up
                </p>

                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    required
                    label="First Name"
                    id="form1"
                    type="text"
                    className="w-100"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    required
                    label="Last Name"
                    id="form1"
                    type="text"
                    className="w-100"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size="lg" />
                  <MDBInput
                    required
                    label="Your Email"
                    id="form2"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size="lg" />
                  <MDBInput
                    required
                    label="Password"
                    id="form3"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="key me-3" size="lg" />
                  <MDBInput
                    required
                    label="Repeat your password"
                    id="form4"
                    type="password"
                    value={confirmPass}
                    onChange={(event) => setConfirmPass(event.target.value)}
                  />
                </div>

                <Button
                  // className="mb-4"
                  variant="dark"
                  size="lg"
                  onClick={onSubmit}
                  color="black"
                >
                  Register
                </Button>
              </MDBCol>

              <MDBCol
                md="10"
                lg="6"
                className="order-1 order-lg-2 d-flex align-items-center"
              >
                <MDBCardImage
                  src="https://res.cloudinary.com/mishaprojectcloud/image/upload/v1709926990/BARBER/OIP_cyw94v.jpg"
                  fluid
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "auto",
                  }}
                />
              </MDBCol>
            </MDBRow>
            <div>
              <a href="/login">
                <p>Already have an account?</p>
              </a>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default SignUp;
