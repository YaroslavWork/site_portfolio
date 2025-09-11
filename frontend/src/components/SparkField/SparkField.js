import React from 'react'
import styles from './SparkField.module.css'
import BorderContainer from '../BorderContainer/BorderContainer';

import { SlEnergy } from "react-icons/sl";

export default function SparkField({text, onSparkClick, onSparkEnergyClick=null, color=null, allowHTML=false}) {
  const styleVar = color ? { '--company-bold-color': `#${color}` } : {};
  
  const image_path = '/images/Spark.png';

  return (
    <BorderContainer style={styleVar} isSpark={true} color={color}>
      <div className={styles.sparkMenu}>
        <button
          onClick={onSparkClick}
          className={styles.sparkButton}
        >
          <img src={image_path} alt="Spark" className={styles.sparkImage} />
        </button>
        {onSparkEnergyClick &&
          <button
            onClick={onSparkEnergyClick}
            className={styles.sparkEnergyButton}
          >
            <SlEnergy />
          </button>
        }
      </div>
      { allowHTML ? 
        <div style={styleVar} className={styles.sparkMonolog} dangerouslySetInnerHTML={{ __html: text }}></div> //CONTACT ME PLEASE
        :
        <div style={styleVar} className={styles.sparkMonolog}>{text}</div> //CONTACT ME PLEASE
      }
    </BorderContainer>
  )
}