import React from "react";
import "./CarouselSlide.scss";
const showCard = (props) => {
  const data = props.data;
  const image = data.image;
  const price = data.price;
  const author = data.author;
  const type = data.type;
  const button = data.type;
  const id = data.id;
  return (
    <div class="slidebox">
      <img src={image} alt="picture" class="imagecard" />
      <h3 class="price">price: {price}</h3>
      <h3 class="author">author: {author}</h3>
      <h3 class="type">type: {type}</h3>
      <div class="form">
        <form action="">
          <input type="button" value="View" class="button" />
        </form>
      </div>
    </div>
  );
};

export default showCard;
