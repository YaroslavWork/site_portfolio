import React from 'react'
import styles from './IconsWithButtonsField.module.css'

export default function IconsWithButtonsField( {iconsWithLinks, buttons = []} ) {
    return (
       <div className={styles.IconsWithButtonsField}>
            <div className={styles.iconContainer}>
                {iconsWithLinks.map((item, index) => (
                    <div key={index} className={styles.icon}>
                        <a
                            key={index} 
                            href={item.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={styles.iconLink}
                        >
                        {item.icon}
                        </a>
                    </div>
                ))}
            </div>
            <div className={styles.buttonContainer}>
                {buttons.map((button, index) => (
                    <div key={index} className={styles.button}>
                        {button}
                    </div>
                ))}
            </div>
       </div> 
    )
}