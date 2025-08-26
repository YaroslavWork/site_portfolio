import React from 'react'
import styles from './BorderContainer.module.css'

export default function BorderContainer({children, isSpark=false}) {
    const sparkComponent = isSpark ? styles.SparkField : '';
    
    return (
        <div className={`${styles.borderedContainer} ${sparkComponent}`}>
            {children}
        </div>
    );
}