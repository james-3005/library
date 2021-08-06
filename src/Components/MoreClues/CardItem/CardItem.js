import React, { useState } from "react";
import { useCurrentBook } from "../../../Context/CurrentBookProvider";
import styles from "./CardItem.module.scss";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
function ShowCard({ data }) {
    const { image, price, author, name_book, book_image } = data;
    const { setCurrentBook } = useCurrentBook();
    const history = useHistory();
    const { t } = useTranslation();
    const handleReviewPage = () => {
        setCurrentBook(data);
        history.push("/reviewPage");
    };
    const [available, setAvailable] = useState(true);
    useState(() => {
        // axios;
    }, []);
    return (
        <div className={styles.slidebox}>
            <img
                src={book_image ? book_image : "image/svg/book.svg"}
                alt=""
                className={styles.imagecard}
            />
            <p className={styles.author}>{name_book}</p>
            <p className={styles.type}>{author}</p>{" "}
            <img
                src={
                    available
                        ? "image/svg/available.svg"
                        : "image/svg/notavailable.svg"
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
