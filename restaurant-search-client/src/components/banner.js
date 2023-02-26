import {
  faLocationDot,
  faMagnifyingGlassLocation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import "../styles/banner.css";

const Banner = ({ searchText, setSearchText, fetchData }) => {
  const handlerChangeSearch = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div className="banner md:h-[50vh] h-[30vh] relative">
      <figure className="w-full h-full">
        <img
          className="w-full h-full"
          src="/image/asian-style-food.jpg"
          alt=""
        />
      </figure>
      <div className="section-search flex flex-col justify-around w-[20rem] h-[13rem] m-auto absolute top-20 left-0 right-0">
        <div className="flex gap-1">
          <input
            type="text"
            placeholder="Search.."
            value={searchText}
            onChange={(e) => handlerChangeSearch(e)}
            className="input-search w-full text-sm text-black-400"
          />
          <div
            className="btn-search relative rounded border"
            onClick={fetchData}
          >
            <FontAwesomeIcon icon={faMagnifyingGlassLocation} />
          </div>
        </div>
        <div className="title">
          <h1 className="text-white" style={{fontSize: '30px'}}>Find nearby restaurants</h1>
        </div>
      </div>
    </div>
  );
};

export default Banner;
