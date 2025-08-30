import React from 'react'
import styles from './SkillSubComponent.module.css'

export default function SkillSubComponent({ whatType, text}) {
  return (
    <div className={styles.whatField}>
      <h2 className={styles.whatTitle}>{whatType}</h2>
      <p className={styles.skillText} dangerouslySetInnerHTML={{ __html: text }}/> {/* Trusted source */}
    </div>
  )
}
