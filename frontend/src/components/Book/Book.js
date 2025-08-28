import React from 'react'
import styles from './Book.module.css'

export default function Book({ author, title, progress}) {
  const isFull = progress === 1 ? true : false;
  const colorType = isFull ? styles.primary : styles.secondary

  return (
    <div className={styles.frontCover}>
        <p className={styles.authorText}>{author}</p>
        <p className={styles.titleText}>{title}</p>
        <div className={styles.progressBar}>
            <div className={`${styles.progressActiveBar} ${colorType}`} style={{width: `calc(${progress}*100%)`}}></div>
        </div>
    </div>
  )
}
