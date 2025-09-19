import React from 'react'
import styles from './BooksField.module.css'
import BorderContainer from '../BorderContainer/BorderContainer'

export default function BooksField({title, books}) {
  return (
    <BorderContainer>
      <h1 className={styles.booksMainTitle}>{title}</h1>
      <div className={styles.booksContainer}>
          {books}
      </div>
    </BorderContainer>
  )
}