import { useNavigate } from "react-router-dom";
import SparkField from "../../components/SparkField/SparkField";
import { useWorkExperienceData } from "../../features/hooks/index.hooks";
import styles from './WorkExperiencePage.module.css'
import { findTextByTag } from "../../utils/dataUtils";

export const WorkExperiencePage = () => {
    const navigate = useNavigate()

    const { data, isLoading, error } = useWorkExperienceData();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading home data</div>;

    const titles = data['data']['data']['titles'];
    const it_jobs = data['data']['data']['it_jobs'];
    const other_jobs = data['data']['data']['other_jobs'];

    return (
      <div className={styles.homePage}>
        <div className={styles.mainContent}>
            <SparkField text={findTextByTag(titles, 'spark_work_experience_string1')} onSparkClick={() => navigate('/home')}/>
        </div>
      </div>
    )
}