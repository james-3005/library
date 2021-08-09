import React, { useState } from "react";
import { useCurrentBook } from "../../../Context/CurrentBookProvider";
import styles from "./CardItem.module.scss";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { api } from "../../../env";
function ShowCard({ data }) {
    const { setCurrentBook } = useCurrentBook();
    const history = useHistory();
    const { t } = useTranslation();
    const handleReviewPage = () => {
        setCurrentBook(data);
        history.push("/reviewPage");
    };

    return (
        <div className={styles.slidebox}>
            <img
                src={
                    data && data["book_image"]
                        ? data["book_image"]
                        : "/Image/svg/book.svg"
                }
                alt=""
                className={styles.imagecard}
            />
            <p className={styles.author}>{data ? data["name_book"] : ""}</p>
            <p className={styles.type}>{data ? data["author"] : ""}</p>{" "}
            <img
                src={
                    data && data["borrowing"] == false
                        ? "/Image/svg/available.svg"
                        : "/Image/svg/notavailable.svg"
                }
                alt=""
                className={styles.available}
            />
            <input
                type="button"
                value={t("view")}
                className={styles.button}
                onClick={handleReviewPage}
            />
        </div>
    );
}

export default ShowCard;
