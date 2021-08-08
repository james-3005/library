import React, { useState, useEffect } from 'react'
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Box, TableHead } from '@material-ui/core';
import useTable from "../AdminPage/components/useTable";
import Controls from '../AdminPage/components/controls/Controls'
import { Search } from "@material-ui/icons";
import Background6 from '../../Template/Background6/Background6';
import AddIcon from "@material-ui/icons/Add";
import DoneIcon from '@material-ui/icons/Done';
import BorrowForm from './BorrowForm';
import Popup from "../AdminPage/components/Popup";
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
        width: "75%",
        paddingLeft: 200,
        
      },
      newButton: {
        position: "absolute",
        right: "10px",
    },
}))


const userHeadCells = [
    {id: 'stt', label: 'Stt', disableSorting: true},
    { id: 'name', label: 'Name',disableSorting: true },
    { id: 'name_book', label: 'Book Name' },
    { id: 'from_date', label: 'From Date' },
    { id: 'to_date', label: 'To Date' },
    { id: 'promissory_date', label: 'Promissory Date' },
    { id: 'status_id', label: 'Status', disableSorting: true },
    {id: 'action', label: 'Action', disableSorting: true}
]

const brr = [];

export default function HistoryPage() {

    const classes = useStyles();
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [borrows, setBorrows] = useState([])
    const [borrows2, setBorrows2] = useState([])
    const [openPopup, setOpenPopup] = useState(false)
    const [returnId, setReturnId] = useState()
    const [openDialog, setOpenDialog] = useState(false)

    const axios = require("axios");
    const token = window.localStorage.getItem("user");
    async function getBorrows() {
        try {
            const response = await axios.get(
                "http://library-mini.xyz/api/v1/manage/get-borrowing?",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setBorrows(response.data.borrowing);
            setBorrows2(response.data.borrowing);
            console.log(response.data.borrowing);
        } catch (error) {
            console.error(error.data);
        }
    }

    useEffect(() => {
        getBorrows();
    }, []); 

    const addOrEdit = (borrow, resetForm) => {
        console.log(borrow);
        axios.post(
                "http://library-mini.xyz/api/v1/manage/borrowing-book",
                {
                   book_id: parseInt(borrow.book_id, 10),
                   borrower_id: parseInt(borrow.borrower_id, 10),
                   from_date: moment(borrow.from_date).format(
                    "YYYY-MM-DD h:mm:ss"
                ),
                   promissory_date: moment(borrow.promissory_date).format(
                    "YYYY-MM-DD h:mm:ss"
                ),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                console.log(res.data);
                getBorrows();
            })
            .catch((err) => console.log(err.response.data));
        
        resetForm();
        setOpenPopup(false);
        
    };

    const tableUser = useTable(borrows,userHeadCells,filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.book[0].name_book.toLowerCase().includes(target.value))
            }
        })
    }

   async function filter(cmd) {
        if (cmd == 0) {
            getBorrows();
        } else if (cmd == 1) {
            try {
                const response = await axios.get(
                    "http://library-mini.xyz/api/v1/manage/get-borrowing?status_id=1",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setBorrows(response.data.borrowing)
                console.log(response.data.borrowing);
            } catch (error) {
                console.error(error.data);
            }
        } else {
            try {
                const response = await axios.get(
                    "http://library-mini.xyz/api/v1/manage/get-borrowing?status_id=2",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setBorrows(response.data.borrowing)
                console.log(response.data.borrowing);
            } catch (error) {
                console.error(error.data);
            }
        }
    }

    function getAmount(cmd) {
        if (cmd == 0) {
            
            return borrows2.length;
        } else if (cmd == 1) {
            const dm = borrows2.filter((item) => item.status_id == 1);
            return dm.length;
        } else {
            const dt = borrows2.filter((item) => item.status_id == 2);
            return dt.length;
        }
    }

    const openReturnDialog = (id) => {
        setReturnId(id)
        setOpenDialog(true)
    }

    const confirm = (id) => {
        axios.get(
            `https://library-mini.xyz/api/v1/manage/borrowing-book/return-book/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then(() => getBorrows())
        .catch((err) => console.log(err))
    }

    return (
        <Background6>
            <div className={classes.containerUser}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: 10,
                    }}
                >
                    <Controls.FilterItem
                        title={"Tổng số đơn"}
                        amount={getAmount(0)}
                        imgSource={"/image/svg/filterTSD.svg"}
                        action={() => filter(0)}
                    />
                    <Controls.FilterItem
                        title={"Đang mượn"}
                        amount={getAmount(1)}
                        imgSource={"/image/svg/filterDangMuon.svg"}
                        action={() => filter(1)}
                    />
                    <Controls.FilterItem
                        title={"Đã trả"}
                        amount={getAmount(2)}
                        imgSource={"/image/svg/filterDaTra.svg"}
                        action={() => filter(2)}
                    />
                </div>
            
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
                            setOpenPopup(true);
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
                      (<TableRow key={item.book_id}>
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
                               width: "15%",
                           }}
                          >{item.user[0].name}</TableCell>
                          <TableCell size="small" style={{
                               width: "30%",
                           }}>{item.book[0].name_book}</TableCell>
                          <TableCell size="small" style={{
                               width: "15%",
                           }}>{moment(item.from_date).format(
                            "YYYY-MM-DD h:mm A")}</TableCell>
                          <TableCell size="small" style={{
                               width: "15%",
                           }}>{moment(item.to_date).format(
                            "YYYY-MM-DD h:mm A")}</TableCell>
                          <TableCell size="small"style={{
                               width: "15%",
                           }}>{moment(item.promissory_date).format(
                            "YYYY-MM-DD h:mm A")}</TableCell>
                          <TableCell size="small" style={{
                               width: "1%",
                           }}>{item.status_id}</TableCell>
                           <TableCell size="small" style={{
                               width: "1%",
                           }}>
                                {
                                    item.status_id == 1?
                                    <Controls.ActionButton
                                    color="primary"
                                    onClick={() => {
                                        openReturnDialog(item.borrowing_book_id)
                                    }}
                                >
                                    <DoneIcon fontSize="small" />
                                </Controls.ActionButton>
                                : <p>đã trả</p>
                                }
                          
                           </TableCell>
                           
                        </TableRow>
                          ))
                    }
                </TableBody>
            </tableUser.TblContainer>
            
            <tableUser.TblPagination />
            {/* </div> */}
            
            </div>
            <Controls.Dialogg
                title="Xác nhận trả sách"
                content="Bạn muốn xác nhận cuốn sách này đã được trả?"
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                deletedId={returnId}
                actionCf={confirm}
            />
            <Popup
                title="Borrow Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                size="small"
            >
                <BorrowForm addOrEdit={addOrEdit} />
            </Popup>
        </Background6>
    )
}
