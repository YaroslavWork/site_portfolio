import React, { useState } from 'react'
import styles from './SearchBar.module.css'
import { FiSearch, FiSend } from "react-icons/fi";

export default function SearchBar({ prevValue, onSearchClick }) {
  const [value, setValue] = useState(prevValue || "");

  const changeValue = (event) => {
    setValue(event.target.value);
  }

  const buttonClick = () => {
    onSearchClick(value);
  }

  return (
    <div className={styles.searchBarContainer}>
        <div className={styles.searchInputWrapper}>
            <FiSearch className={styles.icon} />
            <input 
              className={styles.searchInput}
              type="text"
              value={value}
              onChange={changeValue}
            />
        </div>
        <button className={styles.searchButton} onClick={buttonClick}>
          <FiSend className={`${styles.icon} ${styles.smallIcon}`}/>
        </button>
    </div>
  )
}

