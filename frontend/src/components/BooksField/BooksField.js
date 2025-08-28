import React from 'react'
import styles from './BooksField.module.css'
import BorderContainer from '../BorderContainer/BorderContainer'

export default function BooksField({books}) {
  return (
    <BorderContainer>
        <div className={styles.booksContainer}>
            {books}
        </div>
    </BorderContainer>
  )
}