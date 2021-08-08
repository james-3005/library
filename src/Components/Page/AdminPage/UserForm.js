import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "./components/controls/Controls";
import { useForm, Form } from './components/useForm';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
//import * as employeeService from "../../services/employeeService";


const initialFValues = {
    id: 0,
    name: "",
    email: "",
    address: "",
}

export default function UserForm(props) {
    const { addOrEdit, recordForEdit } = props
    const [showPassword, setShowPassword] = useState(false)

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
                        label="User ID"
                        name="id"
                        value={values.id}
                        onChange={handleInputChange}
                       // error={errors.mobile}
                    />

                    <Controls.Input
                        label="User Name"
                        name="name"
                        value={values.name}
                        onChange={handleInputChange}
                       // error={errors.mobile}
                    />

                    <Controls.Input
                        label="Password"
                        name="password"
                        value={values.password}
                        onChange={handleInputChange}
                       // error={errors.mobile}
                        endAdornment={
                            <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={setShowPassword}
                                //onMouseDown={handleMouseDownPassword}
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                            </InputAdornment>
                        }
                        type={showPassword ? 'text' : 'password'}
                    />
                    <Controls.Input
                        label="Password Confirm"
                        name="password_confirm"
                        value={values.password_confirm}
                        onChange={handleInputChange}
                       // error={errors.mobile}
                        endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={setShowPassword}
                            //onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                        }
                        type={showPassword ? 'text' : 'password'}
                    />

                    <Controls.Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                    />
                     <Controls.Input
                        label="Address"
                        name="address"
                        value={values.address}
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
