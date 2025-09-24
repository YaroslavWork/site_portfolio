import { useNavigate } from "react-router-dom";
import SparkField from "../../components/SparkField/SparkField";
import { useWorkExperienceData } from "../../features/hooks/index.hooks";
import styles from './WorkExperiencePage.module.css'
import { findTextByTag } from "../../utils/dataUtils";
import JobsContainer from "../../components/JobsContainer/JobsContainer";
import Button from "../../components/Button/Button";
import { ServerNotRespondPage } from "../ServerNotRespondPage/ServerNotRespondPage";

export const WorkExperiencePage = ({language='en', onChangeLanguage, onChangeTheme}) => {
    const navigate = useNavigate()

    const { data, isLoading, error } = useWorkExperienceData(language);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <ServerNotRespondPage language={language}/>;

    const titles = data['data']['data']['titles'];
    const it_jobs = data['data']['data']['it_jobs'];
    const other_jobs = data['data']['data']['other_jobs'];

    return (
      <div className={styles.workExperiencePage}>
        <div className={styles.mainContent}>
            <SparkField
                text={findTextByTag(titles, 'spark_work_experience_string1')}
                onSparkClick={() => navigate('/home')}
                navigate={navigate}
                onChangeLanguage={onChangeLanguage}
                onChangeTheme={onChangeTheme}
                language={language}
            />
            <JobsContainer 
                title={findTextByTag(titles, 'it_jobs_title')}
                noWorkDescription={findTextByTag(titles, 'it_job_none_description')}
                nowText={findTextByTag(titles, 'you_are_here_title')}
                jobs={it_jobs}
                ContactButton={<Button
                    text={findTextByTag(titles, 'contact_button')}
                    onButtonClick={() => navigate('/contact')}
                />}
                yearInPx={200}
            />
            <JobsContainer
                title={findTextByTag(titles, 'other_jobs_title')}
                noWorkDescription={findTextByTag(titles, 'it_job_none_description')}
                nowText={findTextByTag(titles, 'you_are_here_title')}
                jobs={other_jobs}
                yearInPx={200}
            />
        </div>
      </div>
    )
}