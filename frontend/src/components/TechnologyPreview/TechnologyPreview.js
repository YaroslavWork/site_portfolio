import React from 'react'
import styles from './TechnologyPreview.module.css'

export default function TechnologyPreview({ colorHex, name, type}) {
  return (
    <div className={styles.technologyPreview}>
        <div style={{backgroundColor: `#${colorHex}`}} className={styles.technologyColor} />
        <p className={styles.technologyName}>{name}</p>
        <p className={styles.technologyType}>{type}</p>
    </div>
  )
}
