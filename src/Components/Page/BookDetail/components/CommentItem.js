import { AiOutlineBulb, AiOutlineQuestionCircle,AiOutlineRocket } from "react-icons/ai";
import EcoOutlinedIcon from '@material-ui/icons/EcoOutlined';
import ContactSupportOutlinedIcon from '@material-ui/icons/ContactSupportOutlined';
import styles from "./CommentItem.module.scss";

const CommentItem = ({item}) => {

    const RenderIcon = ({title}) => {
        if(title == "Giải đáp") {
            return (<AiOutlineBulb size={23} color="rgb(100, 100, 6)"/>);
        } else if (title == "Câu hỏi") {
            return (<AiOutlineQuestionCircle size={23} color="rgb(100, 100, 6)" />);
        } else {
            return (<AiOutlineRocket size={23} color="rgb(100, 100, 6)" />);
        }
    }

    return (
        <div className={styles.containerItem}>
            <div className={styles.boxTitle}>
                <RenderIcon title = {item.title} />
                <p className={styles.title}>{item.title}</p>
            </div>
            <p className={styles.content}>{item.content}</p>
        </div>
    );
}

export default CommentItem;