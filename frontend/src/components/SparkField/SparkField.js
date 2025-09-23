import React, { useRef, useState } from 'react'
import styles from './SparkField.module.css'
import BorderContainer from '../BorderContainer/BorderContainer';

import { SlEnergy } from "react-icons/sl";
import { ControlCenter } from '../ControlCenter/ControlCenter';
import Button from '../Button/Button';

import { FaDroplet } from "react-icons/fa6";

export default function SparkField({
  text,
  onSparkClick,
  navigate,
  onChangeTheme,
  onChangeLanguage,
  language,
  onChangeStyle=null,
  onSparkEnergyClick=null,
  colorHue=null,
  allowHTML=false
}) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isCountAsClick, setIsCountAsClick] = useState(false);
  const timerRef = useRef(null);
  
  const styleVar = colorHue ? { '--company-bold-color': `hsl(${colorHue}, var(--primary-saturation), var(--primary-lightness))` } : {};
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

  const onCloseMenu = () => {
    setIsMenuVisible(false);
    setIsCountAsClick(false);
  }

  return (
    <>
      <BorderContainer style={styleVar} isSpark={true} colorHue={colorHue}>
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
          {onSparkEnergyClick && (
            <Button text={<SlEnergy />} isSmallPadding={true} colorHue={"--warning"} onButtonClick={onSparkEnergyClick}/>
          )}
        </div>
        { allowHTML ? 
          <div style={styleVar} className={styles.sparkMonolog} dangerouslySetInnerHTML={{ __html: text }}></div> //CONTACT ME PLEASE
          :
          <div style={styleVar} className={styles.sparkMonolog}>{text}</div> //CONTACT ME PLEASE
        }
        { onChangeStyle &&
          <Button text={<FaDroplet />} onButtonClick={() => onChangeStyle()}/>
        }
      </BorderContainer>
      {isMenuVisible && 
        <ControlCenter
          navigate={navigate}
          onChangeLanguage={onChangeLanguage}
          onChangeTheme={onChangeTheme}
          language={language}
          onCloseMenu={onCloseMenu}
        />
      }
    </>
  )
}