import React, { useEffect, useLayoutEffect, useState } from "react";
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
import useTable from "../AdminPage/components/useTable";
import Controls from "../AdminPage/components/controls/Controls";
import { Search } from "@material-ui/icons";
import Background6 from "../../Template/Background6/Background6";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    searchInput: {
        width: "80%",
        marginLeft: 15,
    },
    containerUser: {
        //alignItems: 'center',
        flexDirection: "column",
        height: window.height,
        flex: 1,
        overflowY: "scroll",
        paddingTop: 50,
        position: "absolute",
        zIndex: 5,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        marginTop: 40,
        width: "65%",
        paddingLeft: 230,
    },
}));

const userHeadCells = [
    { id: "stt", label: "#stt" },
    { id: "id", label: "#id" },
    { id: "name", label: "User Name" },
    { id: "email", label: "Email" },
];

const uusers = [
    {
        id: "tt",
        name: "asvtttt",
        email: "vtt@gmail.com",
    },
    {
        id: "yttt",
        name: "vtttt",
        email: "vtt@gmail.com",
    },
    {
        id: "dasftdft",
        name: "vttjktt",
        email: "vtt@gmail.com",
    },
    {
        id: "tetv",
        name: "vtttt",
        email: "vtt@gmail.com",
    },
    {
        id: "fasftrt",
        name: "vtttt",
        email: "vtt@gmail.com",
    },
    {
        id: "asdftt",
        name: "vtttt",
        email: "vtt@gmail.com",
    },
    {
        id: "asdftt",
        name: "vtttt",
        email: "vtt@gmail.com",
    },
];

export default function UserAdminPage() {
    const classes = useStyles();
    const [filterFn, setFilterFn] = useState({
        fn: (items) => {
            return items;
        },
    });
    const [users, setUsers] = useState(uusers);
    const history = useHistory();

    const tableUser = useTable(users, userHeadCells, filterFn);

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
    useLayoutEffect(() => {
        axios
            .get("https://library-mini.xyz/api/v1/auth/user-profile", {
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
        <Background6>
            <div className={classes.containerUser}>
                <Toolbar>
                    <Controls.Input
                        label="Search User"
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
                </Toolbar>
                <tableUser.TblContainer>
                    <tableUser.TblHead />
                    <TableBody>
                        {tableUser
                            .recordsAfterPagingAndSorting()
                            .map((item, index) => (
                                <TableRow key={item.id}>
                                    <TableCell>{index}</TableCell>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </tableUser.TblContainer>
                <tableUser.TblPagination />
            </div>
        </Background6>
    );
}
