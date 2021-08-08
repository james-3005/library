import React, { useEffect, useState } from "react";
import BookForm from "./BookForm";
//import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
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
    TextField,
    Button
} from "@material-ui/core";
import useTable from "./components/useTable";
import Controls from "./components/controls/Controls";
import { Search, SlowMotionVideoOutlined } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import Popup from "./components/Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";
import { useHistory } from "react-router-dom";
import styles from "./BookAdminPage.module.scss";
import c from "classnames";
import { useLoader } from "../../../Context/LoaderProvider";
import axios from "axios";
import Dialog from '../MainPage/Dialog';


const useStyles = makeStyles((theme) => ({
    tableBox: {
        paddingLeft: 200,
    },
    searchInput: {
        width: "100%",
        borderColor: "#8DC6F2",
        //backgroundColor: 'red',
    },
    searchInputByName: {
        width: "65%",
        borderColor: "#8DC6F2",
        //backgroundColor: 'red',
    },
    yearPicker: {
        width: "100%",
        borderColor: "#8DC6F2",
        //backgroundColor: 'red',
    },
    newButton: {
        position: "absolute",
        right: "10px",
    },
}));

const headCells = [
    { id: "stt", label: "stt", disableSorting: true },
    { id: "book_id", label: "ID" },
    { id: "name_book", label: "Book Name" },
    { id: "type_id", label: "Category" },
    { id: "country_id", label: "Country" },
    { id: "author", label: "Author", disableSorting: true },
    { id: "pulication_date", label: "Pulication Date" },
    { id: "action", label: "actions", disableSorting: true },
];

