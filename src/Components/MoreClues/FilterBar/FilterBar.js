import React from 'react'
import InputFilter from '../InputFilter/InputFilter';
import styles from './FilterBar.module.scss'

function FilterBar({activeSearch, setActiveSearch, activeFilter, setActiveFilter}) {
    const handleToggle = () => {
        if(!activeFilter){
            setActiveSearch(false);
        }
        setActiveFilter(!activeFilter);
    }
    return (
        <div className={styles.searchComponent}>
                <button className={styles.btn} onClick={handleToggle}>
                    <img src={!activeFilter?"image/svg/filter.svg":"image/svg/filterclear.svg"}
                        alt="" 
                        className={styles.icon}/>
                </button>

            
            <div className={!activeFilter?styles.input_active: styles.input}>
                <InputFilter type={"text"} placeholder={"Enter Author"} active={activeFilter}/>
                <InputFilter type={"number"} placeholder={"Enter Year"} active={activeFilter}/>
                {/* <InputFilter type={"text"} placeholder={"Enter Type"}/> */}
                <select id="type" className={styles.selection}>
                    <option value="All">All</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Fiction">Fiction</option>

                </select>
            
            </div>    
        </div>
    )
}

export default FilterBar
