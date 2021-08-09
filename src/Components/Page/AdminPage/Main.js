import React, { useEffect } from "react";
//import SideMenu from "../components/SideMenu";
import {
    makeStyles,
    CssBaseline,
    createMuiTheme,
    ThemeProvider,
} from "@material-ui/core";
//import Header from "../components/Header";
//import PageHeader from '../components/PageHeader';
import Background6 from "../../Template/Background3/Background3";

import BookAdminPage from "./BookAdminPage";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { api } from "../../../env";
const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#333996",
            light: "#3c44b126",
        },
        secondary: {
            main: "#f83245",
            light: "#f8324526",
        },
        background: {
            default: "#f4f5fd",
        },
    },
    overrides: {
        MuiAppBar: {
            root: {
                transform: "translateZ(0)",
            },
        },
    },
    props: {
        MuiIconButton: {
            disableRipple: true,
        },
    },
});

const useStyles = makeStyles({
    appMain: {
        display: 'flex',
        alignItems: "center",
        flexDirection: "column",
        width: window.width,
        height: window.height,
        flex: 1,
        overflowY: "scroll",
        paddingTop: 90,
        zIndex: 5,
        width: "100%",
        //backgroundColor: 'green'
    },
});

function Main() {
    const classes = useStyles();
    const history = useHistory();
    useEffect(() => {
        axios
            .get(`${api}auth/user-profile`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem(
                        "user"
                    )}`,
                },
            })
            .then((res) => {})
            .catch((err) => {
                history.push("/loginPage");
            });
    }, []);
    return (
        <ThemeProvider theme={theme}>
            <Background6>
                <div className={classes.appMain}>
                    <BookAdminPage />
                </div>
            </Background6>
        </ThemeProvider>
    );
}

export default Main;
