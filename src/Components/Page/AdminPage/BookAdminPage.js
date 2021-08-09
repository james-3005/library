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
    Button,
} from "@material-ui/core";
import useTable from "./components/useTable";
import Controls from "./components/controls/Controls";
import { Bookmark, Search, SlowMotionVideoOutlined } from "@material-ui/icons";
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
import Dialog from "../MainPage/Dialog";
import { api } from "../../../env";
import { useTranslation } from "react-i18next";
import { useFilterBook } from "../../../Context/FilterBookProvider";
import { useNoti } from "../../../Context/NotificationProvider";
const useStyles = makeStyles((theme) => ({
    tableBox: {
        //paddingLeft: 200,
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

export default function BookAdminPage() {
    const { t } = useTranslation();

    const headCells = [
        { id: "stt", label: "stt", disableSorting: true },
        { id: "book_id", label: "ID" },
        { id: "name_book", label: t("Book Name") },
        { id: "type_id", label: t("Category") },
        { id: "country_id", label: t("Country") },
        { id: "author", label: t("Author"), disableSorting: true },
        { id: "pulication_date", label: t("Pulication Date") },
        { id: "action", label: t("Action"), disableSorting: true },
    ];

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
    // const {allBook, allBookCurrent}= useFilterBook
    const [author, setAuthor] = React.useState("");
    const [year, setYear] = React.useState("");
    const [country, setCountry] = React.useState("");
    const [translator, setTranslator] = React.useState("");
    const [type1, setType1] = React.useState("All");
    const [type2, setType2] = React.useState("All");
    const [type3, setType3] = React.useState("All");
    const [valueSearch, setValueSearch] = useState("");
    const { addNoti } = useNoti();
    async function getBooks() {
        try {
            turnOnLoader();
            const response = await axios.get(`${api}book?`);
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
    } = useTable(
        records
            ? records.filter((item) =>
                  item["name_book"]
                      .toLowerCase()
                      .includes(valueSearch.toLowerCase())
              )
            : [],
        headCells,
        filterFn
    );

    const handleSearch = (e) => {
        setValueSearch(e.target.value);
    };
    const openDeleteDialog = (id) => {
        setDeletedId(id);
        setOpenDialog(true);
    };

    const deleteBook = (id) => {
        axios
            .delete(`${api}book/${id}`, {
                data: {
                    book_id: id,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                console.log(result);
                addNoti("Delete book success", "success");
                getBooks();
            })
            .catch((err) => addNoti("Delete book fail", "fail"));
    };
    const history = useHistory();
    const addOrEdit = (book, resetForm) => {
        console.log(book);
        var formdata = new FormData();
        formdata.append("name_book", book.name_book);
        formdata.append("type_id", book.type_id);
        formdata.append("author", book.author);
        formdata.append("translator", book.translator);
        formdata.append("publisher", book.publisher);
        formdata.append(
            "publication_date",
            moment(book.publication_date).format("YYYY-MM-DD")
        );
        formdata.append("price", book.price);
        formdata.append("isbn", "1234567891");
        formdata.append("country_id", book.country_id);
        formdata.append("review", book.review);
        if(book.book_image instanceof File) {
            formdata.append("book_image", book.book_image, book.book_image.name);
        }
        

        var requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        if (book.book_id == 0) {
            turnOnLoader();
            fetch("http://library-mini.xyz/api/v1/book", requestOptions)
                .then((response) => response.text())
                .then((result) => {
                    addNoti("Add book success", "success");
                    getBooks();
                })
                .catch((error) => {
                    console.log("error", error);
                    addNoti("Add book fail, check infomation", "fail");
                })
                .finally(() => {
                    turnOffLoader();
                });
        }
        else {
            turnOnLoader();
            fetch(`http://library-mini.xyz/api/v1/book/${book.book_id}`, requestOptions)
                .then((res) => {
                    addNoti("Edit book success", "success");
                    getBooks();
                })
                .catch((err) => {
                    addNoti("Edit book fail, check infomation", "fail");
                    console.log(err.response.data)
                })
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

    const handleClose = (value) => {
        setOpen(false);
    };

    const Filter = () => {
        turnOnLoader();
        let exptype = 1;
        if (type3 !== "All") exptype = type3;
        else if (type2 !== "All") exptype = type2;
        if (exptype == "All") exptype = 1;
        axios
            .get(
                `${api}book?author=${author}&publishing_year=${year}&translator=${translator}&code_ddc=${
                    exptype - 1
                }&country_id=${country === "All" ? "" : country}`
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
                <h2 style={{ marginTop: 5, marginBottom: 15 }}>
                    {t("Manage book")}
                </h2>
                <Toolbar>
                    <Controls.Input
                        label={t("Search for book name")}
                        className={classes.searchInputByName}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                        value={valueSearch}
                        onChange={(e) => handleSearch(e)}
                    />

                    <Button
                        variant="outlined"
                        color="primary"
                        style={{ height: 30, marginLeft: 25 }}
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        <img src="/image/svg/filter.svg" alt="" />
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        style={{ height: 30, marginLeft: 25 }}
                        onClick={() => {
                            getBooks();
                        }}
                    >
                        <img src="/image/svg/filterclear.svg" alt="" />
                    </Button>

                    <Controls.Button
                        text={t("Add New")}
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
                        width: 1100
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
                                        <TableCell algin="left" size="small" style={{ width: 20 }}>
                                            {index}
                                        </TableCell>
                                        <TableCell algin="left" size="small" style={{ width: 20 }}>
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
                                            style={{ width: 140 }}
                                        >
                                            {item.publication_date}
                                        </TableCell>
                                        <TableCell
                                            size="small"
                                            style={{ width: 70 }}
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
                title={t("Delete book")}
                content={t("Do you want to delete this book?")}
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                deletedId={deletedId}
                actionCf={deleteBook}
            />
            <Popup
                title={t("Book Form")}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <BookForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
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
