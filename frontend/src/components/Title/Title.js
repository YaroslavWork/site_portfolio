import React from 'react'
import styles from './Title.module.css'
import BorderContainer from '../BorderContainer/BorderContainer';

export default function Title( {text, isPrimary=true} ) {
    const titleColor = isPrimary ? styles.primary : styles.secondary;
    return (
        <BorderContainer>
            <h1 className={`${styles.titleText} ${titleColor}`}>{text}</h1>
        </BorderContainer>
    )
}