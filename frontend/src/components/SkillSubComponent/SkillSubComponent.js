import React from 'react'
import styles from './SkillSubComponent.module.css'

export default function SkillSubComponent({ whatType, text, color=null }) {
  const styleVar = color ? { '--company-bold-color': `#${color}` } : {'--company-bold-color': 'var(--secondary)'};

  return (
    <div className={styles.whatField}>
      <h2 style={styleVar} className={styles.whatTitle}>{whatType}</h2>
      <p style={styleVar} className={styles.skillText} dangerouslySetInnerHTML={{ __html: text }}/> {/* Trusted source */}
    </div>
  )
}
