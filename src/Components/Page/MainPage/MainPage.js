import React from "react";
import { Link } from "react-router-dom";
import Carousel1 from "./FavouriteBook";
import Carousel2 from "./NewlyPublishedBook";
function MainPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      MainPage
      <Link to="/">main</Link>
      <Link to="/adminPage">adminPage</Link>
      <Link to="/loginPage">loginPage</Link>
      <Link to="/paymentPage">paymentPage</Link>
      <Link to="/reviewPage">reviewPage</Link>
      <Carousel1 />
      <Carousel2 />
    </div>
  );
}

export default MainPage;
