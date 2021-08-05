import React, { useEffect, useState } from 'react'
import BookForm from "./BookForm";
//import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Box, TableHead } from '@material-ui/core';
import useTable from "./components/useTable";
//import * as employeeService from "../../services/employeeService";
import Controls from "./components/controls/Controls";
import { Search, SlowMotionVideoOutlined } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "./components/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import ActionFindInPage from 'material-ui/svg-icons/action/find-in-page';
import moment from 'moment';


const useStyles = makeStyles(theme => ({
    tableBox: {
        
    },
    searchInput: {
        width: '75%',
        borderColor: "#8DC6F2"
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))

const headCells = [
    {id: 'stt', label: 'stt', disableSorting: true},
    { id: 'book_id', label: 'ID' },
    { id: 'name_book', label: 'Book Name' },
    { id: 'type_id', label: 'Category' },
    { id: 'author', label: 'Author', disableSorting: true },
    {id: 'date', label: 'publishing date'},
    {id: 'action', label: "actions", disableSorting: true}
]

export default function BookAdminPage() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [deletedId, setDeletedId] = useState(0)

    const axios = require('axios');
    async function getBooks() {
        try {
          const response = await axios.get('https://library-mini.xyz/api/v1/book');
          console.log(response.data.data);
          setRecords(response.data.data);
        } catch (error) {
          console.error(error);
        }
      }

      useEffect(() => {
          getBooks();
      },[]) //records

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);


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
    const openDeleteDialog = id => {
        setDeletedId(id)
        setOpenDialog(true)
    }

    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbGlicmFyeS1taW5pLnh5elwvYXBpXC92MVwvYXV0aFwvbG9naW4iLCJpYXQiOjE2MjgxMzg1NzgsImV4cCI6MTYyODE0MjE3OCwibmJmIjoxNjI4MTM4NTc4LCJqdGkiOiJYbWI4UEpBNFhhd2dYcDNuIiwic3ViIjo0LCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3Iiwicm9sZV9pZCI6MX0.VhNRXTxZDhUI2YXT85blh8vFXug8cJbJU4j-MDlJD6E";

    const deleteBook = (id) => {
        axios.delete(`https://library-mini.xyz/api/v1/book/${id}`, {
            data: {
                book_id: id
            },
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((result) => {console.log(result); getBooks()})
        
    }

    const addOrEdit = (book, resetForm) => {
        
        // const checkBook = axios.get(`https://library-mini.xyz/api/v1/book/3`)
        // .then((result) => console.log())
        // .catch((err) => console.log(err))
        // if(checkBook.data.data == [])
        if (book.book_id == 0) {
            console.log(book)
            axios.post(
                "https://library-mini.xyz/api/v1/book",
                {
                    type_id: "1",
                    name_book: book.name_book,
                    author: book.author,
                    translator: book.translator,
                    publisher: "none",
                    publication_date: moment(book.publication_date).format("YYYY-MM-DD"),
                    price: book.price,
                    isbn: "234567892",
                    review: book.review,
                    book_image: "null",
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err.response.data));
        } else {
            axios.post(
                `https://library-mini.xyz/api/v1/book/${book.book_id}`,
                {
                    name_book: "dsa",
                    type_id: "1",
                    author: "das",
                    translator: "none",
                    publisher: "2020-02-20",
                    publication_date: "2020-02-20",
                    price: "12.2",
                    isbn: "1234567892",
                    review: "sac ve",
                    book_image: "null",
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err.response.data));
        }
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        getBooks()
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    return (
        <div style={{width: '70%', flexDirection: 'column' , marginLeft: 200}}>
            
            <Box display="flex" flexDirection="column" className={useStyles.tableBox}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10
                }} >
                    <Controls.FilterItem title={"Tổng số đơn"} amount={44} imgSource={"/image/svg/filterTSD.svg"} />
                    <Controls.FilterItem title={"Đang mượn"} amount={44} imgSource={"/image/svg/filterDangMuon.svg"}/>
                    <Controls.FilterItem title={"Đã trả"} amount={44} imgSource={"/image/svg/filterDaTra.svg"} />
                </div>

                <Toolbar>
                    <Controls.Input
                        label="Search Books"
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
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody style={{width: "100%"}}>
                        {
                            recordsAfterPagingAndSorting().map((item, index) =>
                                (<TableRow key={item.id} style={{  height: "45%"}}>
                                    <TableCell 
                                        algin = 'left' 
                                        size="small" 
                                        style={{
                                            width: "1%",
                                    }}>
                                        {index}
                                    </TableCell>
                                    <TableCell 
                                    algin = 'left' 
                                    size="small"
                                    style={{
                                        width: "1%",
                                    }}>
                                        {item.book_id}
                                    </TableCell>
                                    <TableCell size="small" algin = 'left' style={{width: "35%",}}>{item.name_book}</TableCell>
                                    <TableCell size="small" style={{width: "10%",}}>{item.type_id}</TableCell>
                                    <TableCell size="small" style={{width: "20%",}}>{item.author}</TableCell>
                                    <TableCell size="small" style={{width: "20%",}}>{item.publication_date}</TableCell>
                                    <TableCell size="small" style={{width: "24%",}}>
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => { openInPopup(item) }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            color="secondary"
                                            onClick= {() => {openDeleteDialog(item.book_id)}}
                                            >
                                            
                                            <CloseIcon fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Box>
            <Controls.Dialogg 
                title = "Xóa Sách"
                content = "Bạn có thực sự muốn xóa thông tin cuốn sách này?"
                openDialog = {openDialog}
                setOpenDialog = {setOpenDialog}
                deletedId = {deletedId}
                actionCf = {deleteBook}
            />
            <Popup
                title="Book Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
               
                <BookForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
        </div>
    )
}
