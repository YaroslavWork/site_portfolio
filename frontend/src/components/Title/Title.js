import React from 'react'
import styles from './Title.module.css'
import BorderContainer from '../BorderContainer/BorderContainer';

export default function Title( {text, isPrimary=true, allowHTML=true, color=null} ) {
    const styleVar = color ? { '--company-bold-color': `#${color}` } : {};
    const titleColor = isPrimary ? styles.primary : styles.secondary;
    return (
        <BorderContainer>
            { allowHTML ? 
                <h1 style={styleVar} className={`${styles.titleText} ${titleColor}`} dangerouslySetInnerHTML={{ __html: text }}></h1>
                :
                <h1 style={styleVar} className={`${styles.titleText} ${titleColor}`}>{text}</h1>
            }
        </BorderContainer>
    )
}