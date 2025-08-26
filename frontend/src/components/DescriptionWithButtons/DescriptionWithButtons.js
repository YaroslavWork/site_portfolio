import React from 'react'
import styles from './DescriptionWithButtons.module.css'
import BorderContainer from '../BorderContainer/BorderContainer'

export default function DescriptionWithButtons( {text, buttons = []} ) {
    return (
        <BorderContainer>
            <p className={styles.textDescription}>{text}</p>
            <div className={styles.buttonContainer}>
                {buttons.map((button, index) => (
                    <div key={index} className={styles.buttonItem}>
                        {button}
                    </div>
                ))}
            </div>
        </BorderContainer>
    );
}