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
import { useTranslation } from "react-i18next";
import { api } from "../../../env";
function Popup(props) {
    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            // minWidth: 120,
            marginLeft: 0,
            width: "91%",
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
    const { t } = useTranslation();
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
        axios.get(`${api}type?level=1`).then((res) => {
            console.log(res.data);
            setListType1(res.data);
        });
        axios.get(`${api}country`).then((res) => {
            setListCountry(res.data);
        });
    }, []);
    useEffect(() => {
        setListType3([]);
        setType3("All");
        axios.get(`${api}type?parent_id=${type1}`).then((res) => {
            setListType2(res.data);
            setType2("All");
        });
    }, [type1]);
    useEffect(() => {
        setType3("All");
        axios.get(`${api}type?parent_id=${type2}`).then((res) => {
            setListType3(res.data);
        });
    }, [type2]);
    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>{t("filter")}</DialogTitle>
            <div className={styles.component}>
                <TextField
                    label={t("author")}
                    className={styles.input}
                    variant="outlined"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <TextField
                    label={t("publishyear")}
                    type="number"
                    className={styles.input}
                    variant="outlined"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
                <TextField
                    label={t("trans")}
                    className={styles.input}
                    variant="outlined"
                    value={translator}
                    onChange={(e) => setTranslator(e.target.value)}
                />

                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel style={{ backgroundColor: "white" }}>
                        {t("country")}
                    </InputLabel>
                    <Select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        style={{ width: "110%" }}
                    >
                        <MenuItem value="All">{t("all")}</MenuItem>
                        {listCountry
                            ? listCountry.map((item, index) => (
                                  <MenuItem value={item.country_id} key={index}>
                                      {item.country_name}
                                  </MenuItem>
                              ))
                            : []}
                    </Select>
                </FormControl>

                <InputLabel>DDC</InputLabel>
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
                            style={{ width: "110%" }}
                        >
                            <MenuItem value={"All"}>{t("all")}</MenuItem>
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
                    {listType2.length != 0 ? (
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
                                style={{ width: "110%" }}
                            >
                                <MenuItem value="All">{t("all")}</MenuItem>
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
                    ) : (
                        <div />
                    )}
                    <>
                        {listType3.length != 0 ? (
                            <FormControl
                                variant="outlined"
                                className={classes.formControl}
                            >
                                <InputLabel
                                    style={{ backgroundColor: "white" }}
                                >
                                    3
                                </InputLabel>
                                <Select
                                    value={type3}
                                    onChange={(e) => setType3(e.target.value)}
                                    style={{ width: "110%" }}
                                >
                                    <MenuItem value="All">{t("all")}</MenuItem>
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
                        ) : (
                            <div />
                        )}
                    </>
                </div>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleFilter}
                >
                    {t("filter")}
                </Button>
            </div>
        </Dialog>
    );
}

export default Popup;
