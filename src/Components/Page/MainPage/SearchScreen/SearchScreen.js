import React, { useEffect, useState } from "react";
import Background4 from "../../../Template/Background2/Background2";
import styles from "./SearchScreen.module.scss";
import SearchBar from "../../../MoreClues/SeachBar/SeachBar";
import FilterBar from "../../../MoreClues/FilterBar/FilterBar";
import Carousel3 from "../../../MoreClues/Carousel/Carousel";
import { useTranslation } from "react-i18next";
import axios from "axios";

function SearchScreen() {
    const [activeSearch, setActiveSearch] = useState(true);
    const [activeFilter, setActiveFilter] = useState(false);
    const [array, setArray] = useState([]);
    const { t } = useTranslation();
    useEffect(() => {
        axios
            .get("http://library-mini.xyz/api/v1/book")
            .then((res) => {
                // console.log(res.data.data);
                setArray(res.data.data);
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    }, []);
    return (
        <div id="search">
            <Background4>
                {/* <div className={styles.searchBar}>
                    <SearchBar
                        activeSearch={activeSearch}
                        setActiveSearch={setActiveSearch}
                        activeFilter={activeFilter}
                        setActiveFilter={setActiveFilter}
                        setArray={setArray}
                    />
                </div>
                <div className={styles.filterBar}>
                    <FilterBar
                        activeSearch={activeSearch}
                        setActiveSearch={setActiveSearch}
                        activeFilter={activeFilter}
                        setActiveFilter={setActiveFilter}
                    />
                </div> */}
                <div className={styles.component}>
                    <div className={styles.list}>
                        <Carousel3 data={array} />
                    </div>
                </div>
            </Background4>
        </div>
    );
}

export default SearchScreen;
