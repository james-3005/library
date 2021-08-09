import React, { useState, useEffect } from "react";
import {
    ButtonGroup,
    FormControl,
    InputLabel,
    Select,
    TextField,
    MenuItem,
    Button,
    Grid,
} from "@material-ui/core";
import Controls from "../AdminPage/components/controls/Controls";
import { useForm, Form } from "../AdminPage/components/useForm";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
//import * as employeeService from "../../services/employeeService";
import { api } from "../../../env";

const initialFValues = {
    book_id: 0,
    borrower_id: 0,
    from_date: new Date(),
    promissory_date: new Date(),
};
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function BorrowForm(props) {
    const { t } = useTranslation();
    const classes = useStyles();
    const { addOrEdit, recordForEdit } = props;
    const [listUser, setListUser] = useState([]);
    const [listBook, setListBook] = useState([]);

    const token = window.localStorage.getItem("user");
    const axios = require("axios");
    useEffect(() => {
        axios
            .get(`${api}manage/get-user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setListUser(res.data);
            });
        axios.get(`${api}book?`).then((response) => {
            console.log(response.data.books);
            setListBook(response.data.books);
        });
    }, []);

    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ("Name" in fieldValues)
            temp.fullName = fieldValues.fullName
                ? ""
                : "This field is required.";
        if ("email" in fieldValues)
            temp.email = /$^|.+@.+..+/.test(fieldValues.email)
                ? ""
                : "Email is not valid.";
        if ("mobile" in fieldValues)
            temp.mobile =
                fieldValues.mobile.length > 9
                    ? ""
                    : "Minimum 10 numbers required.";
        if ("departmentId" in fieldValues)
            temp.departmentId =
                fieldValues.departmentId.length != 0
                    ? ""
                    : "This field is required.";
        setErrors({
            ...temp,
        });

        if (fieldValues == values)
            return Object.values(temp).every((x) => x == "");
    };

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
    } = useForm(initialFValues, true, validate);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    };

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit,
            });
    }, [recordForEdit]);

    return (
        <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel style={{ backgroundColor: "white" }}>
                    {t("book name")}
                </InputLabel>
                <Select
                    name="book_id"
                    value={values.book_id}
                    onChange={handleInputChange}
                    //style={{ width: "110%" }}
                >
                    <MenuItem value="All">{t("all")}</MenuItem>
                    {listBook
                        ? listBook.map((item, index) => (
                              <MenuItem value={item.book_id} key={index}>
                                  {item.name_book}
                              </MenuItem>
                          ))
                        : []}
                </Select>
            </FormControl>

            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel style={{ backgroundColor: "white" }}>
                    {t("borrower name")}
                </InputLabel>
                <Select
                    name="borrower_id"
                    value={values.borrower_id}
                    onChange={handleInputChange}
                    //style={{ width: "110%" }}
                >
                    <MenuItem value="All">{t("all")}</MenuItem>
                    {listUser
                        ? listUser.map((item, index) => (
                              <MenuItem value={item.id} key={index}>
                                  {item.name}
                              </MenuItem>
                          ))
                        : []}
                </Select>
            </FormControl>

            <Controls.DatePicker
                label={t("From Date")}
                name="from_date"
                value={Date.parse(values.from_date)}
                onChange={handleInputChange}
            />
            <Controls.DatePicker
                label={t("Promissory Date")}
                name="promissory_date"
                value={Date.parse(values.promissory_date)}
                onChange={handleInputChange}
            />
            <div style={{ marginTop: 20 }}>
                <Controls.Button
                    type="submit"
                    text={t("Submit")}
                    onClick={handleSubmit}
                />
                <Controls.Button
                    text={t("Reset")}
                    color="default"
                    onClick={resetForm}
                />
            </div>
        </Form>
    );
}
