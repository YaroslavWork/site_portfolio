import React from 'react'
import styles from './Button.module.css'

export default function Button( {text, isPrimary=true, onButtonClick, onMouseEnter=null, onMouseLeave=null, isSmallPadding=false, colorHue=null} ) {
  const styleVar = colorHue !== null ? (colorHue[0] === '-' ? {
      '--company-bold-color': `var(${colorHue})`,
      '--company-color-hover': `var(${colorHue})`
    } : { 
      '--company-bold-color': `hsl(${colorHue}, var(--primary-saturation), var(--primary-lightness))`,
      '--company-color-hover': `hsl(${colorHue}, var(--primary-saturation), calc(var(--primary-lightness) - 7%))`
    }) : isPrimary ? {'--company-bold-color': `var(--primary)`} : {'--company-bold-color': `var(--secondary)`}
  
  const buttonColor = isPrimary ? styles.primary : styles.secondary;
  const paddingSize = isSmallPadding ? styles.smallPadding : '';
  return (
    <button
      style={styleVar}
      className={`${styles.button} ${buttonColor} ${paddingSize}`}
      onClick={onButtonClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {text}
    </button>
  )
}