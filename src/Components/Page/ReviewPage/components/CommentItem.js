
import styles from "./CommentItem.module.scss";
import { useEffect } from "react";
import { useState } from "react";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

const CommentItem = ({item}) => {

    const labels = {
        0.5: 'Useless',
        1: 'Useless+',
        1.5: 'Poor',
        2: 'Poor+',
        2.5: 'Ok',
        3: 'Ok+',
        3.5: 'Good',
        4: 'Good+',
        4.5: 'Excellent',
        5: 'Excellent+',
      };

      const useStyles = makeStyles({
        root: {
          width: 200,
          display: 'flex',
          alignItems: 'center',
        },
      });

      const [value, setValue] = React.useState(2);
        const [hover, setHover] = React.useState(-1);
        const classes = useStyles();
    return (
        <div className={styles.containerItem}>
            <div className={styles.boxTitle}>
                <div className={styles.nameAndRating} >
                    <p className ={styles.userName}>
                        user name
                    </p>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }} >
                        <Rating name="read-only" value={value} readOnly />
                        <p className ={styles.numberRating}>{value.toFixed(1)}</p>
                    </div>
                    
                </div>
                <p className={styles.commentedTime}>2 minutes ago</p>
            </div>
            <p className={styles.content}>{item.content}</p>
        </div>
    );
}

export default CommentItem;