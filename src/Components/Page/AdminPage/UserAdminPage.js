import React, { useState, useEffect } from "react";
import {
    Paper,
    makeStyles,
    TableBody,
    TableRow,
    TableCell,
    Toolbar,
    InputAdornment,
    Box,
    TableHead,
} from "@material-ui/core";
import useTable from "./components/useTable";
import Controls from "./components/controls/Controls";
import { Search } from "@material-ui/icons";
import Background6 from "../../Template/Background2/Background2";
import UserForm from "./UserForm";
import AddIcon from "@material-ui/icons/Add";
import Popup from "./components/Popup";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useLoader } from "../../../Context/LoaderProvider";
import styles from "./styles.module.scss";
import c from "classnames";
import { api } from "../../../env";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
    searchInput: {
        width: "80%",
        marginLeft: 15,
    },
    containerUser: {
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        paddingTop: 10,
        marginTop: 100,
        position: "fixed",
        zIndex: 5,
        width: "100%",
        //backgroundColor: 'green',
        alignItems: "center",
    },
    newButton: {
        position: "absolute",
        right: "10px",
    },
}));

export default function UserAdminPage() {
    const { t } = useTranslation();

    const userHeadCells = [
        { id: "stt", label: "Stt", disableSorting: true },
        { id: "id", label: "ID" },
        { id: "name", label: t("User Name") },
        { id: "address", label: t("Address"), disableSorting: true },
        { id: "email", label: "Email" },
    ];

    const history = useHistory();
    const { turnOnLoader, turnOffLoader } = useLoader();
    const classes = useStyles();
    const [filterFn, setFilterFn] = useState({
        fn: (items) => {
            return items;
        },
    });
    const [users, setUsers] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);

    const tableUser = useTable(users, userHeadCells, filterFn);

    const axios = require("axios");
    const token = window.localStorage.getItem("user");
    async function getUsers() {
        try {
            turnOnLoader();
            const response = await axios.get(`${api}manage/get-user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(response.data);
            // turnOffLoader();
        } catch (error) {
            console.error(error);
            history.push("/login");
            // turnOffLoader();
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    const addOrEdit = (user, resetForm) => {
        turnOnLoader();
        axios
            .post(
                `${api}auth/register`,
                {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    password_confirm: user.password_confirm,
                    address: user.address,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err.response.data))
            .finally(() => turnOffLoader());

        resetForm();
        setOpenPopup(false);
        getUsers();
    };
    const handleSearch = (e) => {
        let target = e.target;
        setFilterFn({
            fn: (items) => {
                if (target.value == "") return items;
                else
                    return items.filter((x) =>
                        x.name.toLowerCase().includes(target.value)
                    );
            },
        });
    };
    useEffect(() => {
        turnOnLoader();
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
            })
            .finally(() => turnOffLoader());
    }, []);
    return (
        <Background6>
            <div className={c(classes.containerUser, styles.containerUser)}>
                <div style={{ width: "70%" }}>
                    <h2 style={{ marginBottom: 15 }}>{t("Manage Users")}</h2>
                    <Toolbar>
                        <Controls.Input
                            label={t("Search User")}
                            className={classes.searchInput}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                            onChange={handleSearch}
                        />

                        <Controls.Button
                            text={t("Add New")}
                            variant="outlined"
                            startIcon={<AddIcon />}
                            className={classes.newButton}
                            onClick={() => {
                                history.push("/addMemberPage");
                            }}
                        />
                    </Toolbar>

                    <tableUser.TblContainer>
                        <tableUser.TblHead />
                        <TableBody>
                            {tableUser
                                .recordsAfterPagingAndSorting()
                                .map((item, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell
                                            algin="left"
                                            size="small"
                                            style={{
                                                width: 30,
                                            }}
                                        >
                                            {index}
                                        </TableCell>
                                        <TableCell
                                            algin="left"
                                            size="small"
                                            style={{
                                                width: 30,
                                            }}
                                        >
                                            {item.id}
                                        </TableCell>
                                        <TableCell
                                            size="small"
                                            style={{
                                                width: 200,
                                            }}
                                        >
                                            {item.name}
                                        </TableCell>
                                        <TableCell
                                            size="small"
                                            style={{
                                                width: 350,
                                            }}
                                        >
                                            {item.address}
                                        </TableCell>
                                        <TableCell
                                            size="small"
                                            style={{
                                                width: 250,
                                            }}
                                        >
                                            {item.email}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </tableUser.TblContainer>

                    <tableUser.TblPagination />
                </div>
            </div>
            {/* <Popup
                title={t("User Form")}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                size="small"
            >
                <UserForm addOrEdit={addOrEdit} />
            </Popup> */}
        </Background6>
    );
}
