import { useNavigate } from "react-router-dom";
import { useSkillsData } from "../../features/hooks/index.hooks";

import styles from './SkillsPage.module.css';
import anim from '../../animations/shake.module.css'
import SparkField from "../../components/SparkField/SparkField";
import { findTextByTag } from "../../utils/dataUtils";
import SkillSearch from "../../components/SkillSearch/SkillSearch";
import TechnologyPreview from "../../components/TechnologyPreview/TechnologyPreview";
import SkillField from "../../components/SkillField/SkillField";
import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { ServerNotRespondPage } from "../ServerNotRespondPage/ServerNotRespondPage";

export const renderSkillField = (data, index, titles) => {
    return (
        <SkillField
            technologyName={data.title}
            technologyType={data.type}
            usedInProjects = {data.used_in_projects}
            usedInProjectsTitle = {findTextByTag(titles, 'used_in_projects_title')}
            whatIKnowTitle={findTextByTag(titles, 'what_i_know_title')}
            whatIKnowText={data.stuff_i_know}
            whatImLearningTitle={findTextByTag(titles, 'what_i_learn_title')}
            whatImLearningText={data.stuff_i_learn}
            whatIPlanTitle={findTextByTag(titles, 'what_i_plan_title')}
            whatIPlanText={data.stuff_i_plan}
            key={index}
        />
    )
}

export const SkillsPage = ({language='en', onChangeLanguage, onChangeTheme}) => {
    const navigate = useNavigate()

    const [searchText, setSearchText] = useState('');

    const { data, isLoading, error } = useSkillsData(language, searchText);
    
    const [isShaking, setIsShaking] = useState(false);
    const startShakeAnimation = () => {
        setIsShaking(true);

        setTimeout(() => {
            setIsShaking(false);
        }, 1000);
    };

    const handleSearchChange = (text) => {
        setSearchText(text);
        
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <ServerNotRespondPage language={language}/>;

    const titles = data['data']['data']['titles'];
    const searched_skills = data['data']['data']['searched_skills'];
    const other_skills = data['data']['data']['skills'];
    

    const all_skills = [...searched_skills, ...other_skills];
    
    return (
        <div className={`${isShaking ? anim.shake : ''} ${styles.skillsPage}`} onAnimationEnd={() => setIsShaking(false)}>
            <div className={styles.mainContent}>
                <div className={styles.topContainer}>
                    <div className={styles.topLeftContainer}>
                        <SparkField 
                            text={findTextByTag(titles, 'spark_skills_string1')}
                            onSparkClick={() => navigate('/home')}
                            onSparkEnergyClick={() => startShakeAnimation()}
                            navigate={navigate}
                            onChangeLanguage={onChangeLanguage}
                            onChangeTheme={onChangeTheme}
                            language={language}
                        />
                        <Button text={findTextByTag(titles, 'projects_button')} onButtonClick={() => navigate('/projects')}/>
                    </div>
                    <SkillSearch
                        value={searchText}
                        onSearchClick={handleSearchChange}
                        searchedTechnologies={
                            searched_skills.map((data, index) => (
                                <TechnologyPreview
                                    key={index}
                                    name={data.title}
                                    type={data.type}
                                    hueColor={data.hue_color}
                                />
                            ))
                        }
                    />
                </div>
                <div className={styles.skills}>
                    <div className={styles.leftSkills}>
                        {all_skills.map((data, index) => {
                            if (index % 2 === 0) return renderSkillField(data, index, titles)
                        })}
                    </div>
                    <div className={styles.rightSkills}>
                        {all_skills.map((data, index) => {
                            if (index % 2 === 1) return renderSkillField(data, index, titles)
                        })}
                    </div>
                </div>
                <div className={styles.smallScreenSkills}>
                    <div className={styles.leftSkills}>
                        {all_skills.map((data, index) => {
                            return renderSkillField(data, index, titles)
                        })}
                    </div>
                </div>
            </div>
        </div>  
    )
}