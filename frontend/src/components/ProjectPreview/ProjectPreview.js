import styles from './ProjectPreview.module.css'
import React from 'react'

import { GoProjectRoadmap } from "react-icons/go";

export default function ProjectPreview({name}) {
  const filteredName = name.length > 26 ? name.substring(0, 26) + '...' : name;

  return (
    <div className={styles.projectPreview}>
            <GoProjectRoadmap className={styles.projectIcon}/>
            <p className={styles.projectName}>{filteredName}</p>
    </div>
  )
}
