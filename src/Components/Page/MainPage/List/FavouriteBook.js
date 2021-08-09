import React, { useEffect, useState } from "react";
// import Swiper core and required modules

import styles from "./Carousel.module.scss";
import Background2 from "../../../Template/Background2/Background2";
import Carousel from "../../../MoreClues/Carousel/Carousel";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { api } from "../../../../env";
const Fav = () => {
    const [array, setArray] = useState([]);
    useEffect(() => {
        axios
            .get(`${api}book/top-borrowing?limit=7`)
            .then((res) => {
                let books = res.data.books.map((item) => item.book);

                setArray(books);
            })
            .catch((err) => console.log(err.response.data));
    }, []);

    const { t } = useTranslation();
    return (
        <Background2>
            <div className={styles.Carousel}>
                <h2 className={styles.Header}>{t("mainPage_bestSelling")}</h2>
                <Carousel data={array} />
            </div>
        </Background2>
    );
};
export default React.memo(Fav);
