import { useNavigate } from "react-router-dom";
import { useSkillsData } from "../../features/hooks/index.hooks";

import styles from './SkillsPage.module.css';
import SparkField from "../../components/SparkField/SparkField";
import { findTextByTag } from "../../utils/dataUtils";

export const SkillsPage = () => {
    const navigate = useNavigate()

    const { data, isLoading, error } = useSkillsData();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading skills data</div>;

    const titles = data['data']['data']['titles'];
    const skills = data['data']['data']['skills'];
    
    return (
        <div className={styles.SkillsPage}>
            <div className={styles.mainContent}>
                <div className={styles.topContainer}>
                    <SparkField 
                        name={findTextByTag(titles, 'spark_skills_string1')}
                        onSparkClick={() => navigate('/home')}
                    />
                </div>
                <div className={styles.searchedSkills}>

                </div>
                <div className={styles.otherSkills}>

                </div>
            </div>
        </div>  
    )
}