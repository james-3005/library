import React, { useEffect } from 'react'
import styles from './InputFilter.module.scss'

function InputFIlter({type, placeholder, active}) {
    const [val, setVal]=React.useState("");
    useEffect(() => {
        if(active)
         setVal("");
    },[active]);
    return (
        <div className={styles.component}>
            <input type={type} className={styles.input}
                   placeholder={placeholder}
                   value={val}
                   onChange={(e) => setVal(e.target.value)}
            />
            <img src="image/svg/x.svg" alt=""
                className={styles.icon}
                onClick={() => setVal("")}
            />
        </div>
    )
}

export default InputFIlter
