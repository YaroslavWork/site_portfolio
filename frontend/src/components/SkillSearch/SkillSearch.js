import React from 'react'
import styles from './SkillSearch.module.css'
import BorderContainer from '../BorderContainer/BorderContainer'
import SearchBar from '../SearchBar/SearchBar'

export default function SkillSearch({ onSearchClick, searchedTechnologies }) {
  return (
    <BorderContainer>
        <SearchBar onSearchClick={onSearchClick} />
        <div className={styles.searchedTechnologies}>
            {searchedTechnologies}
        </div>
    </BorderContainer>
  )
}
