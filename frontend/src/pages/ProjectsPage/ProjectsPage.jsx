import React from 'react'
import { useProjectsData } from '../../features/hooks/index.hooks';
import { useNavigate } from 'react-router-dom';
import SparkField from '../../components/SparkField/SparkField';
import { findTextByTag } from '../../utils/dataUtils';

import styles from './ProjectsPage.module.css'
import LinkPreview from '../../components/LinkPreview/LinkPreview';
import ProjectField from '../../components/ProjectField/ProjectField';
import TechnologyPreview from '../../components/TechnologyPreview/TechnologyPreview';

export const ProjectsPage = () => {
    const navigate = useNavigate()

    const { data, isLoading, error } = useProjectsData();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading skills data</div>;

    const titles = data['data']['data']['titles'];
    const projects = data['data']['data']['projects'];

    return (
      <div className={styles.ProjectsPage}>
        <div className={styles.mainContent}>
          <SparkField 
            text={findTextByTag(titles, 'spark_projects_string1')}
            onSparkClick={() => navigate('/home')}
          />
          <div className={styles.projectsContent}>
            {projects.map((data, index) => (
              <ProjectField
                key={index}
                name={data.name}
                technologies={[data.technologies.map((technology, indexA) => (
                  <TechnologyPreview
                    key={indexA}
                    colorHex={'2f5f6f'}
                    name={technology.name}
                    type={technology.type}
                  />
                ))]}
                description={data.description}
                references={[data.references.map((references, indexB) => (
                  <LinkPreview 
                    key={indexB}
                    name={references.name}
                    url={references.url}
                  />
                ))]}
                images_path={data.image_paths}
                technologiesTitle={findTextByTag(titles, 'technologies_title')}
                descriptionTitle={findTextByTag(titles, 'description_title')}
                linksTitle={findTextByTag(titles, 'links_title')}
              />
            ))}
          </div>
        </div>
      </div>
    )
}
