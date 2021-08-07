import React, { useEffect, useMemo, useState } from "react";
import styles from "./Carousel.module.scss";
import Background3 from "../../../Template/Background3/Background3";
import Carousel2 from "../../../MoreClues/Carousel/Carousel2";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useFilterBook } from "../../../../Context/FilterBookProvider";
// install Swiper modules

const New = () => {
    const [array, setArray] = useState([]);
    const { newBook } = useFilterBook();

    useEffect(() => {
        setArray(newBook);
    }, [newBook]);
    const { t } = useTranslation();
    return (
        <Background3>
            <div className={styles.Carousel}>
                <h2 className={styles.Header}>{t("mainPage_lastest")}</h2>
                <Carousel2 data={array} />
            </div>
        </Background3>
    );
};
export default React.memo(New);