export default function BookAdminPage() {
    const token = window.localStorage.getItem("user");
    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [records, setRecords] = useState([]);
    const [filterFn, setFilterFn] = useState({
        fn: (items) => {
            return items;
        },
    });
    const [openPopup, setOpenPopup] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [deletedId, setDeletedId] = useState(0);
    const [open, setOpen] = React.useState(false);

    const { turnOnLoader, turnOffLoader } = useLoader();

    const [author, setAuthor] = React.useState("");
    const [year, setYear] = React.useState("");
    const [country, setCountry] = React.useState("");
    const [translator, setTranslator] = React.useState("");
    const [type1, setType1] = React.useState("All");
    const [type2, setType2] = React.useState("All");
    const [type3, setType3] = React.useState("All");

    async function getBooks() {
        try {
            turnOnLoader();
            const response = await axios.get(
                "https://library-mini.xyz/api/v1/book?"
            );
            turnOffLoader();
            setRecords(response.data.books);
        } catch (error) {
            console.error(error);
            turnOffLoader();
        }
    }

    useEffect(() => {
        getBooks();
    }, []); //records

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
    } = useTable(records, headCells, filterFn);

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
    const openDeleteDialog = (id) => {
        setDeletedId(id);
        setOpenDialog(true);
    };

    const deleteBook = (id) => {
        axios
            .delete(`https://library-mini.xyz/api/v1/book/${id}`, {
                data: {
                    book_id: id,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                console.log(result);
                getBooks();
            });
    };
    const history = useHistory();
    const addOrEdit = (book, resetForm) => {
        if (book.book_id == 0) {
            turnOnLoader();
            axios
                .post(
                    "https://library-mini.xyz/api/v1/book",
                    {
                        type_id: "1",
                        name_book: book.name_book,
                        author: book.author,
                        translator: book.translator,
                        publisher: "none",
                        publication_date: moment(book.publication_date).format(
                            "YYYY-MM-DD"
                        ),
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
                .catch((err) => console.log(err.response.data))
                .finally(() => turnOffLoader());
        } else {
            turnOnLoader();
            axios
                .post(
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
                .catch((err) => console.log(err.response.data))
                .finally(() => turnOffLoader());
        }
        resetForm();
        setRecordForEdit(null);
        setOpenPopup(false);
        getBooks();
    };

    const openInPopup = (item) => {
        setRecordForEdit(item);
        setOpenPopup(true);
    };
    useEffect(() => {
        turnOnLoader();
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
            })
            .finally(() => turnOffLoader());
    }, []);

    const handleClose = (value) => {
        setOpen(false);
    };

    const Filter = () => {
        turnOnLoader();
        let exptype = 1;
        if (type3 !== "All") exptype = type3;
        else if (type2 !== "All") exptype = type2;
        console.log(exptype);
        axios
            .get(
                `http://library-mini.xyz/api/v1/book?author=${author}&publishing_year=${year}&translator=${translator}&code_ddc=${
                    exptype - 1
                }&country_name=${country === "All" ? "" : country}`
            )
            .then((res) => {
                setRecords(res.data.books);
            })
            .finally(() => turnOffLoader());
    };

    return (
        <div className={c(styles.mainContainer, styles.hideScroll)}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingTop: 10,
                }}
                className={styles.hideScroll}
            >
                <Toolbar>
                    <Controls.Input
                        label="Theo tên sách"
                        className={classes.searchInputByName}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                        onChange={handleSearch}
                    />

                    <Button
                        variant="outlined"
                        color="primary"
                        style={{ height: 30, marginLeft: 25 }}
                        onClick={() => {setOpen(true)}}
                    >
                        <img src="/image/svg/filter.svg" alt="" />
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        style={{ height: 30, marginLeft: 25 }}
                        onClick={() => {getBooks()}}
                    >
                        <img src="/image/svg/filterclear.svg" alt="" />
                    </Button>

                    <Controls.Button
                        text="Add New"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => {
                            setOpenPopup(true);
                            setRecordForEdit(null);
                        }}
                    />
                </Toolbar>
                <div
                    style={{
                        height: 450,
                        overflow: "scroll",
                    }}
                    className={styles.hideScroll}
                >
                    <TblContainer>
                        <TblHead />
                        <TableBody style={{ width: "100%", height: "100%" }}>
                            {recordsAfterPagingAndSorting().map(
                                (item, index) => (
                                    <TableRow
                                        key={item.id}
                                        style={{ height: "45%" }}
                                    >
                                        <TableCell
                                            algin="left"
                                            size="small"
                                            
                                        >
                                            {index}
                                        </TableCell>
                                        <TableCell
                                            algin="left"
                                            size="small"
                                            
                                        >
                                            {item.book_id}
                                        </TableCell>
                                        <TableCell
                                            size="small"
                                            algin="left"
                                            style={{ width: 300 }}
                                        >
                                            {item.name_book}
                                        </TableCell>
                                        <TableCell
                                            size="small"
                                            style={{ width: 20 }}
                                        >
                                            {item.type_id}
                                        </TableCell>
                                        <TableCell
                                            size="small"
                                            style={{ width: 20 }}
                                        >
                                            {item.country_id}
                                        </TableCell>
                                        
                                        <TableCell
                                            size="small"
                                            algin="left"
                                            style={{ width: 130 }}
                                        >
                                            {item.author}
                                        </TableCell>
                                        <TableCell
                                            size="small"
                                            //style={{ width: "20%" }}
                                        >
                                            {item.publication_date}
                                        </TableCell>
                                        <TableCell
                                            size="small"
                                            //style={{ width: "24%" }}
                                        >
                                            <Controls.ActionButton
                                                color="primary"
                                                onClick={() => {
                                                    openInPopup(item);
                                                }}
                                            >
                                                <EditOutlinedIcon fontSize="small" />
                                            </Controls.ActionButton>
                                            <Controls.ActionButton
                                                color="secondary"
                                                onClick={() => {
                                                    openDeleteDialog(
                                                        item.book_id
                                                    );
                                                }}
                                            >
                                                <CloseIcon fontSize="small" />
                                            </Controls.ActionButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            )}
                        </TableBody>
                    </TblContainer>
                    <TblPagination />
                </div>
            </div>
            <Controls.Dialogg
                title="Xóa Sách"
                content="Bạn có thực sự muốn xóa thông tin cuốn sách này?"
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                deletedId={deletedId}
                actionCf={deleteBook}
            />
            <Popup
                title="Book Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <BookForm 
                recordForEdit={recordForEdit}
                addOrEdit={addOrEdit} 
                 />
            </Popup>
            <Dialog
                    open={open}
                    onClose={handleClose}
                    author={author}
                    setAuthor={setAuthor}
                    year={year}
                    setYear={setYear}
                    type1={type1}
                    setType1={setType1}
                    type2={type2}
                    setType2={setType2}
                    type3={type3}
                    setType3={setType3}
                    translator={translator}
                    setTranslator={setTranslator}
                    country={country}
                    setCountry={setCountry}
                    Filter={Filter}
                />
        </div>
    );
}
