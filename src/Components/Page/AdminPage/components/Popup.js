import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@material-ui/core';
import Controls from "./controls/Controls";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5),
        right: theme.spacing(20),
        //sbackgroundColor: 'green',
        //height: "50%"
        width: '100%'
    },
    dialogTitle: {
        paddingRight: '0px'
    },
    dialogContainer: {
        width: '100%',
        //backgroundColor: 'pink'
    }
}))

export default function Popup(props) {

    const { title, children, openPopup, setOpenPopup } = props;
    const classes = useStyles();

    return (
        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }} className={classes.dialogContainer} >
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ 
                    display: 'flex',
                    flexDirection: 'row' ,
                    justifyContent: 'space-around',
                     width: 900,
                     //backgroundColor: 'black'
                     }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <Controls.ActionButton
                        color="secondary"
                        onClick={()=>{setOpenPopup(false)}}>
                        <CloseIcon />
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers >
                {children}
            </DialogContent>
        </Dialog>
    )
}
