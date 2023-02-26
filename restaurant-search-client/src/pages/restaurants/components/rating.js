import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as fasStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

const Rating = ({ rating, userTotal }) => {
  const [arrStar, setArrStar] = useState([]);
  const [ratingg, setRatingg] = useState(rating);

  useEffect(() => {
    let arr = [];
    // set star show
    for (let i = 1; i <= 5; i++) {
      let st = "";
      if (i <= Math.floor(ratingg)) { // set full star on current star less than rating
        st = <FontAwesomeIcon icon={fasStar} />;
      } else if (i === Math.ceil(ratingg)) { // set half star if rating is float
        st = <FontAwesomeIcon icon={faStarHalfAlt} />;
      } else { // set empty star
        st = <FontAwesomeIcon icon={faStar} />; 
      }
      arr.push(st);
    }
    setArrStar(arr);
  }, []);

  // if rating is null
  if(!ratingg) return  <span className="flex items-center gap-2 text-md">ไม่มีรีวิว</span>;

  return (
    <span className="flex items-center gap-2">
      {ratingg}
      <ul className="rating flex justify-center item-center">
        {arrStar.map((star, index) => (
          <React.Fragment key={index}>{star}</React.Fragment>
        ))}
      </ul>
      <span className="text-md">({userTotal})</span>
    </span>
  );
};

export default Rating;
