import React, { useState } from "react";
import "./restaurant.css";
import axios from "axios";
import Rating from "./components/rating";
import Banner from "../../components/banner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/ui/loading/spinner";

const Restaurant = () => {
  // define API_KEY for show image from Api
  const API_KEY = "AIzaSyAeKDHxT6a10paM0wQ27VQYZzQvioHvb7E";
  // state for show data
  const [allRestaurant, setAllRestaurant] = useState([]);
  // state for search lacation from Api
  const [searchText, setSearchText] = useState("Nai Mueang");
  // state for show location 
  const [location, setLocation] = useState("");
  // state for show loading
  const [isLoading, setIsLoading] = useState(false);

  // function fetch data from Api
  const fetchData = async () => {
    // show loading
    setIsLoading(true);
    axios
      .get(`http://localhost:8000/api/restaurants?search=${searchText}`)
      .then(({ data }) => {
        setAllRestaurant(data.data.restaurants);
        setLocation(data.data.location);
        // close loading
        setIsLoading(false);
      })
      .catch(({ response }) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.description,
          timer: 2000,
        }).then(() => {
          setAllRestaurant([]);
          setLocation();
          // close loading
          setIsLoading(false);
        });
      });
  };

  const renderSearchResult = (
    <div className="card flex flex-wrap flex-row gap-3 justify-start mt-4">
      {allRestaurant?.map((el, index) => {
        return (
          <React.Fragment key={index}>
            <div className="card-shop border w-full md:w-[49%] lg:w-[32%] h-[10rem] p-2 flex gap-4">
              <figure className="rounded-xl lg:max-w-[10rem] lg:min-w-[10rem] md:max-w-[8rem] md:min-w-[8rem] h-full">
                <img
                  className="rounded-xl border object-fill w-full h-full"
                  src={
                    el.photos
                      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photo_reference=${el.photos[0].photo_reference}&key=${API_KEY}`
                      : ""
                  }
                  alt=""
                  // use no-image when load image error
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = "/image/no-image.jpg";
                  }}
                />
              </figure>
              <div className="details" style={{ overflow: "auto" }}>
                <p className="text-md">{el.name}</p>
                <p className="text-gray-500 text-sm">{el.vicinity}</p>
                <Rating rating={el.rating} userTotal={el.user_ratings_total} />
                {el.opening_hours ? (
                  el.opening_hours.open_now ? (
                    <p className="text-green-600 text-md">เปิดอยู่ขณะนี้</p>
                  ) : (
                    <p className="text-red-500 text-md">ปิดอยู่</p>
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );

  return (
    <React.Fragment>
      <Banner
        searchText={searchText}
        setSearchText={setSearchText}
        fetchData={fetchData}
      />
      <div className="restaurant md:min-h-[50vh] min-h-[70vh] px-5 py-6">
        <h2 className="text-sm">
          <FontAwesomeIcon icon={faMapLocationDot} /> ร้านอาหารใกล้เคียง{" "}
          {location}
        </h2>
        {isLoading ? <LoadingSpinner /> : renderSearchResult}
      </div>
    </React.Fragment>
  );
};

export default Restaurant;
