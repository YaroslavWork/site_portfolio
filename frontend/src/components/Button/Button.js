import React from 'react'
import styles from './Button.module.css'

export default function Button( {text, isPrimary=true, onKeyClick, isSmallPadding=false} ) {
  const buttonColor = isPrimary ? styles.primary : styles.secondary;
  const paddingSize = isSmallPadding ? styles.smallPadding : '';
  return (
    <button 
      className={`${styles.button} ${buttonColor} ${paddingSize}`}
      onClick={onKeyClick}
    >
      {text}
    </button>
  )
}