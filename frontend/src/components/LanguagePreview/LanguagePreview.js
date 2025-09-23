import React from 'react'
import styles from './LanguagePreview.module.css'


export default function LanguagePreview({ name, knowledge}) {
  return (
    <div className={styles.languagePreview}>
      <h3 className={styles.languageTitle}>{name}</h3>
      <p className={styles.languageKnowledge}>{knowledge}</p>
    </div>
  )
}
