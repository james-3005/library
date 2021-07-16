import React, { useState } from 'react'
import styles from './Receipt.module.scss';
function Receipt(props) {
    const { src, name, price, number, onDelete, tatic }= props;
    // const { updateNumber }= useBooking();

    const handleChangenumber = (num) => {

    }
    const handleblur = () => {

            
            
    }
    return (
        <div className={styles.mainComponent}>
                <img className={styles.img} src={src} alt=""/>
                <div className={styles.box}>
                    <p className={styles.name}>{name}</p>
                     <p className={styles.price}>{`$${price}`}</p>
                </div>
                {
                    !tatic?<input className={styles.number} type="number" placeholder={1} value={number} onChange={e => handleChangenumber(e.target.value)} onBlur={handleblur}/>:
                    <label className={styles.number} >{number}</label>
                }
                
                <button className={styles.delete} onClick={onDelete}>
                        <img src="./image/svg/trashcan.svg"/>
                </button>
        </div>
    )
}

export default Receipt
