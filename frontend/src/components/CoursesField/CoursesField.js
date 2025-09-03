import React from 'react'
import BorderContainer from '../BorderContainer/BorderContainer'
import styles from './CoursesField.module.css'

export default function CoursesField({ title, courses }) {
  return (
    <BorderContainer>
        <h1 className={styles.coursesTitle}>{title}</h1>
        {courses.map((course, index) => (
            <div key={index} className={styles.courseBlock}>
                <div className={styles.courseTopContainer}>
                        <h2 className={styles.courseTitle}>{course.title}</h2>
                        <h3 className={styles.courseCompany}>{course.company}</h3>
                </div>
                <p className={styles.courseDescription}>{course.description}</p>
            </div>
        ))}
    </BorderContainer>
  )
}
