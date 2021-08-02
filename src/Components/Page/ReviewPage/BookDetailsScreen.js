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

const BookDetailsScreen = () => {
    const book = {
        ten: "toan",
        tg: "toan",
        nxb: "ttt",
        tl: "ttt",
        nph: "ttt",
        gia: "200.000$",
        img: "https://isachhay.net/wp-content/uploads/2017/08/sach-hay-cho-toi-xin-mot-ve-di-tuoi-tho.jpg",
        des: "Đọc sách đối với nhiều người là một việc nhàm chán, thậm chí là một cực hình. Phần đông người Việt Nam sau khi học xong phổ thông hoặc đại học, nhất là sau khi đã lập gia đình và có con cái, thường không bao giờ cầm đến một cuốn sách nào nữa. Đi tàu, đi máy bay, đi xe bus, thỉnh thoảng ta mới thấy những bạn trẻ đọc sách. Nói chung người lớn Việt Nam ít đọc sách và dĩ nhiên càng ít đến thư viện. Đây là một hình ảnh hoàn toàn trái ngược so với những hình ảnh ta thường thấy ở các nước châu Âu, Nhật Bản, Hàn Quốc.",
    };

    const listComment = [
        {
            title: "Giải đáp",
            content:
                "After an agonising three months of searching and waiting, a match was found and she received a liver transplant in January this year. Now, six months after her surgery, Raenelle, who turns two this September, is recovering just how her parents hoped she would.",
        },
        {
            title: "Câu hỏi",
            content:
                "After an agonising three months of searching and waiting, a match was found and she received a liver transplant in January this year. Now, six months after her surgery, Raenelle, who turns two this September, is recovering just how her parents hoped she would.",
        },
        {
            title: "Đánh giá",
            content:
                "After an agonising three months of searching and waiting, a match was found and she received a liver transplant in January this year. Now, six months after her surgery, Raenelle, who turns two this September, is recovering just how her parents hoped she would.",
        },
        {
            title: "Giải đáp",
            content: "commentttttttttttt",
        },
        {
            title: "title",
            content: "commentttttttttttt",
        },
        {
            title: "title",
            content: "commentttttttttttt",
        },
        {
            title: "title",
            content: "commentttttttttttt",
        },
        {
            title: "title",
            content: "commentttttttttttt",
        },
    ];
    const options = ["Giải đáp", "Câu hỏi", "Đánh giá"];
    const [quantity, setQuantity] = useState(0);
    const [showMore, setShowMore] = useState(false);
    const [limit, setLimit] = useState(3);
    const [openPopup, setOpenPopup] = useState(false);
    const [openComment, setOpenComment] = useState(false);
    const [option, setOption] = useState("");
    const [textComment, setTextComment] = useState("");
    const [listComments, setListComments] = useState(listComment);
    var comments = listComments.slice(0, limit);
    const { t } = useTranslation();

    const RenderIcon = (props) => {
        const { title } = props;
        if (title == options[0]) {
            return <AiOutlineBulb size={18} color="#fff" />;
        } else if (title == options[1]) {
            return <AiOutlineQuestionCircle size={18} color="#fff" />;
        } else {
            return <AiOutlineRocket size={18} color="#fff" />;
        }
    };

    return (
        <div className={styles.container}>
            <motion.div
                initial={{ opacity: 0.4, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                className={styles.boxImage}
            >
                <img className={styles.img} src={"/image/svg/book.svg"} />
            </motion.div>
            <motion.div
                initial={{ opacity: 0.4, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                className={styles.details}
            >
                <div className={styles.boxDes}>
                    <div className={styles.infomation}>
                        <h2 className={styles.title}>{book.ten}</h2>
                        <span className={styles.textRow}>
                            <p className={styles.t1}>{t("author")}:</p>
                            <p>{book.tg}</p>
                        </span>
                        <span className={styles.textRow}>
                            <p className={styles.t1}>{t("type")}:</p>
                            <p>{book.tl}</p>
                        </span>
                        <span className={styles.textRow}>
                            <p className={styles.t1}>{t("year")}:</p>
                            <p>{book.nph}</p>
                        </span>
                        <div className={styles.boxPrice}>
                            <OrangeButton text="$1.12" size="small" />
                        </div>
                    </div>
                    <div className={styles.introduction}>
                        <h2 className={styles.title}>{t("gt")}</h2>
                        <p className={styles.textDes}>{book.des}</p>
                        <div className={styles.boxBuy}>
                            <div className={styles.quantity}>
                                <p className={styles.slt}>{t("quantity")}: </p>

                                <img
                                    src="/image/svg/subtract.svg"
                                    alt=""
                                    onClick={() => {
                                        if (quantity > 0)
                                            setQuantity(quantity - 1);
                                    }}
                                    className={styles.pointer}
                                />
                                <div className={styles.sl}>{quantity}</div>
                                <img
                                    src="/image/svg/plus.svg"
                                    alt=""
                                    onClick={() => setQuantity(quantity + 1)}
                                    className={styles.pointer}
                                />
                            </div>
                            <OrangeButton
                                text={t("addToBorrow")}
                                size="large"
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.divider} />
                <div className={styles.boxComment}>
                    {/* {!openComment?<button className ={styles.bt2} onClick={() => setOpenPopup(true)} >Thêm đánh giá</button>: (<div className = {styles.addCommentBox}>
    
    <textarea   className = {styles.input} 
                placeholder="Add comment"
                onChange={(e) => setTextComment(e.target.value)}/>
    <button className={styles.bt2} onClick = {() => {
        //setLimit(limit +1);
        if(textComment != "") {
            setListComments([...listComments, {title: option, content: textComment}]);
        }
        
        setLimit(listComments.length);
    }}>
        
        Comment
    </button>
</div>)} */}
                    <RateStar openAddComment={() => setOpenPopup(true)} />
                    <ul className={styles.commentList}>
                        {listComments.slice(0, limit).map((item, index) => (
                            <li key={index} className={styles.commentItem}>
                                <CommentItem item={item} />
                            </li>
                        ))}
                    </ul>
                    {showMore ? null : (
                        <button
                            className={styles.bt2}
                            onClick={() => {
                                setLimit(listComments.length);
                                setShowMore(true);
                            }}
                        >
                            {t("loadComment")}
                        </button>
                    )}
                </div>
            </motion.div>
            <AddCommentPopup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            />
            <img src="/image/svg/footer2.svg" className={styles.footer} />
        </div>
    );
};

export default BookDetailsScreen;

//comments.push({title: option, content: textComment})
