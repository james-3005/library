import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(0),
        position: 'absolute',
        top: theme.spacing(20),
        right: theme.spacing(40),
        //sbackgroundColor: 'green',
        //height: "50%"
        width: '100%'
    },
}))

export default function AlertDialog(props) {
    const { title, content, openDialog, setOpenDialog, actionCf, deletedId } = props;
    const classes = useStyles();
  return (
    <div>
      
      <Dialog
        open={openDialog}
        //onClose={}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.dialogWrapper }}
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setOpenDialog(false)}} color="primary">
            Đóng
          </Button>
          <Button onClick={() => {
              setOpenDialog(false)
              actionCf(deletedId)
        
        }} color="primary" autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}