import React, { useEffect, useState, useRef } from "react";
import Background4 from "../../../Template/Background2/Background2";
import styles from "./SearchScreen.module.scss";

import Carousel3 from "../../../MoreClues/Carousel/Carousel";
import { useTranslation } from "react-i18next";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { Button, Grid } from "@material-ui/core";
import Dialog from "../Dialog";
import { useLoader } from "../../../../Context/LoaderProvider";
import { useFilterBook } from "../../../../Context/FilterBookProvider";
function SearchScreen() {
    const [valueSearch, setValueSearch] = useState("");
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);
    const { turnOnLoader, turnOffLoader } = useLoader();
    const { allBook, allBookCurrent, setAllBookCurrent } = useFilterBook();
    const searchRef = useRef();
    // const [array, setArray] = useState(allBook);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = (value) => {
        setOpen(false);
    };

    // useEffect(() => {
    //     setArray(allBook);
    // }, [allBook]);
    const Filter = () => {
        turnOnLoader();
        let exptype = 1;
        if (type3 !== "All") exptype = type3;
        else if (type2 !== "All") exptype = type2;
        console.log(exptype);
        axios
            .get(
                `https://library-mini.xyz/api/v1/book?author=${author}&publishing_year=${year}&translator=${translator}&code_ddc=${
                    exptype - 1
                }&country_name=${country === "All" ? "" : country}`
            )
            .then((res) => {
                setAllBookCurrent(res.data.books);
            })
            .finally(() => turnOffLoader());
    };
    const [author, setAuthor] = React.useState("");
    const [year, setYear] = React.useState("");
    const [country, setCountry] = React.useState("");
    const [translator, setTranslator] = React.useState("");
    const [type1, setType1] = React.useState("All");
    const [type2, setType2] = React.useState("All");
    const [type3, setType3] = React.useState("All");
    useEffect(() => {
        let res = window.localStorage.getItem("path");
        if (res === "bookdetailpage") {
            searchRef.current.scrollIntoView();
            window.localStorage.setItem("path", "");
        }
    }, []);
    return (
        <div id="search" ref={searchRef}>
            <Background4>
                <div className={styles.searchBar}>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <img src="image/svg/search.svg" alt="" />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="input-with-icon-grid"
                                label="Search"
                                value={valueSearch}
                                onChange={(e) => setValueSearch(e.target.value)}
                                style={{ width: 300 }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        variant="outlined"
                        color="primary"
                        style={{ height: 30 }}
                        onClick={handleClickOpen}
                    >
                        <img src="image/svg/filter.svg" alt="" />
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        style={{ height: 30, marginLeft: 20 }}
                        onClick={() => setAllBookCurrent(allBook)}
                    >
                        <img src="image/svg/filterclear.svg" alt="" />
                    </Button>
                </div>
                <div className={styles.component}>
                    <div className={styles.list}>
                        <Carousel3
                            data={
                                allBookCurrent
                                    ? allBookCurrent.filter((item) =>
                                          item["name_book"].includes(
                                              valueSearch
                                          )
                                      )
                                    : []
                            }
                        />
                    </div>
                </div>
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
            </Background4>
        </div>
    );
}

export default React.memo(SearchScreen);
