import React, { useState, useEffect } from "react";
import InfoCard from "../Components/InfoCard";
import axios from "axios";
import Header from "../Components/Header";
import "./Results.css";
import ReactPaginate from "react-paginate";

function Results(props) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  //-----------------------------SEARCHING---------------------------------------------
  let search = false;
  if (props.animal === "search") {
    search = true;
  }
  async function fetchSearchData() {
    axios
      .get(`${process.env.REACT_APP_URL}/searchResults/${props.searchQuery}`)
      .then((res) => {
        if (res.status === 200) {
          console.log("search success");
          setData(res.data);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  //----------------------REGULAR PAGE QUERY-----------------------------------
  async function fetchData() {
    axios
      //   .get(`${process.env.REACT_APP_URL}/explore`)
      .get("https://my.api.mockaroo.com/barbers.json?key=f8766290")
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  //------------------------------------------------------------------------------
  useEffect(() => {
    if (search === true) {
      fetchSearchData();
    } else {
      fetchData();
    }
    // the blank array below causes this callback to be executed only once on component load
  }, []);

  //Pagination details
  const PER_PAGE = 10;
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(data.length / PER_PAGE);

  const currentPageData = data
    .slice(offset, offset + PER_PAGE)
    .map((item) => <InfoCard key={item.id} details={item} />);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  return (
    <div>
      <Header />
      <div id="headingBox">
        {search ? (
          <h1 id="heading">Search Results</h1>
        ) : (
          <h1 id="heading">Explore our wide collection of barbers</h1>
        )}
      </div>

      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
      <section id="infoCard">{currentPageData}</section>
    </div>
  );
}
export default Results;
