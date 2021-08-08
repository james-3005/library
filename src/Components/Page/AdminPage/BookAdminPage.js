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
        width: "75%",
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
    { id: "author", label: "Author", disableSorting: true },
    { id: "date", label: "publishing date" },
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
    const { turnOnLoader, turnOffLoader } = useLoader();
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

    const options = [
        "Tiểu thuyết",
        "Truyện tranh",
        "Ngôn tình",
        "Kinh tế",
        "Khoa học",
    ];

    return (
        <div className={c(styles.mainContainer, styles.hideScroll)}>
            {/* <div className={c(styles.childcom, styles.hideScroll)}>
                <Controls.Select
                    label="Category"
                    name="type_id"
                    size="small"
                    //value={values.type_id}
                    //onChange={handleInputChange}
                    //error={errors.email}
                    options={options}
                />

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        inputVariant="outlined"
                        label="năm xuất bản"
                        views={["year"]}
                        //format="yyyy/mm/dd"
                        name="year"
                        //value={value}
                        //onChange={date =>onChange(convertToDefEventPara(name,date))}
                        size="small"
                        className={classes.yearPicker}
                    />
                </MuiPickersUtilsProvider>

                <Controls.Input
                    label="Theo tên sách"
                    size="small"
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

                <Controls.Input
                    label="Theo tên sách"
                    size="small"
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

                <Controls.Input
                    label="Theo tên sách"
                    size="small"
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
                <Controls.Input
                    label="Theo tên sách"
                    size="small"
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

                <Controls.Input
                    label="Theo tên tác giả"
                    size="small"
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
            </div> */}
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
                                            style={{
                                                width: "1%",
                                            }}
                                        >
                                            {index}
                                        </TableCell>
                                        <TableCell
                                            algin="left"
                                            size="small"
                                            style={{
                                                width: "1%",
                                            }}
                                        >
                                            {item.book_id}
                                        </TableCell>
                                        <TableCell
                                            size="small"
                                            algin="left"
                                            style={{ width: "35%" }}
                                        >
                                            {item.name_book}
                                        </TableCell>
                                        <TableCell
                                            size="small"
                                            style={{ width: "10%" }}
                                        >
                                            {item.type_id}
                                        </TableCell>
                                        <TableCell
                                            size="small"
                                            style={{ width: "20%" }}
                                        >
                                            {item.author}
                                        </TableCell>
                                        <TableCell
                                            size="small"
                                            style={{ width: "20%" }}
                                        >
                                            {item.publication_date}
                                        </TableCell>
                                        <TableCell
                                            size="small"
                                            style={{ width: "24%" }}
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
                <BookForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
            </Popup>
        </div>
    );
}
