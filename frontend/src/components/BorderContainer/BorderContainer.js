import React from 'react'
import styles from './BorderContainer.module.css'

export default function BorderContainer({children, isSpark=false, color=null}) {
    const styleVar = color ? { '--company-bold-color': `#${color}` } : {};
    const sparkComponent = isSpark ? styles.SparkField : '';
    
    return (
        <div style={styleVar}className={`${styles.borderedContainer} ${sparkComponent}`}>
            {children}
        </div>
    );
}