import React from 'react'
import { useProjectsData } from '../../features/hooks/index.hooks';
import { useNavigate } from 'react-router-dom';
import SparkField from '../../components/SparkField/SparkField';
import { findTextByTag } from '../../utils/dataUtils';

import styles from './ProjectsPage.module.css'
import LinkPreview from '../../components/LinkPreview/LinkPreview';

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
            <LinkPreview name={'Github'} url={'https://github.com/YaroslavWork/RareHashesWebsite'}/>
          </div>
        </div>
      </div>
    )
}
