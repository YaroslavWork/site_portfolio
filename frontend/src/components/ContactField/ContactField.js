import React from 'react'
import BorderContainer from '../BorderContainer/BorderContainer'
import styles from './ContactField.module.css'

export default function ContactField({ identification, icon_path }) {
  return (
    <BorderContainer>
        <p className={styles.contactIdentification}>{identification}</p>
    </BorderContainer>
  )
}
