import React from 'react'
import styles from './Hobby.module.css'

export default function Hobby({title, description, icon_path}) {
  return (
    <>
      <div className={styles.hobbyTopper}>
        {/* <img 
          className={styles.hobbyIcon}
          src={`/icons/${icon_path}`}
          alt={title}
        /> */}
        <h2 className={styles.hobbyTitle}>{title}</h2>
      </div>
      <p className={styles.hobbyDescription}>{description}</p>
    </>
  )
}