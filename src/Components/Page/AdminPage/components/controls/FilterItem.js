import React from "react";
import styles from "./FilterItem.module.scss";
import { motion } from "framer-motion";
const FilterItem = ({ title, amount, type, active, action }) => {
    return (
        <div className={styles.container} onClick={action}>
            <div className={styles.boxImg}>
                {active ? (
                    <motion.img
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        // transition={{ duration: 1, easings: "easeOut" }}
                        src={`/Image/svg/filterBox/blur${type}.svg`}
                        className={styles.blur}
                    />
                ) : (
                    <div />
                )}
                <img
                    src={`/Image/svg/filterBox/img${type}.svg`}
                    className={styles.img}
                />
            </div>

            <div className={styles.groupText}>
                <p className={styles.title}>{title}</p>
                <p className={styles.amount}>{amount}</p>
            </div>
        </div>
    );
};

export default FilterItem;
