import { useNavigate } from "react-router-dom";
import SparkField from "../../components/SparkField/SparkField";
import { useEducationData } from "../../features/hooks/index.hooks";
import { findTextByTag } from "../../utils/dataUtils";
import styles from './EducationPage.module.css'; 
import CoursesField from "../../components/CoursesField/CoursesField";
import UniversitiesField from "../../components/UniversitiesField/UniversitesField";
import { ServerNotRespondPage } from "../ServerNotRespondPage/ServerNotRespondPage";

export const EducationPage = () => {
    const navigate = useNavigate()

    const { data, isLoading, error } = useEducationData();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <ServerNotRespondPage/>;

    const titles = data['data']['data']['titles'];
    const courses = data['data']['data']['courses'];
    const educations = data['data']['data']['educations'];

    return (
        <div className={styles.educationPage}>
            <div className={styles.mainContent}>
                <SparkField text={findTextByTag(titles, 'spark_education_string1')} onSparkClick={() => navigate('/home')} />
                <CoursesField title={findTextByTag(titles, 'courses_title')} courses={courses} />
                <UniversitiesField title={findTextByTag(titles, 'education_title')} universities={educations} />
            </div>
        </div>
    )
}