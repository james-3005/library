import React from 'react'
import Background4 from '../../../Template/Background4/Background4'
import styles from './SearchScreen.module.scss'
import { motion } from "framer-motion"
import classnames from "classnames";
import SearchBar from '../../../MoreClues/SeachBar/SeachBar'
import FilterBar from '../../../MoreClues/FilterBar/FilterBar';
import Carousel from '../../../MoreClues/Carousel/Carousel';
function SearchScreen() {

    return (
        <Background4>
            {/* SearchScreen */}
            <SearchBar/>
            <div style={{position: 'absolute', right: 200}}>
                <FilterBar/>
            </div>

            <div style={{position: 'absolute', top: 200, left: 200}}>
            <Carousel/>
            </div>
            
        </Background4>
    )
}

export default SearchScreen
