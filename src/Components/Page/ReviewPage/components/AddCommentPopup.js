import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import styles from "./Popup.module.scss";

import {makeStyles } from '@material-ui/core';
import { black } from "material-ui/styles/colors";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(0),
        position: 'absolute',
        top: theme.spacing(0),
        right: theme.spacing(30),
        //sbackgroundColor: 'green',
        //height: "50%"
        width: '100%'
    },
    dialogTitle: {
        paddingRight: '0px',
        justifyContent: 'center'
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
      },
      submitButton: {
          backgroundColor: 'blue',
          color: "white",
      },
      label: {
        textTransform: 'none'
    }
}))

export default function AppCommentPopup(props) {
    const { openPopup, setOpenPopup, ...other } = props;
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);
    const classes = useStyles();



  return (
    <div className={styles.containerPopup} >
      <Dialog
        open={openPopup}
        TransitionComponent={Transition}
        keepMounted
        //onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        classes={{ paper: classes.dialogWrapper }}
      >
        <DialogTitle className={classes.dialogTitle} id="alert-dialog-slide-title">
          <div style={{
              display: 'flex',  
              flexDirection: 'row',
              justifyContent: 'center',
          }} >
            <p style={{}}>Thêm đánh giá của bạn</p>
            <IconButton className={classes.closeButton} onClick={() => setOpenPopup(false)}>
                <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className={styles.containerContent} >
              <div style={{
              display: 'flex',
              flexDirection: 'row',
              marginLeft: 60,
              paddingBottom: 25
            }} >
                  <img src={"/image/svg/book.svg"} style={{
                      height: 150,
                      width: 100,
                      //borderRadius: 10
                  }} />
                  <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      marginLeft: 60
                  }}>
                      <p style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        paddingBottom: 10
                      }} >book name</p>
                      <p style={{
                        fontSize: 19,
                        fontWeight: 'initial',
                        paddingBottom: 10,
                        color: "#4f4f46"
                      }} >năm xuất bản</p>
                      <p style={{
                        fontSize: 18,
                        color: "#8a8a81"
                      }}>thể loại</p>
                  </div>
              </div>
              <div style={{
                  height: 1,
                  backgroundColor: 'grey',
                  paddingTop: 1
              }}>  
              </div>

              <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingTop: 10,
                  paddingBottom: 10
              }} >
                <Rating
                    name="hover-feedback"
                    value={value}
                    precision={0.5}
                    onChange={(event, newValue) => {
                    setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                    setHover(newHover);
                    }}
                    size="large"
                />
                {value !== null && <p style={{
                    marginTop: 5,
                    fontSize: 20,
                    marginLeft: 20
                }}>{labels[hover !== -1 ? hover : value]}</p>}
              </div>
              <textarea 
                placeholder="Để lại đánh giá của bạn tại đây..."
                rows={10}
                cols={20}
                className={styles.input}
              />

              <Button variant="contained" color="primary"  >
                  Gửi đánh giá
              </Button>

          </div>
        </DialogContent>
        <DialogActions>
          
        </DialogActions>
      </Dialog>
    </div>
  );
}
