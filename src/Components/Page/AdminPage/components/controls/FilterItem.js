import React from 'react';
import styles from './FilterItem.module.scss';

const FilterItem = ({title, amount, imgSource}) => {
    return (

        <div className={styles.container} >
            <img src={imgSource} className={styles.image} />
            <div className={styles.groupText} >
                <p className={styles.title} >{title}</p>
                <p className={styles.amount} >{amount}</p>
            </div>
        </div>
    );
}

export default FilterItem;