import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";

export function useForm(initialFValues, validateOnChange = false, validate) {
    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
        if (validateOnChange) validate({ [name]: value });
    };
    useEffect(() => {
        console.log(initialFValues);
        setValues(initialFValues);
    }, [initialFValues]);
    const resetForm = () => {
        setValues(initialFValues);
        setErrors({});
    };

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiFormControl-root": {
            width: "85%",
            margin: theme.spacing(1),
        },
        width: "100%",
        paddingLeft: 0,
        marginLeft: 15,
    },
}));

export function Form(props) {
    const classes = useStyles();
    const { children, ...other } = props;
    return (
        <form className={classes.root} autoComplete="off" {...other}>
            {props.children}
        </form>
    );
}
