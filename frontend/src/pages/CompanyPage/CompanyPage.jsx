import { useNavigate, useParams } from "react-router-dom";
import { useCompanyCoverLetterData, useCompanyCVData, useCompanyData } from '../../features/hooks/index.hooks';
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
import React, { useContext, useEffect, useState } from "react";
import { ServerNotRespondPage } from "../ServerNotRespondPage/ServerNotRespondPage";


const downloadBlob = (blob, fileName) => {
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
};

export const CompanyPage = ({language='en', onChangeLanguage, onChangeTheme}) => {
    const navigate = useNavigate()
    const { companyCode } = useParams()
    const { globalString } = useContext(GlobalStateContext);

    const [isDefaultStyle, setIsDefaultStyle] = useState(false);

    const {
        data: cvData, 
        isLoading: isCvLoading, 
        isError: isCvError, 
        error: cvError 
    } = useCompanyCVData(companyCode);

    const {
        data: coverLetterData, 
        isLoading: isCoverLetterLoading, 
        isError: isCoverLetterError, 
        error: coverLetterError 
    } = useCompanyCoverLetterData(companyCode);

    const { 
        data: companyData, 
        isLoading: isCompanyDataLoading, 
        isError: isCompanyDataError, 
        error: companyDataError 
    } = useCompanyData(companyCode, language);

    if (isCvLoading) {
        return <div>CV is loading...</div>;
    }
    if (isCoverLetterLoading) {
        return <div>Cover Letter is loading...</div>;
    }
    if (isCompanyDataLoading) {
        return <div>Company Page Loading...</div>;
    }

    if (isCompanyDataError) {
        if (companyDataError.response && companyDataError.response.status === 404) {
            const titles = companyDataError.response.data.data.titles
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

    const changePageStyle = () => {
        setIsDefaultStyle(!isDefaultStyle);
    }

    const handleDownloadClick = (url, name) => {
        downloadBlob(url, name);
    };

    const titles = companyData['data']['titles'];
    const skills = companyData['data']['skills'];
    const diffInfo = companyData['data']['other_data'];

    const colorHue = isDefaultStyle ? null : diffInfo['color'];

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
                    colorHue={colorHue}
                    onChangeStyle={changePageStyle}
                />
                <Title text={findTextByTag(titles, 'company_main_title')} isPrimary={true} allowHTML={true} colorHue={colorHue}/>
                <div className={styles.content}>
                    <div className={styles.mainPanel}>
                        <IconsWithButtonsField 
                            iconsWithLinks={[
                                { icon: <FiGithub/>, link: findTextByTag(titles, 'github_path'), colorHue: colorHue},
                                { icon: <FiLinkedin/>, link: findTextByTag(titles, 'linkedin_path'), colorHue: colorHue}
                            ]}
                            buttons={[
                                <Button text={findTextByTag(titles, 'contact_button')} colorHue={colorHue} onButtonClick={() => navigate('/contact')}/>
                            ]}
                        />
                        <TitleWithButtons
                            title={findTextByTag(titles, 'cv_title')}
                            buttons={[
                                <Button
                                    text={findTextByTag(titles, 'download_pdf_button')}
                                    colorHue={colorHue}
                                    onButtonClick={() => handleDownloadClick(cvData, `CV for ${diffInfo['company_name']}`)}
                                />,
                            ]}
                        />
                        <TitleWithButtons
                            title={findTextByTag(titles, 'cover_letter_title')}
                            buttons={[
                                <Button
                                    text={findTextByTag(titles, 'download_pdf_button')}
                                    colorHue={colorHue}
                                    onButtonClick={() => handleDownloadClick(coverLetterData, `Cover Letter for ${diffInfo['company_name']}`)}
                                />,
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
                            colorHue={colorHue}
                        />
                        <Title text={findTextByTag(titles, 'company_skills_title')} isPrimary={true} smallerText={true} allowHTML={true} colorHue={colorHue}/>
                        {skills.map((data, index) => (
                            renderSkillField(data, index, titles)
                        ))}
                    </div>
                </div>

                <div className={styles.contentForSmallerScreen}>
                        <DescriptionWithButtons
                                text={findTextByTag(titles, 'company_description_title')}
                                colorHue={colorHue}
                            />
                        <IconsWithButtonsField 
                            iconsWithLinks={[
                                { icon: <FiGithub/>, link: findTextByTag(titles, 'github_path'), colorHue: colorHue},
                                { icon: <FiLinkedin/>, link: findTextByTag(titles, 'linkedin_path'), colorHue: colorHue}
                            ]}
                            buttons={[
                                <Button text={findTextByTag(titles, 'contact_button')} colorHue={colorHue} onButtonClick={() => navigate('/contact')}/>
                            ]}
                        />
                        <TitleWithButtons
                            title={findTextByTag(titles, 'cv_title')}
                            buttons={[
                                <Button
                                    text={findTextByTag(titles, 'download_pdf_button')}
                                    colorHue={colorHue}
                                    onButtonClick={() => handleDownloadClick(cvData, `CV for ${diffInfo['company_name']}`)}
                                />,
                            ]}
                        />
                        <TitleWithButtons
                            title={findTextByTag(titles, 'cover_letter_title')}
                            buttons={[
                                <Button
                                    text={findTextByTag(titles, 'download_pdf_button')}
                                    colorHue={colorHue}
                                    onButtonClick={() => handleDownloadClick(coverLetterData, `Cover Letter for ${diffInfo['company_name']}`)}
                                />,
                            ]}
                        />
                        <Title text={findTextByTag(titles, 'company_skills_title')} isPrimary={true} allowHTML={true} colorHue={colorHue}/>
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