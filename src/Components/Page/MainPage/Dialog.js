import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import styles from "./Dialog.module.scss";
import { makeStyles } from "@material-ui/core/styles";
import {
    ButtonGroup,
    FormControl,
    InputLabel,
    Select,
    TextField,
    MenuItem,
    Button,
} from "@material-ui/core";
function Popup(props) {
    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));
    const classes = useStyles();
    const { onClose, open, selectedValue } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const [author, setAuthor] = React.useState("");
    const [year, setYear] = React.useState("");
    const [type1, setType1] = React.useState("");
    const [type2, setType2] = React.useState("");
    const [type3, setType3] = React.useState("");
    // const handleChange = (event) => {
    //     setAge(event.target.value);
    // };
    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Filter</DialogTitle>
            <div className={styles.component}>
                <TextField
                    label="Author"
                    className={styles.input}
                    variant="outlined"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <TextField
                    label="Publish year"
                    type="number"
                    className={styles.input}
                    variant="outlined"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
                <InputLabel>Type</InputLabel>
                <div className={styles.select}>
                    <FormControl
                        variant="outlined"
                        className={classes.formControl}
                    >
                        <InputLabel style={{ backgroundColor: "white" }}>
                            1
                        </InputLabel>
                        <Select
                            value={type1}
                            onChange={(e) => setType1(e.target.value)}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl
                        variant="outlined"
                        className={classes.formControl}
                    >
                        <InputLabel style={{ backgroundColor: "white" }}>
                            2
                        </InputLabel>
                        <Select
                            value={type2}
                            onChange={(e) => setType2(e.target.value)}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl
                        variant="outlined"
                        className={classes.formControl}
                    >
                        <InputLabel style={{ backgroundColor: "white" }}>
                            3
                        </InputLabel>
                        <Select
                            value={type3}
                            onChange={(e) => setType3(e.target.value)}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <Button color="primary" variant="contained">
                    Filter
                </Button>
            </div>
        </Dialog>
    );
}

export default Popup;
