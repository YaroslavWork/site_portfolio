import React from 'react'
import BorderContainer from '../BorderContainer/BorderContainer'
import styles from './HobbiesField.module.css'

export default function HobbiesField({ hobbies }) {
  return (
    <BorderContainer>
        <div className={styles.hobbiesContainer}>
            {hobbies}
        </div>
    </BorderContainer>
  )
}
