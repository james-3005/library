import React from 'react'
import styles from './RateStar.module.scss'
import c from 'classnames'
function RateStar() {
    return (
        <div className={styles.component}>
        <p className={styles.header}>Đánh giá</p>
            <div className={styles.boxAvg}>
                <p className={styles.Avg}>5.0</p>
                <div className={styles.listStar}>
                    <img src="/image/svg/yellowStar.svg" alt=""/>
                    <img src="/image/svg/yellowStar.svg" alt=""/>
                    <img src="/image/svg/yellowStar.svg" alt=""/>
                    <img src="/image/svg/yellowStar.svg" alt=""/>
                    <img src="/image/svg/grayStar.svg" alt=""/>
                </div>
                <p className={styles.number}>Dựa trên 269 đánh giá</p>
            </div>
        <div className={styles.listVote}>
            <div className={styles.line}>
                <p className={styles.kind}>Tuyệt vời</p>
                <div className={styles.color}>
                    <div className={styles.voteColor5}/>
                </div>
            </div>
            <div className={styles.line}>
                <p className={styles.kind}>Tốt</p>
                <div className={styles.color}>
                    <div className={styles.voteColor4}/>
                </div>
            </div>
            <div className={styles.line}>
                <p className={styles.kind}>Khá</p>
                <div className={styles.color}>
                    <div className={styles.voteColor3}/>
                </div>
            </div>
            <div className={styles.line}>
                <p className={styles.kind}>Trung bình</p>
                <div className={styles.color}>
                    <div className={styles.voteColor2}/>
                </div>
            </div>
            <div className={styles.line}>
                <p className={styles.kind}>Dở</p>
                <div className={styles.color}>
                    <div className={styles.voteColor1}/>
                </div>
            </div>
        </div>
        <button className={styles.addComment}>Thêm đánh giá của bạn</button>
        </div>

    )
}

export default RateStar
