import React from 'react'
import styles from './SkillSubComponentProjects.module.css'
import ProjectPreview from '../ProjectPreview/ProjectPreview';

export default function SkillSubComponentProjects({title, projectsName, color=null}) {
  const styleVar = color ? { '--company-bold-color': `#${color}` } : {'--company-bold-color': 'var(--secondary)'};

  return (
    <div className={styles.titleField}>
        <h2 style={styleVar} className={styles.title}>{title}</h2>
        <div className={styles.projectContent}>
            {projectsName.map((data, index) => (
                <ProjectPreview key={index} name={data}/>
            ))}
        </div>
    </div>
  )
}
