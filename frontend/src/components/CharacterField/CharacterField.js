import React from 'react'
import styles from './CharacterField.module.css'

export default function CharacterField({name}) {
    const image_path = '/images/character.png';

    return (
        <div className={styles.characterField}>
            <img className={styles.characterImage} src={image_path}></img>
            <h1 className={styles.characterName}>{name}</h1>
        </div>
    )
}