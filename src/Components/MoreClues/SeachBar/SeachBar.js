import { motion } from 'framer-motion';
import React from 'react'
import styles from './SearchBar.module.scss'

function SeachBar() {
    const [activeSearch, setActiveSearch]= React.useState(false);
    const [value, setValue]= React.useState("");
    const handleToggle = () => {
        if(activeSearch) 
            setValue("");
        setActiveSearch(!activeSearch);

    }
    return (
        <div className={styles.searchComponent}>
   
                <button className={styles.btn} onClick={handleToggle}>
                    <img src="/image/svg/search.svg" alt=""/>
                </button>

            
            <input type="text" placeholder="Enter text" 
                    className={!activeSearch?styles.input_active: styles.input}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    />
        </div>
    )
}

export default SeachBar
