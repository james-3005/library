import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../AdminPage/components/controls/Controls";
import { useForm, Form } from '../AdminPage/components/useForm';
//import * as employeeService from "../../services/employeeService";


const initialFValues = {
    book_id: 0,
    borrower_id: 0,
    from_date: new Date(),
    promissory_date: new Date(),
}

export default function BorrowForm(props) {
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
                    <Controls.Input
                        label="Book ID"
                        name="book_id"
                        value={values.book_id}
                        onChange={handleInputChange}
                       // error={errors.mobile}
                    />

                    <Controls.Input
                        label="User ID"
                        name="borrower_id"
                        value={values.borrower_id}
                        onChange={handleInputChange}
                       // error={errors.mobile}
                    />

                    <Controls.DatePicker 
                        label="From Date"
                        name="from_date"
                        value={Date.parse(values.from_date)}
                        onChange={handleInputChange}
                    />
                     <Controls.DatePicker 
                        label="Promissory Date"
                        name="promissory_date"
                        value={Date.parse(values.promissory_date)}
                        onChange={handleInputChange}
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
        </Form>
    )
}
