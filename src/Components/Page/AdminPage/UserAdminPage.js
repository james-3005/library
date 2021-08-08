import React, { useState, useEffect } from 'react'
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Box, TableHead } from '@material-ui/core';
import useTable from "./components/useTable";
import Controls from "./components/controls/Controls";
import { Search } from "@material-ui/icons";
import Background6 from '../../Template/Background6/Background6';
import UserForm from './UserForm';
import AddIcon from "@material-ui/icons/Add";
import Popup from "./components/Popup";
import moment from "moment";


const useStyles = makeStyles(theme => ({
    searchInput: {
        width: '80%',
        marginLeft: 15
    },
    containerUser: {
        //alignItems: 'center',
        flexDirection: 'column',
        height: window.height,
        flex: 1,
        overflowY: 'scroll',
        paddingTop: 50,
        position: "fixed",
        zIndex: 5,
        top:0,
        left: 0,
        right: 0,
        bottom: 0,
        marginTop: 40,
        width: "65%",
        paddingLeft: 230,
        
      },
      newButton: {
        position: "absolute",
        right: "10px",
    },
}))


const userHeadCells = [
    {id: 'stt', label: 'Stt', disableSorting: true},
    { id: 'id', label: 'ID' },
    { id: 'name', label: 'User Name' },
    {id: 'address', label: 'Address', disableSorting: true},
    { id: 'email', label: 'Email' },
    
]

export default function UserAdminPage() {

    const classes = useStyles();
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [users, setUsers] = useState([])
    const [openPopup, setOpenPopup] = useState(false)

    const tableUser = useTable(users,userHeadCells,filterFn);

    const axios = require("axios");
    const token = window.localStorage.getItem("user");
    async function getUsers() {
        try {
            const response = await axios.get(
                "http://library-mini.xyz/api/v1/manage/get-user",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            setUsers(response.data)
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUsers();
    }, []); 

    const addOrEdit = (user, resetForm) => {
            axios
                .post(
                    "https://library-mini.xyz/api/v1/auth/register",
                    {
                       id: user.id,
                       name: user.name,
                       email: user.email,
                       password: user.password,
                       password_confirm: user.password_confirm,
                       address: user.address
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((res) => console.log(res.data))
                .catch((err) => console.log(err.response.data));
         
        resetForm();
        setOpenPopup(false);
        getUsers();
    };
    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.name.toLowerCase().includes(target.value))
            }
        })
    }

    return (
        <Background6>
            <div className={classes.containerUser}>
            <Toolbar>
                    <Controls.Input
                        label="Search User"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />

                    <Controls.Button
                        text="Add New"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => {
                            setOpenPopup(true)
                        }}
                    />
                </Toolbar>
            {/* <div style={{
                height: 450,
                overflow: 'scroll'
            }} > */}
            <tableUser.TblContainer >
                <tableUser.TblHead />
                <TableBody>
                    {
                      tableUser.recordsAfterPagingAndSorting().map((item, index) =>
                      (<TableRow key={item.id}>
                          <TableCell 
                          algin="left"
                          size="small"
                          style={{
                              width: "1%",
                          }}
                          >{index}</TableCell>
                          <TableCell
                           algin="left"
                           size="small"
                           style={{
                               width: "1%",
                           }}
                          >{item.id}</TableCell>
                          <TableCell size="small" style={{
                               width: "20%",
                           }}>{item.name}</TableCell>
                          <TableCell size="small" style={{
                               width: "30%",
                           }}>{item.address}</TableCell>
                          <TableCell size="small" style={{
                               width: "20%",
                           }}>{item.email}</TableCell>
                        </TableRow>
                          ))
                    }
                </TableBody>
            </tableUser.TblContainer>
            
            <tableUser.TblPagination />
            {/* </div> */}
            </div>
            <Popup
                title="User Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                size="small"
            >
                <UserForm addOrEdit={addOrEdit} />
            </Popup>
        </Background6>
    )
}