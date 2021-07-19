import React, { useEffect, useLayoutEffect, useState, useRef } from 'react'
import styles from './PaymentComponent.module.scss'
import { motion } from 'framer-motion';
import InfoPair from '../InfoPair/InfoPair';
import Receipt from '../Receipt/Receipt';
import OrangeButton from '../../Atoms/OrangeButton/OrangeButton';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { useHistory } from 'react-router-dom';
function PaymenScreen() {
    const [info, setInfo]= useState("flex");
    const [pay, setPay]= useState(true);
    const [list, setList]= useState();
    const [receivename, setReceivename]= useState("");
    const [receiveaddress, setReceiveaddress]= useState("");
    const [receivephone, setReceivephone]= useState("");
    const [total, setTotal]= useState(0);
    const history= useHistory();
    const handlePayment = () => {
        if(!pay) setInfo("none");
            else setInfo("block");
        setPay(!pay);
    }
    const renderCart = () => {
        let cart2=[];
        
        // for (let [key, value] of Object.entries(cart)) {
        //     let obj= listItem.find(item => item.id == key);
        //     cart2.push( <Receipt key={obj.id} type={obj.type} 
        //                         name={obj.name} number={value} 
        //                         price={obj.price} onDelete={() => deleteItem(key)}
        //                         id={key}
        //                         tatic={false}
        //                         />)
        //   }
        // setTotal(price);
        return cart2;
    }
    // useEffect(() => {
    //     let price=0;
    //     for (let [key, value] of Object.entries(cart)) {
    //         let obj= listItem.find(item => item.id == key);
    //         price= price + obj.price * parseInt(value);
    //         // console.log(price);
    //       }
    //       setTotal(price);
    // },[cart])

    const cancelOrder = () => {
        setReceiveaddress("");
        setReceivename("");
        setReceivephone("");
        // history.push("/");
    }
    const confirmOrder = async () =>{
        // if(!currentUser ) history.push("/login");
        // else
        //     if(Object.keys(cart).length === 0) history.push("/order");
        // else if(receivename ==="" || receiveaddress ==="" || receivephone ===""){
        //     if(receivename ==="") setReceivenameRef("x");
        //     if(receiveaddress ==="") setReceiveaddressRef("x");
        //     if(receivephone ==="") setReceivephoneRef("x");
        //     return ;
        // }
    
   
    }
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const minValue = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    const maxValue= new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
    return (
        <motion.div 
            initial= {{ opacity: 0.4, y: -30}}
            animate= {{ opacity: 1, y: 0}}
            className={styles.mainComponent}>
                <div className={styles.information_listFood}>
                    <div className={styles.head}>
                        <div className={styles.information_manageButton}>
                            <img src="image/svg/back.svg" className={styles.back} onClick={() => history.push('/')} />
                        </div>
                        <p className={styles.confirmation}>Confirmation</p>
                        
                    </div>
                    <div className={styles.scroll}>
                        <Receipt name="sách" price="1.2" number="1" tatic={false} src="image/svg/book.svg"/>
                        <Receipt name="sách" price="1.2" number="1" tatic={false} src="image/svg/book.svg"/>
                        <Receipt name="sách" price="1.2" number="1" tatic={false} src="image/svg/book.svg"/>
                        <Receipt name="sách" price="1.2" number="1" tatic={false} src="image/svg/book.svg"/>
                        <Receipt name="sách" price="1.2" number="1" tatic={false} src="image/svg/book.svg"/>
                    </div>
                </div>
                <div className={styles.information_total}>
                <img src="image/svg/giraff.svg" alt="" className={styles.giraff}/>
                <div>
                        <div className={styles.date}>
                        <InfoPair keyy={"Thêm ngày trả"} value={""}/>  
                        <DatePickerComponent 
                        id="datepicker" 
                        cssClass="e-custom-style"
                        format="dd/MM/yyyy"
                        value={selectedDate}
                        min={minValue} 
                        max={maxValue}
                        change={(day) => setSelectedDate(day.value)}
                        />
                    </div>
                </div>
                
  
       =
                    <div className={styles.information_footerdiv}>
                        <InfoPair keyy={"Ngày mượn"} value={"16/7/2021"}/>
                        <InfoPair keyy={"Ngày trả"} value={selectedDate?`${selectedDate.getDate()}/${selectedDate.getMonth()+1}/${selectedDate.getFullYear()}`:""}/>
                        <InfoPair keyy={"Total"} value={`$${isNaN(total)?"":total.toFixed(2)}`}/>
                        <OrangeButton text={"Xác nhận"} size={"small"}/>
                    </div>
                </div>
        </motion.div>
    )
}

export default PaymenScreen
