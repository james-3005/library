import React, { useState } from "react";
import styles from "./Receipt.module.scss";
function Receipt(props) {
    const { name, price, onDelete, img } = props;

    return (
        <div className={styles.mainComponent}>
            <img
                className={styles.img}
                src={img ? img : "/Image/svg/book.svg"}
                alt=""
            />
            <div className={styles.box}>
                <p className={styles.name}>{name}</p>
                <p className={styles.price}>{`$${price}`}</p>
            </div>
            <button className={styles.delete} onClick={onDelete}>
                <img src="/Image/svg/trashcan.svg" />
            </button>
        </div>
    );
}

export default Receipt;
