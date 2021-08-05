import React from "react";
import { useCurrentBook } from "../../../Context/CurrentBookProvider";
import styles from "./CardItem.module.scss";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
function ShowCard({ data }) {
    const { image, price, author, type, name_book, book_image } = data;
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
                src={book_image ? book_image : "image/svg/book.svg"}
                alt="Error loading"
                className={styles.imagecard}
            />
            <p className={styles.author}>{name_book}</p>
            <p className={styles.type}>{author}</p>
            <div className={styles.form}>
                <form action="" className={styles.form}>
                    <input
                        type="button"
                        value={t("view")}
                        className={styles.button}
                        onClick={handleReviewPage}
                    />
                </form>
            </div>
        </div>
    );
}

export default ShowCard;
