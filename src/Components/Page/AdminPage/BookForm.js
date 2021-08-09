import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import Controls from "./components/controls/Controls";
import { useForm, Form } from "./components/useForm";
import { api } from "../../../env";
//import * as employeeService from "../../services/employeeService";
import { useTranslation } from "react-i18next";
import { VariantLabels } from 'framer-motion';

const options = [
    "Tiểu thuyết",
    "Truyện tranh",
    "Ngôn tình",
    "Kinh tế",
    "Khoa học",
];

const initialFValues = {
    book_id: 0,
    name_book: "",
    type_id: 1,
<<<<<<< HEAD
    country_id: "",
    author: "",
=======
    country_id: 0,
    author: '',
>>>>>>> Toan
    publication_date: new Date(),
    book_image: "",
    price: "0",
    translator: "",
    review: "",
};

export default function BookForm(props) {
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

<<<<<<< HEAD
    const { addOrEdit, recordForEdit } = props;
    const [image, setImage] = useState();
=======
    const { 
        addOrEdit, 
        recordForEdit,
     } = props

    const { t } = useTranslation();
    const [image, setImage] = useState(); 
>>>>>>> Toan
    const [listCountry, setListCountry] = useState([]);
    const [listType1, setListType1] = useState([]);
    const [listType2, setListType2] = useState([]);
    const [listType3, setListType3] = useState([]);
    const [type1, setType1] = React.useState("All");
    const [type2, setType2] = React.useState("All");
    const [type3, setType3] = React.useState("All");

    const axios = require("axios");
    useEffect(() => {
        axios.get(`${api}type?level=1`).then((res) => {
            console.log(res.data);
            setListType1(res.data);
        });
<<<<<<< HEAD
        axios.get(`${api}country`).then((res) => {
            setListCountry(res.data.countries);
=======
        axios.get("http://library-mini.xyz/api/v1/country").then((res) => {
            setListCountry(res.data);
>>>>>>> Toan
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

    const validate = (fieldValues = values) => {
<<<<<<< HEAD
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
=======
        let temp = { ...errors }
        if ('name_book' in fieldValues)
            temp.name_book = fieldValues.fullName ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required."
        if ('departmentId' in fieldValues)
            temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
>>>>>>> Toan
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

<<<<<<< HEAD
    const getUrlImage = (file) => {
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            setImage(reader.result);
        };
        return reader;
    };
=======
>>>>>>> Toan

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            var exptype = 1;
            if (type3 !== "All") exptype = type3;
            else if (type2 !== "All") exptype = type2;
<<<<<<< HEAD
            setValues({
                ...values,
                country_id: exptype,
            });
=======
            console.log(exptype)
            setValues(
                {
                    ...values,
                    type_id: exptype
                }
            )
            
>>>>>>> Toan
            addOrEdit(values, resetForm);
        }
    };

    useEffect(() => {
        if (recordForEdit != null)

            setValues({
<<<<<<< HEAD
                ...recordForEdit,
            });
    }, [recordForEdit]);
=======
                ...recordForEdit
            })  
    }, [recordForEdit])
>>>>>>> Toan

    return (
        <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Grid container style={{ width: "100%" }}>
                <Grid item xs={6}>
                    <div style={{ height: 220, width: 200, marginLeft: 80 }}>
                        <img style={{ height: 210, width: 180 }} src={image} />
                    </div>
                    <input
                        type="file"
                        onChange={(event) => {
                            const file = event.target.files[0];
                            setValues({
                                ...values,
                                book_image: file,
                            });
                            var reader = new FileReader();
                            var url = reader.readAsDataURL(file);

<<<<<<< HEAD
                            reader.onloadend = function (e) {
                                setImage(reader.result);
                            };
                        }}
                        id="file"
                        style={{ display: "none" }}
                    />
                    <label
                        for="file"
                        style={{
                            display: "flex",
                            marginLeft: 90,
                            width: 155,
                            height: 40,
                            backgroundColor: "#0a0a94",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "white",
                            fontSize: 15,
                            fontWeight: "bold",
                            borderRadius: 5,
                        }}
                    >
                        Upload a image
                    </label>
                    <InputLabel>Type DDC</InputLabel>
=======
                        reader.onloadend = function (e) {
                            setImage(reader.result)
                        }
                        
                        }} 
                    id = "file" 
                    style={{ display: 'none'}} 
                />
                <label for="file"
                    style ={{
                        display: 'flex',
                        marginLeft: 90,
                        width: 155,
                        height: 40,
                        backgroundColor: "#0a0a94",
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                        fontSize: 15,
                        fontWeight: 'bold',
                        borderRadius: 5,
                    }}>
                   {t("Upload a image")}
                </label>
                <InputLabel>DDC</InputLabel>
                {/* <div className={styles.select}> */}
>>>>>>> Toan
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
                            //style={{ width: "110%" }}
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
<<<<<<< HEAD
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
=======
                            <InputLabel style={{ backgroundColor: "white" }}>
                                2
                            </InputLabel>
                            <Select
                                value={type2}
                                onChange={(e) => setType2(e.target.value)}
                                //style={{ width: "110%" }}
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
                                    //style={{ width: "110%" }}
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
>>>>>>> Toan
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        name="price"
                        label={t("Price")}
                        value={values.price}
                        onChange={handleInputChange}
                        //error={errors.id}
                    />
                    <Controls.Input
                        name="translator"
                        label={t("Translator")}
                        value={values.translator}
                        onChange={handleInputChange}
                        //error={errors.id}
                    />
                    <Controls.Input
                        name="name_book"
                        label={t("Book Name")}
                        value={values.name_book}
                        onChange={handleInputChange}
                        error={errors.Name}
                    />

                    <Controls.Input
                        label={t("Author")}
                        name="author"
                        value={values.author}
                        onChange={handleInputChange}
                        // error={errors.mobile}
                    />

<<<<<<< HEAD
                    <FormControl
                        variant="outlined"
                        className={classes.formControl}
                    >
=======
    <               FormControl variant="outlined" className={classes.formControl}>
>>>>>>> Toan
                        <InputLabel style={{ backgroundColor: "white" }}>
                            {t("country")}
                        </InputLabel>
                        <Select
                            name="country_id"
                            value={values.country_id}
                            onChange={handleInputChange}
                            //style={{ width: "110%" }}
                        >
                            <MenuItem value="All">{t("all")}</MenuItem>
                            {listCountry
                                ? listCountry.map((item, index) => (
                                      <MenuItem
                                          value={item.country_id}
                                          key={index}
                                      >
                                          {item.country_name}
                                      </MenuItem>
                                  ))
                                : []}
                        </Select>
                    </FormControl>
<<<<<<< HEAD
                    <Controls.DatePicker
                        label="Publishing Date"
=======
                    <Controls.DatePicker 
                        label={t("Publishing Date")}
>>>>>>> Toan
                        name="publication_date"
                        value={Date.parse(values.publication_date)}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        name="review"
                        label={t("Review")}
                        value={values.review}
                        onChange={handleInputChange}
                        //error={errors.id}
                    />

                    <div style={{ marginTop: 20 }}>
                        <Controls.Button
                            type="submit"
<<<<<<< HEAD
                            text="Submit"
                            onClick={handleSubmit}
                        />
=======
                            text={t("Submit")} 
                            onClick = {handleSubmit}
                            />
>>>>>>> Toan
                        <Controls.Button
                            text={t("Reset")}
                            color="default"
                            onClick={resetForm}
                        />
                    </div>
                </Grid>
            </Grid>
        </Form>
    );
}
