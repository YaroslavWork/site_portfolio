import { useNavigate, useParams } from "react-router-dom";
import { useCompanyData } from '../../features/hooks/index.hooks';
import styles from './CompanyPage.module.css'
import SparkField from "../../components/SparkField/SparkField";
import { findTextByTag } from "../../utils/dataUtils";
import IconsWithButtonsField from "../../components/IconsWithButtonsField/IconsWithButtonsField";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import Button from "../../components/Button/Button";
import TitleWithButtons from "../../components/TitleWithButtons/TitleWithButtons";
import Title from "../../components/Title/Title";
import DescriptionWithButtons from "../../components/DescriptionWithButtons/DescriptionWithButtons";
import SkillField from "../../components/SkillField/SkillField";

export const CompanyPage = () => {
    const navigate = useNavigate()
    const { companyCode } = useParams()

    const { data, isLoading, isError, error } = useCompanyData(companyCode);

    if (isLoading) return <div>Loading...</div>;
    if (isError) {
        if (error.response && error.response.status === 404) {
            return <div>Company with code '{companyCode}' not found.</div>;
        }
        return <div>An unexpected error occurred.</div>;
    }

    const titles = data['data']['titles'];
    const skills = data['data']['skills'];
    const diffInfo = data['data']['other_data'];

    //diffInfo['color'] = 'ff5733'

    return (
        <div className={styles.companyPage}>
            <div className={styles.mainContent}>  
                <SparkField
                    text={findTextByTag(titles, 'spark_company_string1')}
                    onSparkClick={() => navigate('/home')}
                    allowHTML={true}
                    color={diffInfo['color']}    
                />
                <Title text={findTextByTag(titles, 'company_main_title')} isPrimary={true} allowHTML={true} color={diffInfo['color']}/>
                <div className={styles.content}>
                    <div className={styles.mainPanel}>
                        <IconsWithButtonsField 
                            iconsWithLinks={[
                                { icon: <FiGithub/>, link: "https://github.com/YaroslavWork", color: diffInfo['color']},
                                { icon: <FiLinkedin/>, link: "https://www.linkedin.com/", color: diffInfo['color']}
                            ]}
                            buttons={[
                                <Button text={findTextByTag(titles, 'contact_button')} color={diffInfo['color']}/>
                            ]}
                        />
                        <TitleWithButtons
                            title={findTextByTag(titles, 'cv_title')}
                            buttons={[
                                <Button text={findTextByTag(titles, 'download_pdf_button')} color={diffInfo['color']}/>,
                            ]}
                        />
                        <TitleWithButtons
                            title={findTextByTag(titles, 'cover_letter_title')}
                            buttons={[
                                <Button text={findTextByTag(titles, 'download_pdf_button')} color={diffInfo['color']}/>,
                            ]}
                        />
                        <TitleWithButtons
                            title={findTextByTag(titles, 'other_skills_title')}
                            buttons={[
                                <Button text={findTextByTag(titles, 'skills_button')}/>,
                            ]}
                        />
                        <TitleWithButtons
                            title={findTextByTag(titles, 'projects_title')}
                            buttons={[
                                <Button text={findTextByTag(titles, 'projects_button')}/>,
                            ]}
                        />
                        <TitleWithButtons
                            title={findTextByTag(titles, 'home_title')}
                            buttons={[
                                <Button text={findTextByTag(titles, 'home_button')} isPrimary={false}/>,
                            ]}
                        />
                    </div>
                    <div className={styles.showcase}>
                        <DescriptionWithButtons
                            text={findTextByTag(titles, 'company_description_title')}
                            color={diffInfo['color']}
                        />
                        <Title text={findTextByTag(titles, 'company_skills_title')} isPrimary={true} allowHTML={true} color={diffInfo['color']}/>
                        {skills.map((data, index) => (
                            <SkillField
                                technologyName={data.title}
                                technologyType={data.type}
                                whatIKnowTitle={findTextByTag(titles, 'what_i_know_title')}
                                whatIKnowText={data.stuff_i_know}
                                whatImLearningTitle={findTextByTag(titles, 'what_i_learn_title')}
                                whatImLearningText={data.stuff_i_learn}
                                whatIPlanTitle={findTextByTag(titles, 'what_i_plan_title')}
                                whatIPlanText={data.stuff_i_plan}
                                key={index}
                                color={diffInfo['color']}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}