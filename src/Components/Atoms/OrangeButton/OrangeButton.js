import React from 'react'
import styles from './OrangeButton.module.scss'

function OrangeButton({ size, text, action }) {
    const handleClick = () => {
        if(action)
            action();
    }
    let component= size ==="small"? styles.smallComponent: size === "medium"? styles.mediumComponent : styles.bigComponent;

    return (
        <button className={component} onClick={handleClick}>
            {text}
        </button>
    )
}

export default OrangeButton
