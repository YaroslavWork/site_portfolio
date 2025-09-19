import React from 'react'
import BorderContainer from '../BorderContainer/BorderContainer'
import styles from './HobbiesField.module.css'

export default function HobbiesField({ title, hobbies }) {
  return (
    <BorderContainer>
        <div className={styles.hobbiesContainer}>
          <h1 className={styles.hobbyMainTitle}>{title}</h1>
          {hobbies}
        </div>
    </BorderContainer>
  )
}
