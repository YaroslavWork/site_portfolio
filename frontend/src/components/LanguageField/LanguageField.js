import React from 'react'
import styles from './LanguageField.module.css'
import BorderContainer from '../BorderContainer/BorderContainer'
import LanguagePreview from '../LanguagePreview/LanguagePreview'

export default function LanguageField({title, languages}) {
  return (
    <BorderContainer>
        <div className={styles.languageField}>
            <h2 className={styles.languageTitle}>{title}</h2>
            {languages.map((data, index) => (
                <LanguagePreview
                    key={index}
                    name={data.name}
                    knowledge={data.knowledge}
                />
            ))}
        </div>
    </BorderContainer>
  )
}
