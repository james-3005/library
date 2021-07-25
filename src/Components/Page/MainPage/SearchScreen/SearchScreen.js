import React, { useState } from 'react'
import Background4 from '../../../Template/Background4/Background4'
import styles from './SearchScreen.module.scss'
import { motion } from "framer-motion"
import classnames from "classnames";
import SearchBar from '../../../MoreClues/SeachBar/SeachBar'
import FilterBar from '../../../MoreClues/FilterBar/FilterBar';
import Carousel3 from '../../../MoreClues/Carousel/Carousel3';

const array = [
    {
      image:
        "https://taisachmoi.com/wp-content/uploads/2018/12/dac-nhan-tam.jpg",
      price: 1,
      author: "author",
      type: "type",
      button: "",
      id: 1,
    },
    {
      image:
        "https://taisachmoi.com/wp-content/uploads/2018/12/dac-nhan-tam.jpg",
      price: 2,
      author: "author",
      type: "type",
      button: "",
      id: 2,
    },
    {
      image:
        "https://taisachmoi.com/wp-content/uploads/2018/12/dac-nhan-tam.jpg",
      price: 3,
      author: "author",
      type: "type",
      button: "",
      id: 3,
    },
    {
      image:
        "https://taisachmoi.com/wp-content/uploads/2018/12/dac-nhan-tam.jpg",
      price: 4,
      author: "author",
      type: "type",
      button: "",
      id: 4,
    },
    {
      image:
        "https://taisachmoi.com/wp-content/uploads/2018/12/dac-nhan-tam.jpg",
      price: 5,
      author: "author",
      type: "type",
      button: "",
      id: 5,
    },
    {
      image:
        "https://taisachmoi.com/wp-content/uploads/2018/12/dac-nhan-tam.jpg",
      price: 6,
      author: "author",
      type: "type",
      button: "",
      id: 6,
    },
    {
      image:
        "https://taisachmoi.com/wp-content/uploads/2018/12/dac-nhan-tam.jpg",
      price: 7,
      author: "author",
      type: "type",
      button: "",
      id: 7,
    },
    {
      image:
        "https://taisachmoi.com/wp-content/uploads/2018/12/dac-nhan-tam.jpg",
      price: 8,
      author: "author",
      type: "type",
      button: "",
      id: 8,
    },
    {
      image:
        "https://taisachmoi.com/wp-content/uploads/2018/12/dac-nhan-tam.jpg",
      price: 9,
      author: "author",
      type: "type",
      button: "",
      id: 9,
    },
    {
      image:
        "https://taisachmoi.com/wp-content/uploads/2018/12/dac-nhan-tam.jpg",
      price: 10,
      author: "author",
      type: "type",
      button: "",
      id: 10,
    },
  ];
function SearchScreen() {
    const [activeSearch, setActiveSearch]= useState(true);
    const [activeFilter, setActiveFilter]= useState(false);
    return (
        <Background4>
          <p className={styles.header}>Tìm kiếm</p>
          <div className={styles.searchBar}>
              <SearchBar  activeSearch={activeSearch} 
                          setActiveSearch={setActiveSearch}
                          activeFilter={activeFilter}
                          setActiveFilter={setActiveFilter}
                          />
          </div>
          <div className={styles.filterBar}>
              <FilterBar  activeSearch={activeSearch} 
                          setActiveSearch={setActiveSearch}
                          activeFilter={activeFilter}
                          setActiveFilter={setActiveFilter}/>
              
          </div>
          <div className={styles.component}>
              <div className={styles.list}>
                  <Carousel3 data={array}/>
              </div>
          </div>

        </Background4>
    )
}

export default SearchScreen
