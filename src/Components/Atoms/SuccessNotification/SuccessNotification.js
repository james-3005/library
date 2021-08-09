import React, { useState } from 'react'
import styles from './SuccessNotification.module.scss'
import { motion, AnimatePresence } from 'framer-motion'

function Notification({text}) {
    const [show, setShow]= useState(true);
    setTimeout(() => {
        setShow(false);
    },5000);
    return (
        <>
            <AnimatePresence>
                {
                    show &&
                <motion.div 
                className={styles.component}
                initial={{y: -200}}
                animate={{y: 0}}
                exit={{y: -200}}
                transition={{duration: 1}}>
                <img src="/Image/svg/noti/success.svg" alt="" className={styles.icon}/>
                <img src="/Image/svg/noti/success2.svg" alt="" className={styles.icon2}/>
                <img src="/Image/svg/x_white.svg" alt="" 
                    className={styles.turnOff}
                    onClick={() => setShow(false)}
                    />
                <p className={styles.title}>Success</p>
                <p className={styles.content}>{text}</p>
                </motion.div>
                
                }
                
                
            </AnimatePresence>
        
        </>
    )
}

export default Notification
