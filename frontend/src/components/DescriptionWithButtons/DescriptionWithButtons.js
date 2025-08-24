import React from 'react'
import styles from './DescriptionWithButtons.module.css'

export default function DescriptionWithButtons( {text, buttons = []} ) {
    return (
       <div className={styles.DescriptionWithButtons}>
            <p className={styles.textDescription}>{text}</p>
            <div className={styles.buttonContainer}>
                {buttons.map((button, index) => (
                    <React.Fragment key={index}>
                        {button}
                    </React.Fragment>
                ))}
            </div>
       </div> 
    )
}