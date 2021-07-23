import SearchScreen from './SearchScreen/SearchScreen'
import React from "react";
import { Link } from "react-router-dom";
import Carousel1 from "./List/FavouriteBook";
import Carousel2 from "./List/NewlyPublishedBook";
import styles from './MainPage.module.scss'
import Background2 from '../../Template/Background2/Background2';

function MainPage() {
  return (
    <div className={styles.mainPage}>
      <div className={styles.cc}>
        MainPage
      <Link to="/">main</Link>
      <Link to="/adminPage">adminPage</Link>
      <Link to="/loginPage">loginPage</Link>
      <Link to="/paymentPage">paymentPage</Link>
      <Link to="/reviewPage">reviewPage</Link>
      <Link to="/userPage">UserPage</Link>
      </div>
      
      <Carousel1 />
      <Carousel2 />
      <SearchScreen/>
    </div>
  );
}

export default MainPage;
