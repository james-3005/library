import React, { useState } from 'react'
import BookForm from "./BookForm";
//import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Box } from '@material-ui/core';
import useTable from "./components/useTable";
//import * as employeeService from "../../services/employeeService";
import Controls from "./components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "./components/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles(theme => ({
    tableBox: {
        
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))

const headCells = [
    {id: 'stt', label: '#stt'},
    { id: 'id', label: '#id' },
    { id: 'name', label: 'Book name' },
    { id: 'category', label: 'Category' },
    { id: 'author', label: 'Author', disableSorting: true },
    {id: 'date', label: 'publishing date'},
    {id: 'action', label: "actions", disableSorting: true}
]

const books = [
    {
        id: "rr",
        name: "aaaaa",
        category: "Tiểu thuyết",
        author: "vtt",
        publishingDate: '2021-12-11',
        imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIT6ea5wT-e2ainq21_nXBrkX02S5-iEg52g&usqp=CAU"
    },
    {
        id: "ii",
        name: "bbbb",
        category: "Tiểu thuyết",
        author: "vtt",
        publishingDate: '22/12/2022',
        imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIT6ea5wT-e2ainq21_nXBrkX02S5-iEg52g&usqp=CAU"
    },
    {
        id: "kjfdjs",
        name: "ccccc",
        category: "Tiểu thuyết",
        author: "vtt",
        publishingDate: '22/12/2022',
        imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIT6ea5wT-e2ainq21_nXBrkX02S5-iEg52g&usqp=CAU"
    },
    {
        id: "kjdsjksd",
        name: "eeee",
        category: "Tiểu thuyết",
        author: "vtt",
        publishingDate: '22/12/2022',
        imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIT6ea5wT-e2ainq21_nXBrkX02S5-iEg52g&usqp=CAU"
    },
    {
        id: "hdhdd",
        name: "dddd",
        category: "Tiểu thuyết",
        author: "vtt",
        publishingDate: '22/12/2022'
    },
    {
        id: "hdhdhd",
        name: "aagga",
        category: "Tiểu thuyết",
        author: "vtt",
        publishingDate: '22/12/2022'
    },
    {
        id: "dhdhd",
        name: "hdgdgaaaaa",
        category: "Tiểu thuyết",
        author: "vtt",
        publishingDate: '22/12/2022'
    },
    {
        id: "dhdhdhd",
        name: "lkiaaaa",
        category: "Tiểu thuyết",
        author: "vtt",
        publishingDate: '22/12/2022'
    },
    {
        id: "iidsi",
        name: "ooiaaaa",
        category: "Tiểu thuyết",
        author: "vtt",
        publishingDate: '22/12/2022'
    },
    {
        id: "dhdhdh",
        name: "ttaaaa",
        category: "Tiểu thuyết",
        author: "vtt",
        publishingDate: '22/12/2022'
    },
    {
        id: "duud",
        name: "lkiooaaa",
        category: "Tiểu thuyết",
        author: "vtt",
        publishingDate: '22/12/2022'
    },
    {
        id: "oiuue",
        name: "ppiaaaa",
        category: "Tiểu thuyết",
        author: "vtt",
        publishingDate: '22/12/2022'
    },
]

export default function AdminPage() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(books)
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)

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

    const addOrEdit = (employee, resetForm) => {
        // if (employee.id == 0)
        //     employeeService.insertEmployee(employee)
        // else
        //     employeeService.updateEmployee(employee)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        //setRecords(employeeService.getAllEmployees())
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    return (
        <div style={{width: '100%'}}>
            {/* <PageHeader
                title="New Employee"
                subTitle="Form design with validation"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            /> */}
            <div style ={{alignItems: 'center', width: '100%'}}>

            
            <Box display="flex" flexDirection="column" className={useStyles.tableBox}>

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
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map((item, index) =>
                                (<TableRow key={item.id}>
                                    <TableCell>{index}</TableCell>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.category}</TableCell>
                                    <TableCell>{item.author}</TableCell>
                                    <TableCell>{item.publishingDate}</TableCell>
                                    <TableCell>
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => { openInPopup(item) }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            color="secondary">
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
            </div>
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
