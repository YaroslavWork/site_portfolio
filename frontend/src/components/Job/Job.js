import React from 'react'
import styles from './Job.module.css'

export default function Job({title, from, to, company, place, description, _zoom=200}) {
  const dateFrom = new Date(from);
  const dateTo = to === "Present" ? new Date() : new Date(to);

  const differenceInDays = (dateTo.getTime() - dateFrom.getTime()) / (1000 * 60 * 60 * 24);
  const progressHeight = differenceInDays / 365 * _zoom;
  
  const cornersStyle = to === "Present" ? styles.onlyBottomCorners : styles.allCorners;

  return (
    <div className={styles.jobContainer}>
      <div className={`${styles.jobProgress} ${cornersStyle}`} style={{height: `${progressHeight}px`}}></div>
      <div className={styles.jobContent}>
        <div className={styles.jobTopContainer}>
            <h2 className={styles.jobTitle}>{title}</h2>
            <p className={styles.jobNameandPlace}>{`${company} | ${place}`}</p>
        </div>
        <p className={styles.jobDescription}>{description}</p>
      </div>
    </div>
  )
}
