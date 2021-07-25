import { AiOutlineBulb, AiOutlineQuestionCircle,AiOutlineRocket } from "react-icons/ai";
import EcoOutlinedIcon from '@material-ui/icons/EcoOutlined';
import ContactSupportOutlinedIcon from '@material-ui/icons/ContactSupportOutlined';
import styles from "./CommentItem.module.scss";
import { useEffect } from "react";
import { black } from "material-ui/styles/colors";
import { useState } from "react";

const CommentItem = ({item}) => {

    const RenderIcon = ({title}) => {
        if(title == "Giải đáp") {
            return (<img src="image/svg/bold.svg" alt=""/>);
        } else if (title == "Câu hỏi") {
            return (<img src="image/svg/question.svg" alt=""/>);
        } else {
            return (<img src="image/svg/crazy.svg" alt=""/>);
        }
    }
    const [pickcolor, setPickcolor]= useState('#E4A5EE');
    useEffect(() => {
        if(item.title === "Giải đáp"){
            setPickcolor("#EED4A5");
            return;
        }
        if(item.title === "Câu hỏi"){
            setPickcolor("#AAE0D6");
            return;
        }
    },[])
    return (
        <div className={styles.containerItem}>
            <div className={styles.boxTitle}>
                <RenderIcon title = {item.title} />
                <p className={styles.title} style={{color: pickcolor}}>{item.title}</p>
            </div>
            <p className={styles.content}>{item.content}</p>
        </div>
    );
}

export default CommentItem;