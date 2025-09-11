import React from 'react'
import styles from './SparkField.module.css'
import BorderContainer from '../BorderContainer/BorderContainer';

export default function SparkField({text, onSparkClick, color=null, allowHTML=false}) {
  const styleVar = color ? { '--company-bold-color': `#${color}` } : {};
  
  const image_path = '/images/Spark.png';

  return (
    <BorderContainer style={styleVar} isSpark={true} color={color}>
      <button
        onClick={onSparkClick}
        className={styles.sparkButton}
      >
        <img src={image_path} alt="Spark" className={styles.sparkImage} />
      </button>
      { allowHTML ? 
        <div style={styleVar} className={styles.sparkMonolog} dangerouslySetInnerHTML={{ __html: text }}></div> //CONTACT ME PLEASE
        :
        <div style={styleVar} className={styles.sparkMonolog}>{text}</div> //CONTACT ME PLEASE
      }
    </BorderContainer>
  )
}