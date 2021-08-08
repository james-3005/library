import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "./components/controls/Controls";
import { useForm, Form } from './components/useForm';
//import * as employeeService from "../../services/employeeService";


const options = ["Tiểu thuyết", "Truyện tranh", "Ngôn tình", "Kinh tế", "Khoa học"]

const initialFValues = {
    book_id: 0,
    name_book: '',
    type_id: 1,
    author: '',
    publication_date: new Date(),
    book_image: "",
    price: "0",
    translator: "",
    review: ""
}

export default function BookForm(props) {
    const { addOrEdit, recordForEdit } = props
    const [image, setImage] = useState(); 

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('Name' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required."
        if ('departmentId' in fieldValues)
            temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const getUrlImage = (file) => {
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            setImage(reader.result)
           }
        return reader;
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}  style={{width: "100%" }}>
            <Grid container style={{width: "100%"}}>
                <Grid item xs={6}  >
                    
                <div style={{height: 220, width: 200, marginLeft: 80}} >
                    <img style={{height: 210, width: 180}} src ={image} />
                </div>
                <input 
                    type="file" 
                    onChange={(event) => {
                        const file = event.target.files[0];
                        setValues({
                            ...values,
                            book_image: file
                        })
                        var reader = new FileReader();
                        var url = reader.readAsDataURL(file);

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
                    Upload a image
                </label>
                    <Controls.Input
                        name="price"
                        label="Price"
                        value={values.price}
                        onChange={handleInputChange}
                        //error={errors.id}
                    />
                    <Controls.Input
                        name="translator"
                        label="Translator"
                        value={values.translator}
                        onChange={handleInputChange}
                        //error={errors.id}
                    />
                </Grid>
                <Grid item xs={6} >
                <Controls.Input
                        name="name_book"
                        label="Name"
                        value={values.name_book}
                        onChange={handleInputChange}
                        error={errors.Name}
                    />
                    
                    <Controls.Input
                        label="Author"
                        name="author"
                        value={values.author}
                        onChange={handleInputChange}
                       // error={errors.mobile}
                    />

                    <Controls.Select
                        label="Category"
                        name="type_id"
                        //value={values.type_id}
                        //onChange={handleInputChange}
                        //error={errors.email}
                        options= {options}
                    />
                    <Controls.DatePicker 
                        label="Publishing Date"
                        name="publication_date"
                        value={Date.parse(values.publication_date)}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        name="review"
                        label="Review"
                        value={values.review}
                        onChange={handleInputChange}
                        //error={errors.id}
                    />

                    <div style={{marginTop: 20}}>
                        <Controls.Button
                            type="submit"
                            text="Submit" 
                            onClick = {handleSubmit}
                            />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
