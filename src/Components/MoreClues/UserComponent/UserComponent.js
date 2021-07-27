import React, { useState } from 'react'
import styles from './UserComponent.module.scss'
import {useAuth} from '../../../Context/AuthProvider'
import {motion} from 'framer-motion'
import { useTranslation } from 'react-i18next';
function UserComponent() {
    const [newpassword, setNewPassword]= useState("");
    const [reNewpassword, setReNewPassword]= useState("");
    const [spanNewPassword, setSpanNewPassword]= useState("");
    const [spanReNewPassword, setSpanReNewPassword]= useState("");
    const { updatePassword } = useAuth();
    const {t}= useTranslation();
    const checkvalid = (type) => {
        switch (type){
            case "newpassword":
                if(newpassword.length < 6){
                    setSpanNewPassword(t("PassNotValid"));
                    break;
                }
                let y= false;
                for(let i = 0; i < newpassword.length; i++)
                    if(newpassword[i]<="Z" && newpassword[i] >="A"){
                        y= true;
                        break;
                    }
                if(!y)
                    setSpanNewPassword(t("PassNotValid"));
                break;
            case "confirmpassword":
                if(newpassword !== reNewpassword)
                    setSpanReNewPassword(t("PassNotSame"));
                break;
                }
    }
    const handleChangePassword = () => {
        updatePassword(reNewpassword);
    }
    return (
        <motion.div 
            initial= {{ opacity: 0.4, y: -100}}
            animate= {{ opacity: 1, y: 0}} 
            className={styles.component}>
            <div className={styles.userInfo}>
                <div className={styles.boxInfo}>
                    <label className={styles.label}>Email</label>
                    <p className={styles.content}>Huygg12345@gmail.com</p>
                </div>
                <div className={styles.boxInfo}>
                    <label className={styles.label}>Username</label>
                    <p className={styles.content}>Nhật Huy</p>
                </div>
            </div>
            <div className={styles.changePassword}>
                <input  type="password" 
                        placeholder="New Password" 
                        onChange={e => setNewPassword(e.target.value)}
                        value={newpassword}
                        className={spanNewPassword !== "" ?styles.input_warn : styles.input} 
                        onBlur={() =>checkvalid("newpassword")} 
                        onFocus={()=>setSpanNewPassword("")}/>
                <span className={styles.span}>{spanNewPassword}</span>
                <input  type="password" 
                        placeholder="Confirm new Password" 
                        onChange={e => setReNewPassword(e.target.value)}
                        value={reNewpassword}
                        className={spanReNewPassword !== "" ?styles.input_warn : styles.input} 
                        onBlur={() =>checkvalid("confirmpassword")} 
                        onFocus={()=>setSpanReNewPassword("")}/>
                <span className={styles.span}>{spanReNewPassword}</span>
                <button className={styles.btn} 
                        onClick={handleChangePassword}>{t("ChangePass")}</button>
            </div>
            
        </motion.div>
    )
}

export default UserComponent
