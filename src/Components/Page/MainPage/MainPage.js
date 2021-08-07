import SearchScreen from "./SearchScreen/SearchScreen";
import React from "react";
import { Link } from "react-router-dom";
import FavoriteBook from "./List/FavouriteBook";
import LastestBook from "./List/NewlyPublishedBook";
import styles from "./MainPage.module.scss";
import Background2 from "../../Template/Background2/Background2";
import HomePage from "./HomePage/HomePage";
import Footer from "../../MoreClues/Footer/Footer";

function MainPage() {
    return (
        <div className={styles.mainPage}>
            <HomePage />
            <FavoriteBook />
            <LastestBook />
            <SearchScreen />
            <Footer />
        </div>
    );
}

export default MainPage;
