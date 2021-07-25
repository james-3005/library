import React from 'react'
import styles from './searchComponent.module.scss'
function searchComponent() {
    return (
        <div className={styles.search}>
            <img src="image/svg/search.svg" class={styles.iconSearch} />
            <input type="text" placeholder="Tìm kiếm" />
        </div>
    )
}

export default searchComponent