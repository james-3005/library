import React, { useEffect, useState } from "react";
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
import axios from "axios";
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
    const {
        onClose,
        open,
        selectedValue,
        author,
        setAuthor,
        year,
        setYear,
        type1,
        setType1,
        type2,
        setType2,
        type3,
        setType3,
        Filter,
        country,
        setCountry,
        translator,
        setTranslator,
    } = props;
    const [listType1, setListType1] = useState([]);
    const [listType2, setListType2] = useState([]);
    const [listType3, setListType3] = useState([]);
    const [listCountry, setListCountry] = useState([]);
    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleFilter = () => {
        Filter();
        onClose(selectedValue);
    };
    useEffect(() => {
        axios.get("http://library-mini.xyz/api/v1/type?level=1").then((res) => {
            console.log(res.data);
            setListType1(res.data);
        });
        axios.get("http://library-mini.xyz/api/v1/country").then((res) => {
            setListCountry(res.data.countries);
        });
    }, []);
    useEffect(() => {
        setListType3([]);
        setType3("All");
        axios
            .get(`http://library-mini.xyz/api/v1/type?parent_id=${type1}`)
            .then((res) => {
                setListType2(res.data);
                setType2("All");
            });
    }, [type1]);
    useEffect(() => {
        setType3("All");
        axios
            .get(`http://library-mini.xyz/api/v1/type?parent_id=${type2}`)
            .then((res) => {
                setListType3(res.data);
            });
    }, [type2]);
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
                <TextField
                    label="Translator"
                    className={styles.input}
                    variant="outlined"
                    value={translator}
                    onChange={(e) => setTranslator(e.target.value)}
                />

                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel style={{ backgroundColor: "white" }}>
                        Country
                    </InputLabel>
                    <Select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                        <MenuItem value="All">All</MenuItem>
                        {listCountry.map((item, index) => (
                            <MenuItem value={item.country_id} key={index}>
                                {item.country_name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <InputLabel>Type DDC</InputLabel>
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
                            {/* <MenuItem value="All">All</MenuItem> */}
                            {listType1
                                ? listType1.map((item, index) => (
                                      <MenuItem
                                          value={item.type_id}
                                          key={index}
                                      >
                                          {item.name}
                                      </MenuItem>
                                  ))
                                : []}
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
                            <MenuItem value="All">All</MenuItem>
                            {listType2
                                ? listType2.map((item, index) => (
                                      <MenuItem
                                          value={item.type_id}
                                          key={index}
                                      >
                                          {item.name}
                                      </MenuItem>
                                  ))
                                : []}
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
                            <MenuItem value="All">All</MenuItem>
                            {listType3
                                ? listType3.map((item, index) => (
                                      <MenuItem
                                          value={item.type_id}
                                          key={index}
                                      >
                                          {item.name}
                                      </MenuItem>
                                  ))
                                : []}
                        </Select>
                    </FormControl>
                </div>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleFilter}
                >
                    Filter
                </Button>
            </div>
        </Dialog>
    );
}

export default Popup;
