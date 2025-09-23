import React from 'react'
import styles from './BorderContainer.module.css'

export default function BorderContainer({children, isSpark=false, colorHue=null}) {
    const styleVar = colorHue ? { '--company-bold-color': `hsl(${colorHue}, var(--primary-saturation), var(--primary-lightness))` } : {};
    const sparkComponent = isSpark ? styles.SparkField : '';
    
    return (
        <div style={styleVar}className={`${styles.borderedContainer} ${sparkComponent}`}>
            {children}
        </div>
    );
}