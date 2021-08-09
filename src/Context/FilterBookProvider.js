import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { useLoader } from "./LoaderProvider";
import { api } from "../env";
const FilterBookContext = React.createContext();

export function useFilterBook() {
    return useContext(FilterBookContext);
}

export function FilterBookProvider({ children }) {
    const [allBook, setAllBook] = useState([]);
    const [allBookCurrent, setAllBookCurrent] = useState([]);
    const [favBook, setFavBook] = useState([]);
    const [newBook, setNewBook] = useState([]);
    const { turnOnLoader, turnOffLoader } = useLoader();
    useEffect(() => {
        // turnOnLoader();
        // axios
        //     .get(`${api}book/get-latest-books?limit=6`)
        //     .then((res) => {
        //         // console.log(res.data);
        //         setNewBook(res.data.books);
        //     })
        //     .catch((err) => console.log(err.response.data));
        // axios
        //     .get(`${api}book/top-borrowing?limit=6`)
        //     .then((res) => {
        //         let books = res.data.books.map((item) => item.book);
        //         setFavBook(books);
        //     })
        //     .catch((err) => console.log(err.response.data));
        // axios
        //     .get(`${api}book`)
        //     .then((res) => {
        //         console.log(res.data.books);
        //         setAllBook(res.data.books);
        //         setAllBookCurrent(res.data.books);
        //     })
        //     .catch((err) => {
        //         console.log(err.response.data);
        //     })
        //     .finally(() => turnOffLoader());
    }, []);
    const value = {
        allBook,
        newBook,
        favBook,
        allBookCurrent,
        setAllBookCurrent,
    };

    return (
        <FilterBookContext.Provider value={value}>
            {children}
        </FilterBookContext.Provider>
    );
}
