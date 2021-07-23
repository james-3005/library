import Background2 from '../../Template/Background2/Background2';
import styles from './BookDetail.module.scss';
import { AiFillPlusSquare, AiFillMinusSquare, AiOutlineBulb, AiOutlineQuestionCircle,AiOutlineRocket } from "react-icons/ai";
import { useState } from "react";
import CommentItem from "./components/CommentItem";
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import EcoIcon from '@material-ui/icons/Eco';
import Button from '@material-ui/core/Button';



const BookDetailsScreen = () => {
    const book = {
        ten:"toan",
        tg: "toan",
        nxb: "ttt",
        tl: "ttt",
        nph: "ttt",
        gia: "200.000$",
        img: "https://isachhay.net/wp-content/uploads/2017/08/sach-hay-cho-toi-xin-mot-ve-di-tuoi-tho.jpg",
        des: "Đọc sách đối với nhiều người là một việc nhàm chán, thậm chí là một cực hình. Phần đông người Việt Nam sau khi học xong phổ thông hoặc đại học, nhất là sau khi đã lập gia đình và có con cái, thường không bao giờ cầm đến một cuốn sách nào nữa. Đi tàu, đi máy bay, đi xe bus, thỉnh thoảng ta mới thấy những bạn trẻ đọc sách. Nói chung người lớn Việt Nam ít đọc sách và dĩ nhiên càng ít đến thư viện. Đây là một hình ảnh hoàn toàn trái ngược so với những hình ảnh ta thường thấy ở các nước châu Âu, Nhật Bản, Hàn Quốc."
    }

    const listComment = [
        {
            title: "Giải đáp",
            content: "commentttttttttttt"
        },
        {
            title: "Câu hỏi",
            content: "commentttttttttttt"
        },
        {
            title: "Đánh giá",
            content: "commentttttttttttt"
        },
        {
            title: "Giải đáp",
            content: "commentttttttttttt"
        },
        {
            title: "title",
            content: "commentttttttttttt"
        },
        {
            title: "title",
            content: "commentttttttttttt"
        },
        {
            title: "title",
            content: "commentttttttttttt"
        },
        {
            title: "title",
            content: "commentttttttttttt"
        },
    ]
    const options = ["Giải đáp", "Câu hỏi", "Đánh giá"];
    const [quantity, setQuantity] = useState(0);
    const [showMore, setShowMore] = useState(false);
    const [limit, setLimit] = useState(3);
    
    const [openComment, setOpenComment] = useState(false);
    const [option, setOption] = useState("");
    const [textComment, setTextComment] = useState("");
    const [listComments, setListComments] = useState(listComment);
    var comments = listComments.slice(0, limit);
    
    const RenderIcon = (props) => {
        const {title} = props;
        if(title == options[0]) {
            return (<AiOutlineBulb size={18} color = "#fff" />) ;
        } else if (title == options[1]) {
            return (<AiOutlineQuestionCircle size={18} color = "#fff" />);
        } else {
            return (<AiOutlineRocket size={18} color = "#fff" />);
        }
    }

    return (
        <Background2>
            <div className = {styles.container}>
                <div className = {styles.boxImage}>
                    <img className = {styles.img} src={book.img}/>
                </div>
                <div className = {styles.details}>
                    <div className = {styles.boxDes}>
                        <div className = {styles.infomation}>
                            <h2 className = {styles.title}>{book.ten}</h2>
                            <span className = {styles.textRow}><p className = {styles.t1}>Tác giả</p><p>{book.tg}</p></span>
                            <span className = {styles.textRow}><p className = {styles.t1}>Năm phát hành</p><p>{book.nxb}</p></span>
                            <span className = {styles.textRow}><p className = {styles.t1}>Thể loại</p><p>{book.tl}</p></span>
                            <span className = {styles.textRow}><p className = {styles.t1}>Nhà phát hành</p><p>{book.nph}</p></span>
                            <div className ={styles.boxPrice} >
                                <p>{book.gia}</p>
                            </div>
                        </div>
                        <div className = {styles.introduction}>
                            <h2 className = {styles.title}>{book.ten}</h2>
                            <p className = {styles.textDes}>{book.des}</p>
                            <div className = {styles.boxBuy}>
                                <div className = {styles.quantity} >
                                    <p className = {styles.slt}>Số lượng: </p>
                                
                                        <AiFillMinusSquare color="#240423" size={25} onClick={ () => {if(quantity > 0) setQuantity(quantity - 1)}}/>
                                        <div className = {styles.sl}>
                                            {quantity}
                                        </div>
                                        <AiFillPlusSquare color="#240423" size={25} onClick={ () => setQuantity(quantity + 1)}/>
                                </div>
                                <button className = {styles.bt1} >Thêm vào giỏ hàng</button>
                            </div>
                        </div> 
                        
                    </div>
                    <div className = {styles.divider}>
                    </div>
                    <div className = {styles.boxComment}>
                        {!openComment?<button className ={styles.bt2} onClick={() => setOpenComment(true)} >Thêm đánh giá</button>: (<div className = {styles.addCommentBox}>
                            <div className = {styles.optionBox}>
                                {options.map((result)=> (
                                    <div className = {styles.radio}>
                                    <input style={{marginRight: 5}} type = "radio" value={result} name ="options" checked={result === option} onChange = {(e) => setOption(e.target.value)} />
                                    <RenderIcon title={result} />
                                    <p style={{marginLeft: 8}}>{result}</p>
                                    </div>
                                ))}
                            </div>
                            <input type="text" placeholder="Enter to add a comment" className = {styles.input} onChange={(e) => setTextComment(e.target.value)} />
                            <Button className={styles.bt2} onClick = {() => {
                                //setLimit(limit +1);
                                if(textComment != "") {
                                    setListComments([...listComments, {title: option, content: textComment}]);
                                }
                                
                                setLimit(listComments.length);
                            }}>
                                
                                Comment
                            </Button>
                        </div>)}
                        
                        <ul className = {styles.commentList}>
                            {listComments.slice(0, limit).map((item, index) => <li key = {index} className={styles.commentItem}><CommentItem item = {item}/></li>)}
                        </ul>
                        {showMore? null : <button className = {styles.bt2} onClick = {() => {
                            setLimit(listComments.length);
                            setShowMore(true);
                        }} >Tải thêm bình luận</button>}
                    </div>
                    
                </div>
                
            </div>
        </Background2>
    );
}

export default BookDetailsScreen;

//comments.push({title: option, content: textComment})