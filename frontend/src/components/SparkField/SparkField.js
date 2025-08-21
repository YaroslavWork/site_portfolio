import React from 'react'
import styles from './SparkField.module.css'

export default function SparkField({text, onSparkClick}) {
  const image_path = '/images/Spark.png';

  return (
    <div className={styles.sparkField}>
      <button
        onClick={onSparkClick}
        className={styles.sparkButton}
      >
        <img src={image_path} alt="Spark" className={styles.sparkImage} />
      </button>
      <div className={styles.sparkMonolog}>
        {text}
      </div>
    </div>
  )
}