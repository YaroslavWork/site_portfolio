import styles from './ProjectPreview.module.css'
import React from 'react'

import { GoProjectRoadmap } from "react-icons/go";

export default function ProjectPreview({name}) {
  return (
    <div className={styles.projectPreview}>
            <GoProjectRoadmap className={styles.projectIcon}/>
            <p className={styles.projectName}>{name}</p>
    </div>
  )
}
