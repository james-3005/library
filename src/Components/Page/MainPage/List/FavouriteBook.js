import React, { useEffect, useState } from "react";
// import Swiper core and required modules

import styles from "./Carousel.module.scss";
import Background2 from "../../../Template/Background2/Background2";
import Carousel from "../../../MoreClues/Carousel/Carousel";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useFilterBook } from "../../../../Context/FilterBookProvider";

const Fav = () => {
    const [array, setArray] = useState([]);
    const { favBook } = useFilterBook();
    useEffect(() => {
        setArray(favBook);
    }, [favBook]);
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
