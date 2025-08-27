import React from 'react'
import styles from './IconsWithButtonsField.module.css'
import BorderContainer from '../BorderContainer/BorderContainer'
import Buttons from '../Buttons/Buttons'

export default function IconsWithButtonsField( {iconsWithLinks, buttons = []} ) {
    return (
        <BorderContainer>
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
        <Buttons buttons={buttons}/>
        </BorderContainer>
    )
}