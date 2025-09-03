import React from 'react'
import styles from './UniversitiesField.module.css'
import BorderContainer from '../BorderContainer/BorderContainer'

export default function UniversitiesField({ title, universities }) {
  

  return (
    <BorderContainer>
      <h1 className={styles.universitiesTitle}>{title}</h1>
      {universities.map((university, index) => {
        const universityDateStr = `${(new Date(university.start_date)).getFullYear()} - ${(new Date(university.end_date)).getFullYear()}`;

        return(
          <div key={index} className={styles.universityBlock}>
              <p className={styles.universityDate}>{universityDateStr}</p>
              <h2 className={styles.universityInstitution}>{university.institution}</h2>
              <h3 className={styles.universityDegree}>{university.degree}</h3>
              <p className={styles.universityFieldOfStudy}>{university.field_of_study}</p>
          </div>
        )
      })}
    </BorderContainer>
  )
}
