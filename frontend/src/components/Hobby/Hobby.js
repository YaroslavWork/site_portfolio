import React from 'react'
import styles from './Hobby.module.css'

export default function Hobby({title, description, images_path}) {
  const isImageExists = images_path.length === 0 ? false : true;

  return (
    <>
      <div className={styles.hobbyTopper}>
        <h2 className={styles.hobbyTitle}>{title}</h2>
      </div>
      <p className={styles.hobbyDescription}>{description}</p>
      {isImageExists && 
        <div className={styles.projectImages}>
          {images_path.map((path, index) => (
            <img key={index} className={styles.image} src={`${path}`} alt={`${title} (${index+1})`}/>
          ))}
        </div>
      }
    </>
  )
}