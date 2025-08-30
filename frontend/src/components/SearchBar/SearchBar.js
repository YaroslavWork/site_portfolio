import React, { useState } from 'react'
import styles from './SearchBar.module.css'
import { FiSearch, FiSend } from "react-icons/fi";

export default function SearchBar({ onSearchClick }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className={styles.searchBarContainer}>
        <div className={styles.searchInputWrapper}>
            <FiSearch className={styles.icon} />
            <input 
              className={styles.searchInput}
              type="text"
              value={query}
              onChange={handleInputChange}
            />
        </div>
        {/* <button className={styles.searchButton} onClick={onSearchClick}>
          <FiSend className={`${styles.icon} ${styles.smallIcon}`}/>
        </button> */}
    </div>
  )
}

