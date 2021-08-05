import SearchScreen from "./SearchScreen/SearchScreen";
import React from "react";
import { Link } from "react-router-dom";
import Carousel1 from "./List/FavouriteBook";
import Carousel2 from "./List/NewlyPublishedBook";
import styles from "./MainPage.module.scss";
import Background2 from "../../Template/Background2/Background2";
import HomePage from "./HomePage/HomePage";
import Footer from "../../MoreClues/Footer/Footer";

function MainPage() {
    return (
        <div className={styles.mainPage}>
            <HomePage />
            <SearchScreen />
            <Footer />
        </div>
    );
}

export default MainPage;
