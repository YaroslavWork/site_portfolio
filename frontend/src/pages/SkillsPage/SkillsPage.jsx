import { useNavigate } from "react-router-dom";
import { useSkillsData } from "../../features/hooks/index.hooks";

import styles from './SkillsPage.module.css';
import SparkField from "../../components/SparkField/SparkField";
import { findTextByTag } from "../../utils/dataUtils";
import SearchBar from "../../components/SearchBar/SearchBar";
import SkillSearch from "../../components/SkillSearch/SkillSearch";
import TechnologyPreview from "../../components/TechnologyPreview/TechnologyPreview";



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
                        text={findTextByTag(titles, 'spark_skills_string1')}
                        onSparkClick={() => navigate('/home')}
                    />
                    <SkillSearch 
                        onSearchClick={() => console.log("Search")}
                        searchedTechnologies={[
                            <TechnologyPreview colorHex={"79CD79"} name={"Django"} type={"framework"}/>,
                            <TechnologyPreview colorHex={"CD8F79"} name={"Docker"} type={"devOps"}/>,
                            <TechnologyPreview colorHex={"799BCD"} name={"Python"} type={"programming language"}/>,
                            <TechnologyPreview colorHex={"799BCD"} name={"JavaScript"} type={"programming language"}/>,
                        ]}
                    />
                </div>
                <div className={styles.searchedSkills}>

                </div>
                <div className={styles.otherSkills}>

                </div>
            </div>
        <h3>Titles</h3>
        {titles.map((data, index) => (
            <p key={index}>{data.title}: {data.text}</p>
        ))}
        <h3>Skills</h3>
        {skills.map((data, index) => (
            <p key={index}>{data.title} - {data.type}: {data.stuff_i_know}; {data.stuff_i_learn}; {data.stuff_i_plan}</p>
        ))}
        </div>  
    )
}