import React from 'react'

import styles from './LinkPreview.module.css'

export default function LinkPreview({ onLinkClick, name, url }) {
  return (
    <a
        className={styles.linkContainer}
        href={url}
        target="_blank" 
        rel="noopener noreferrer">
        <h3 className={styles.linkTitle}>{name}</h3>
        <p className={styles.linkUrl}>{url}</p>
    </a>
  )
}
