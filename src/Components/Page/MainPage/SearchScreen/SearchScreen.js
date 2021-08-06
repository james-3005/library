import React, { useEffect, useState } from "react";
import Background4 from "../../../Template/Background2/Background2";
import styles from "./SearchScreen.module.scss";

import Carousel3 from "../../../MoreClues/Carousel/Carousel";
import { useTranslation } from "react-i18next";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { Button, Grid } from "@material-ui/core";
import Dialog from "../Dialog";

function SearchScreen() {
    const [activeSearch, setActiveSearch] = useState(true);
    const [activeFilter, setActiveFilter] = useState(false);
    const [array, setArray] = useState([]);
    const [valueSearch, setValueSearch] = useState("");
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = (value) => {
        setOpen(false);
    };
    useEffect(() => {
        axios
            .get("http://library-mini.xyz/api/v1/book")
            .then((res) => {
                // console.log(res.data.data);
                setArray(res.data.data);
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    }, []);
    return (
        <div id="search">
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
                        size="small"
                        onClick={handleClickOpen}
                    >
                        <img src="image/svg/filter.svg" alt="" />
                    </Button>
                </div>
                <div className={styles.component}>
                    <div className={styles.list}>
                        <Carousel3
                            data={array.filter((item) =>
                                item["name_book"].includes(valueSearch)
                            )}
                        />
                    </div>
                </div>
                <Dialog open={open} onClose={handleClose} />
            </Background4>
        </div>
    );
}

export default SearchScreen;
