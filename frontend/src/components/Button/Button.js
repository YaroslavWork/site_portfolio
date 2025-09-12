import React from 'react'
import styles from './Button.module.css'

export default function Button( {text, isPrimary=true, onButtonClick, isSmallPadding=false, color=null} ) {
  const styleVar = color ? { 
    '--company-bold-color': `#${color}`,
    '--company-color-hover': `#${color}`
   } : {};
  
  const buttonColor = isPrimary ? styles.primary : styles.secondary;
  const paddingSize = isSmallPadding ? styles.smallPadding : '';
  return (
    <button
      style={styleVar}
      className={`${styles.button} ${buttonColor} ${paddingSize}`}
      onClick={onButtonClick}
    >
      {text}
    </button>
  )
}