import React from "react";
import styles from "./CardItem.module.scss";
const showCard = ({data}) => {
  const {image, price, author, type}= data;
  return (
    <div className={styles.slidebox}>
      <img src='image/svg/book.svg' alt="picture" className={styles.imagecard} />
      <p className={styles.price}>{price} $</p>
      <p className={styles.author}>{author}</p>
      <p className={styles.type}>{type}</p>
      <div className={styles.form}>
        <form action="" className={styles.form} >
          <input type="button" value="View" className={styles.button} />
          <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.heart}>
          <path d="M8.69544 3.625C5.35352 3.625 2.64343 6.30267 2.64343 9.60625C2.64343 12.273 3.70253 18.6023 14.1277 25.0004C14.3145 25.1138 14.5289 25.1738 14.7475 25.1738C14.9661 25.1738 15.1804 25.1138 15.3672 25.0004C25.7924 18.6023 26.8515 12.273 26.8515 9.60625C26.8515 6.30267 24.1414 3.625 20.7995 3.625C17.4575 3.625 14.7475 7.25 14.7475 7.25C14.7475 7.25 12.0374 3.625 8.69544 3.625Z" stroke="#E16A00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

        </form>
      </div>
    </div>
  );
};

export default showCard;
