import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "./components/controls/Controls";
import { useForm, Form } from './components/useForm';
//import * as employeeService from "../../services/employeeService";


const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' },
]

const options = ["Tiểu thuyết", "Truyện tranh", "Ngôn tình", "Kinh tế", "Khoa học"]

const initialFValues = {
    id: 0,
    name: '',
    category: "Tiểu thuyết",
    author: '',
    publishingDate: new Date(),
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIT6ea5wT-e2ainq21_nXBrkX02S5-iEg52g&usqp=CAU"
}

export default function BookForm(props) {
    const { addOrEdit, recordForEdit } = props

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
                <Grid item xs={6} direction='column'  >
                    
                <div style={{height: 220, width: 200, marginLeft: 80}} >
                    <img style={{height: 210, width: 180}} src ={values.imgSrc} />
                </div>
                <Controls.Input
                        name="imgSrc"
                        label="Image Source"
                        value={values.imgSrc}
                        onChange={handleInputChange}
                        //error={errors.fullName}
                    />
                    <Controls.Input
                        name="id"
                        label="Book ID"
                        value={values.id}
                        onChange={handleInputChange}
                        //error={errors.id}
                    />
                </Grid>
                <Grid item xs={6}  direction='column'>
                <Controls.Input
                        name="name"
                        label="Name"
                        value={values.name}
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
                        name="category"
                        value={values.category}
                        onChange={handleInputChange}
                        //error={errors.email}
                        options= {options}
                    />
                    <Controls.DatePicker 
                        label="Publishing Date"
                        name="publishingDate"
                        value={Date.parse(values.publishingDate)}
                        onChange={handleInputChange}
                    />

                    <div style={{marginTop: 20}}>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
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
