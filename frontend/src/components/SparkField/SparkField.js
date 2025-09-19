import React, { useRef, useState } from 'react'
import styles from './SparkField.module.css'
import BorderContainer from '../BorderContainer/BorderContainer';

import { SlEnergy } from "react-icons/sl";
import { ControlCenter } from '../ControlCenter/ControlCenter';

export default function SparkField({
  text,
  onSparkClick,
  navigate,
  onChangeTheme,
  onChangeLanguage,
  language,
  onSparkEnergyClick=null,
  color=null,
  allowHTML=false
}) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isCountAsClick, setIsCountAsClick] = useState(false);
  const timerRef = useRef(null);
  
  const styleVar = color ? { '--company-bold-color': `#${color}` } : {};
  const image_path = '/images/Spark.png';

  const handleMouseDown = () => {
    setIsCountAsClick(true);
    timerRef.current = setTimeout(() => {
      setIsCountAsClick(false);
      setIsMenuVisible(!isMenuVisible);
    }, 700);
  }

  const handleMouseUp = () => {
    clearTimeout(timerRef.current);
  };

  const onlyClick = () => {
    if (isCountAsClick) {
      onSparkClick()
      setIsCountAsClick(false)
    }
  }

  return (
    <>
      <BorderContainer style={styleVar} isSpark={true} color={color}>
        <div className={styles.sparkMenu}>
          <button
            onClick={onlyClick}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
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
      {isMenuVisible && 
        <ControlCenter
          navigate={navigate}
          onChangeLanguage={onChangeLanguage}
          onChangeTheme={onChangeTheme}
          language={language}
        />
      }
    </>
  )
}