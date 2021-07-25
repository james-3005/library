import React from 'react'
import styles from './cartComponent.module.scss'
function cartComponent() {
    return (
        <div className={styles.cart}>
            <div>
                <img src="image/svg/cart.svg" />
            </div>
            <div class={styles.total}>
                <p>180.000</p>
            </div>
            <div>
                <img src="image/svg/option.svg" />
            </div>
        </div>
    )
}

export default cartComponent