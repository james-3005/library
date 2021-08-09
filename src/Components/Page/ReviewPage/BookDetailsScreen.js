import Background2 from "../../Template/Background4/Background4";
import styles from "./BookDetail.module.scss";
import {
    AiFillPlusSquare,
    AiFillMinusSquare,
    AiOutlineBulb,
    AiOutlineQuestionCircle,
    AiOutlineRocket,
} from "react-icons/ai";
import { useEffect, useState } from "react";
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
import { Link, useHistory } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { api } from "../../../env";
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
        translator,
        country_id,
    } = currentBook;
    const [type, setType] = useState("");
    const { t } = useTranslation();
    const history = useHistory();
    const [country, setCountry] = useState("");
    useEffect(() => {
        axios.get(`${api}country?country_id=${country_id}`).then((res) => {
            setCountry(res.data[0].country_name);
            console.log(res.data);
        });
    }, []);
    useEffect(() => {
        var config = {
            method: "get",
            url: `${api}type?type_id=${type_id}`,
        };

        axios(config)
            .then(function (response) {
                setType(response.data[0].name);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [type_id]);
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
                    <Link
                        to="../#search"
                        className={styles.back}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                            window.localStorage.setItem(
                                "path",
                                "bookdetailpage"
                            )
                        }
                    >
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
                            <p>{type}</p>
                        </span>
                        <span className={styles.textRow}>
                            <p className={styles.t1}>{t("year")}:</p>
                            <p>
                                {moment(publication_date).format("DD-MM-YYYY")}
                            </p>
                        </span>
                        <span className={styles.textRow}>
                            <p className={styles.t1}>{t("price")}:</p>
                            <p>{`${Number(price).toFixed(1)}`}</p>
                        </span>
                        <span className={styles.textRow}>
                            <p className={styles.t1}>{t("isbn")}:</p>
                            <p>{isbn}</p>
                        </span>
                        <span className={styles.textRow}>
                            <p className={styles.t1}>{t("translator")}:</p>
                            <p>{translator}</p>
                        </span>
                        <span className={styles.textRow}>
                            <p className={styles.t1}>{t("country")}:</p>
                            <p>{country}</p>
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
