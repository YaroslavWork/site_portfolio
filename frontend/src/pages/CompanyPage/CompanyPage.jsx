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
import { renderSkillField } from '../SkillsPage/SkillsPage';
import CVCode from "../../components/CVCode/CVCode";
import { GlobalStateContext } from "../../features/hooks/globalStateContext";
import { useContext } from "react";
import { ServerNotRespondPage } from "../ServerNotRespondPage/ServerNotRespondPage";

export const CompanyPage = ({language='en', onChangeLanguage, onChangeTheme}) => {
    const navigate = useNavigate()
    const { companyCode } = useParams()
    const { globalString } = useContext(GlobalStateContext);

    const { data, isLoading, isError, error } = useCompanyData(companyCode, language);

    if (isLoading) return <div>Loading...</div>;
    if (isError) {
        if (error.response && error.response.status === 404) {
            const titles = error.response.data.data.titles
            return (
                <div className={styles.companyNotFoundPage}>
                    <SparkField
                        text={findTextByTag(titles, 'spark_company_not_found_string1')}
                        onSparkClick={() => navigate('/home')}
                        navigate={navigate}
                        onChangeLanguage={onChangeLanguage}
                        onChangeTheme={onChangeTheme}
                        language={language}
                    />
                    <CVCode
                        prompt={null}
                        code={globalString}
                        checkCompanyCodeText={findTextByTag(titles, 'check_company_code_button')}
                        navigate={navigate}
                    />
                </div>
            )
        }
        return <ServerNotRespondPage language={language}/>;
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
                    navigate={navigate}
                    onChangeLanguage={onChangeLanguage}
                    onChangeTheme={onChangeTheme}
                    language={language}
                    allowHTML={true}
                    color={diffInfo['color']}    
                />
                <Title text={findTextByTag(titles, 'company_main_title')} isPrimary={true} allowHTML={true} color={diffInfo['color']}/>
                <div className={styles.content}>
                    <div className={styles.mainPanel}>
                        <IconsWithButtonsField 
                            iconsWithLinks={[
                                { icon: <FiGithub/>, link: findTextByTag(titles, 'github_path'), color: diffInfo['color']},
                                { icon: <FiLinkedin/>, link: findTextByTag(titles, 'linkedin_path'), color: diffInfo['color']}
                            ]}
                            buttons={[
                                <Button text={findTextByTag(titles, 'contact_button')} color={diffInfo['color']} onButtonClick={() => navigate('/contact')}/>
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
                                <Button text={findTextByTag(titles, 'skills_button')} onButtonClick={() => navigate('/skills')}/>,
                            ]}
                        />
                        <TitleWithButtons
                            title={findTextByTag(titles, 'projects_title')}
                            buttons={[
                                <Button text={findTextByTag(titles, 'projects_button')} onButtonClick={() => navigate('/projects')}/>,
                            ]}
                        />
                        <TitleWithButtons
                            title={findTextByTag(titles, 'home_title')}
                            buttons={[
                                <Button text={findTextByTag(titles, 'home_button')} isPrimary={false} onButtonClick={() => navigate('/home')}/>,
                            ]}
                        />
                    </div>
                    <div className={styles.showcase}>
                        <DescriptionWithButtons
                            text={findTextByTag(titles, 'company_description_title')}
                            color={diffInfo['color']}
                        />
                        <Title text={findTextByTag(titles, 'company_skills_title')} isPrimary={true} smallerText={true} allowHTML={true} color={diffInfo['color']}/>
                        {skills.map((data, index) => (
                            renderSkillField(data, index, titles)
                        ))}
                    </div>
                </div>

                <div className={styles.contentForSmallerScreen}>
                        <DescriptionWithButtons
                                text={findTextByTag(titles, 'company_description_title')}
                                color={diffInfo['color']}
                            />
                        <IconsWithButtonsField 
                            iconsWithLinks={[
                                { icon: <FiGithub/>, link: findTextByTag(titles, 'github_path'), color: diffInfo['color']},
                                { icon: <FiLinkedin/>, link: findTextByTag(titles, 'linkedin_path'), color: diffInfo['color']}
                            ]}
                            buttons={[
                                <Button text={findTextByTag(titles, 'contact_button')} color={diffInfo['color']} onButtonClick={() => navigate('/contact')}/>
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
                        <Title text={findTextByTag(titles, 'company_skills_title')} isPrimary={true} allowHTML={true} color={diffInfo['color']}/>
                        {skills.map((data, index) => (
                            renderSkillField(data, index, titles)
                        ))}
                        <TitleWithButtons
                            title={findTextByTag(titles, 'other_skills_title')}
                            buttons={[
                                <Button text={findTextByTag(titles, 'skills_button')} onButtonClick={() => navigate('/skills')}/>,
                            ]}
                        />
                        <TitleWithButtons
                            title={findTextByTag(titles, 'projects_title')}
                            buttons={[
                                <Button text={findTextByTag(titles, 'projects_button')} onButtonClick={() => navigate('/projects')}/>,
                            ]}
                        />
                        <TitleWithButtons
                            title={findTextByTag(titles, 'home_title')}
                            buttons={[
                                <Button text={findTextByTag(titles, 'home_button')} isPrimary={false} onButtonClick={() => navigate('/home')}/>,
                            ]}
                        />
                </div>
            </div>
        </div>
    )
}