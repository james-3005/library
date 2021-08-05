import Background2 from "../../Template/Background4/Background4";
import styles from "./BookDetail.module.scss";
import {
    AiFillPlusSquare,
    AiFillMinusSquare,
    AiOutlineBulb,
    AiOutlineQuestionCircle,
    AiOutlineRocket,
} from "react-icons/ai";
import { useState } from "react";
import CommentItem from "./components/CommentItem";
import AddCommentPopup from "./components/AddCommentPopup";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import EcoIcon from "@material-ui/icons/Eco";
import Button from "@material-ui/core/Button";
import OrangeButton from "../../Atoms/OrangeButton/OrangeButton";
import { motion } from "framer-motion";
import RateStar from "../../MoreClues/RateStar/RateStar";
import { useTranslation } from "react-i18next";
import { useCurrentBook } from "../../../Context/CurrentBookProvider";
import { Link } from "react-router-dom";

const BookDetailsScreen = () => {
    const { currentBook } = useCurrentBook();
    const {
        name_book,
        author,
        price,
        book_image,
        review,
        isbn,
        type_id,
        publication_date,
        book_id,
    } = currentBook;

    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            <motion.div
                initial={{ opacity: 0.4, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                className={styles.boxImage}
            >
                <img
                    className={styles.img}
                    src={book_image ? book_image : "/image/svg/book.svg"}
                />
            </motion.div>
            <motion.div
                initial={{ opacity: 0.4, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                className={styles.details}
            >
                <div className={styles.boxDes}>
                    <Link to="/" className={styles.back}>
                        <img src="image/svg/back.svg" alt="" />
                    </Link>

                    <div className={styles.infomation}>
                        <h2 className={styles.title}>{name_book}</h2>
                        <span className={styles.textRow}>
                            <p className={styles.t1}>{t("author")}:</p>
                            <p>{author}</p>
                        </span>
                        <span className={styles.textRow}>
                            <p className={styles.t1}>{t("type")}:</p>
                            <p>{type_id}</p>
                        </span>
                        <span className={styles.textRow}>
                            <p className={styles.t1}>{t("year")}:</p>
                            <p>{publication_date}</p>
                        </span>
                        <span className={styles.textRow}>
                            <p className={styles.t1}>{t("price")}:</p>
                            <p>{`$${Number(price).toFixed(1)}`}</p>
                        </span>
                    </div>
                    <div className={styles.introduction}>
                        <h2 className={styles.title}>{t("gt")}</h2>
                        <p className={styles.textDes}>{review}</p>
                    </div>
                </div>
            </motion.div>
            <img src="/image/svg/footer2.svg" className={styles.footer} />
        </div>
    );
};

export default BookDetailsScreen;

//comments.push({title: option, content: textComment})
