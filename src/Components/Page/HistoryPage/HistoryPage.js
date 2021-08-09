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
import useTable from "../AdminPage/components/useTable";
import Controls from "../AdminPage/components/controls/Controls";
import { Search } from "@material-ui/icons";
import Background6 from "../../Template/Background3/Background3";
import AddIcon from "@material-ui/icons/Add";
import DoneIcon from "@material-ui/icons/Done";
import BorrowForm from "./BorrowForm";
import Popup from "../AdminPage/components/Popup";
import moment from "moment";
import styles from "../AdminPage/BookAdminPage.module.scss";
import c from "classnames";
import { useLoader } from "../../../Context/LoaderProvider";
import { api } from "../../../env";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
    searchInput: {
        width: "80%",
        marginLeft: 15,
    },
    containerUser: {
        display: "flex",
        //alignItems: 'center',
        flexDirection: "column",
        height: window.height,
        flex: 1,
        overflowY: "scroll",
        //paddingTop: 40,
        position: "fixed",
        zIndex: 5,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        marginTop: 80,
        width: "100%",
        //backgroundColor: 'green',
        alignItems: "center",
    },
    newButton: {
        position: "absolute",
        right: "10px",
    },
}));

const brr = [];

export default function HistoryPage() {
    const { t } = useTranslation();
    const userHeadCells = [
        { id: "stt", label: "Stt", disableSorting: true },
        { id: "name", label: t("User Name"), disableSorting: true },
        { id: "name_book", label: t("Book Name") },
        { id: "from_date", label: t("From Date") },
        { id: "to_date", label: t("To Date") },
        { id: "promissory_date", label: t("Promissory Date") },
        { id: "action", label: t("Action"), disableSorting: true },
    ];

    const { turnOnLoader, turnOffLoader } = useLoader();
    const classes = useStyles();
    const [filterFn, setFilterFn] = useState({
        fn: (items) => {
            return items;
        },
    });
    const [borrows, setBorrows] = useState([]);
    const [borrows2, setBorrows2] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
    const [returnId, setReturnId] = useState();
    const [openDialog, setOpenDialog] = useState(false);
    const [active, setActive] = useState(0);
    const axios = require("axios");
    const token = window.localStorage.getItem("user");
    async function getBorrows() {
        turnOnLoader();
        try {
            const response = await axios.get(`${api}manage/get-borrowing?`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBorrows(response.data.borrowing);
            setBorrows2(response.data.borrowing);
            turnOffLoader();
        } catch (error) {
            console.error(error.data);
            turnOffLoader();
        }
    }

    useEffect(() => {}, []);

    const addOrEdit = (borrow, resetForm) => {
        turnOnLoader();
        axios
            .post(
                `${api}manage/borrowing-book`,
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
            .catch((err) => console.log(err.response.data))
            .finally(() => turnOffLoader());

        resetForm();
        setOpenPopup(false);
    };

    const tableUser = useTable(
        borrows.length != 0 ? borrows : [],
        userHeadCells,
        filterFn
    );

    const handleSearch = (e) => {
        let target = e.target;
        setFilterFn({
            fn: (items) => {
                if (target.value == "") return items;
                else
                    return items.filter((x) =>
                        x.book[0].name_book.toLowerCase().includes(target.value)
                    );
            },
        });
    };
    useEffect(() => {
        filter(active);
    }, [active]);
    async function filter(cmd) {
        if (cmd == 0) {
            getBorrows();
        } else if (cmd == 1) {
            try {
                turnOnLoader();
                const response = await axios.get(
                    `${api}manage/get-borrowing?status_id=1`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setBorrows(response.data.borrowing);
                console.log(response.data.borrowing);
                turnOffLoader();
            } catch (error) {
                console.error(error.data);
                turnOffLoader();
            }
        } else {
            try {
                turnOnLoader();
                const response = await axios.get(
                    `${api}manage/get-borrowing?status_id=2`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setBorrows(response.data.borrowing);
                console.log(response.data.borrowing);
                turnOffLoader();
            } catch (error) {
                console.error(error.data);
                turnOffLoader();
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
        setReturnId(id);
        setOpenDialog(true);
    };

    const confirm = (id) => {
        turnOnLoader();
        axios
            .get(`${api}manage/borrowing-book/return-book/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => getBorrows())
            .catch((err) => console.log(err))
            .finally(() => turnOffLoader());
    };

    return (
        <Background6>
            <div className={c(classes.containerUser, styles.hideScroll)}>
                <div className={styles.font} style={{ width: "75%" }}>
                    <h2>{t("Manage borrowing book")}</h2>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                            padding: 10,
                        }}
                    >
                        <Controls.FilterItem
                            title={t("Total Order")}
                            amount={getAmount(0)}
                            type={1}
                            active={active == 0}
                            action={() => setActive(0)}
                        />
                        <Controls.FilterItem
                            title={t("Borrowing")}
                            amount={getAmount(1)}
                            type={2}
                            active={active == 1}
                            action={() => setActive(1)}
                        />
                        <Controls.FilterItem
                            title={t("Returned")}
                            amount={getAmount(2)}
                            type={3}
                            active={active == 2}
                            action={() => setActive(2)}
                        />
                    </div>

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
                                setOpenPopup(true);
                            }}
                        />
                    </Toolbar>
                    {/* <div style={{
                height: 450,
                overflow: 'scroll'
            }} > */}
                    <tableUser.TblContainer>
                        <tableUser.TblHead />
                        <TableBody>
                            {tableUser
                                .recordsAfterPagingAndSorting()
                                .map((item, index) => (
                                    <TableRow key={item.book_id}>
                                        <TableCell algin="left" size="small">
                                            {index}
                                        </TableCell>
                                        <TableCell
                                            algin="left"
                                            size="small"
                                            style={{
                                                width: 200,
                                            }}
                                        >
                                            {item.user[0]
                                                ? item.user[0].name
                                                : ""}
                                        </TableCell>
                                        <TableCell
                                            size="small"
                                            style={{
                                                width: "30%",
                                            }}
                                        >
                                            {item.book[0]
                                                ? item.book[0].name_book
                                                : ""}
                                        </TableCell>
                                        <TableCell
                                            size="small"
                                            style={{
                                                width: 150,
                                            }}
                                        >
                                            {moment(item.from_date).format(
                                                "YYYY-MM-DD h:mm A"
                                            )}
                                        </TableCell>
                                        <TableCell
                                            size="small"
                                            style={{
                                                width: 150,
                                            }}
                                        >
                                            {moment(item.to_date).format(
                                                "YYYY-MM-DD h:mm A"
                                            )}
                                        </TableCell>
                                        <TableCell
                                            size="small"
                                            style={{
                                                width: 150,
                                            }}
                                        >
                                            {moment(
                                                item.promissory_date
                                            ).format("YYYY-MM-DD h:mm A")}
                                        </TableCell>

                                        <TableCell
                                            size="small"
                                            style={{
                                                width: 50,
                                            }}
                                        >
                                            {item.status_id == 1 ? (
                                                <Controls.ActionButton
                                                    color="primary"
                                                    onClick={() => {
                                                        openReturnDialog(
                                                            item.borrowing_book_id
                                                        );
                                                    }}
                                                >
                                                    <DoneIcon fontSize="small" />
                                                </Controls.ActionButton>
                                            ) : (
                                                <p>{t("Returned")}</p>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </tableUser.TblContainer>

                    <tableUser.TblPagination />
                    {/* </div> */}
                </div>
            </div>
            <Controls.Dialogg
                title={t("Confirm returned")}
                content={t(
                    "Do you want to confirm that this book is returned?"
                )}
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                deletedId={returnId}
                actionCf={confirm}
            />
            <Popup
                title={t("Borrow Form")}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                size="small"
            >
                <BorrowForm addOrEdit={addOrEdit} />
            </Popup>
        </Background6>
    );
}
