import React from 'react'
import styles from './Button.module.css'

export default function Button( {text, isPrimary=true, onKeyClick} ) {
  const buttonColor = isPrimary ? styles.primary : styles.secondary;
  return (
    <button 
      className={`${styles.button} ${buttonColor}`}
      onClick={onKeyClick}
    >
      {text}
    </button>
  )
}