import React from 'react'
import styles from './Title.module.css'

export default function Title( {text, isPrimary=true} ) {
    const titleColor = isPrimary ? styles.primary : styles.secondary;
    return (
       <div className={styles.titleField}>
            <h1 className={`${styles.titleText} ${titleColor}`}>{text}</h1>
       </div> 
    )
}