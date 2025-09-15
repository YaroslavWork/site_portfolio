import React from 'react'
import styles from './TechnologyPreview.module.css'

export default function TechnologyPreview({name, type, hueColor=0}) {
  return (
    <div className={styles.technologyPreview}>
        <div style={
          {backgroundColor: `hsl(${hueColor}, var(--primary-saturation), var(--primary-lightness))`}}
          className={styles.technologyColor}
        />
        <p className={styles.technologyName}>{name}</p>
        <p className={styles.technologyType}>{type}</p>
    </div>
  )
}
