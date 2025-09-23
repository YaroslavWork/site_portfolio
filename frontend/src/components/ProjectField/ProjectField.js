import React from 'react'
import BorderContainer from '../BorderContainer/BorderContainer'
import styles from './ProjectField.module.css'

export default function ProjectField( {
    name, technologies, description, references, images_path,
    technologiesTitle, descriptionTitle, linksTitle
} ) {

  const isImageExists = images_path.length === 0 ? false : true;

  return (
    <BorderContainer>
        <div className={styles.projectField}>
            <div className={styles.projectContent}>
                <h1 className={styles.projectTitle}>{name}</h1>
                <div className={styles.projectBlock}>
                    <h2 className={styles.projectBlockTitle}>{technologiesTitle}</h2>
                    <div className={styles.technologiesContent}>
                        {technologies}
                    </div>
                </div>
                <div className={styles.projectBlock}>
                    <h2 className={styles.projectBlockTitle}>{descriptionTitle}</h2>
                    <p className={styles.description}
                        dangerouslySetInnerHTML={{ __html: description }}/>
                </div>
                <div className={styles.projectBlock}>
                    <h2 className={styles.projectBlockTitle}>{linksTitle}</h2>
                    <div className={styles.referenceContent}>
                        {references}
                    </div>
                </div>

            </div>
            {isImageExists && 
                <div className={styles.projectImages}>
                    {images_path.map((path, index) => (
                        <img key={index} className={styles.image} src={`${path}`} alt={`${name} (${index+1})`}/>
                    ))}
                </div>
            }
        </div>
    </BorderContainer>
  )
}
