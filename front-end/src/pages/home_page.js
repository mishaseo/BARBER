import { Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import "./home_page.css";
import Header from "../Components/Header";
import { MDBIcon } from "mdb-react-ui-kit";

const Home = () => {
  //------------------- SEARCH------------------
  const [search, setSearch] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchQuery = { info: search };
    console.log(searchQuery);
  };
  //-----------------IMAGE SLIDER------------------
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "https://res.cloudinary.com/mishaprojectcloud/image/upload/v1696242110/BARBER/img0_qshvwg.png",
    "https://res.cloudinary.com/mishaprojectcloud/image/upload/v1696242106/BARBER/img1_u0r3rb.jpg",
    "https://res.cloudinary.com/mishaprojectcloud/image/upload/v1696242987/BARBER/img3_nlerpp.jpg",
    "https://res.cloudinary.com/mishaprojectcloud/image/upload/v1696243378/BARBER/img4_xnekkp.jpg",
  ];
  const changeImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(changeImage, 6000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  //-------------------LINE--------------------
  const str = "FIND THE BARBER FIT FOR A BOSS\n";

  return (
    <div className="total">
      <Header />
      <div
        className="background-image"
        style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
      >
        {/* ------------------SEARCHING---------------------- */}

        <div id="searchbox">
          <Form onSubmit={handleSubmit} id="search" className="d-flex">
            <Form.Control
              id="search_title"
              type="search"
              placeholder="Search for a barber"
              className="me-2"
              value={search}
              aria-label="Search"
              onChange={(event) => setSearch(event.target.value)}
            />

            <Button onClick={handleSubmit} id="searchButton" variant="dark">
              <MDBIcon fas icon="cut" />
            </Button>
          </Form>
        </div>
        {/* --------------------SAVED BARBERS-------------------- */}
        <div id="favBarbers"></div>
      </div>
    </div>
  );
};

export default Home;
