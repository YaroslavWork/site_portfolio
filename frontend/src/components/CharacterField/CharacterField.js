import React from 'react'
import styles from './CharacterField.module.css'
import BorderContainer from '../BorderContainer/BorderContainer';

export default function CharacterField({name}) {
    const image_path = '/images/character.png';

    return (
        <BorderContainer>
            <img className={styles.characterImage} src={image_path} alt={'Character'}></img>
            <h1 className={styles.characterName}>{name}</h1>
        </BorderContainer>
    )
}