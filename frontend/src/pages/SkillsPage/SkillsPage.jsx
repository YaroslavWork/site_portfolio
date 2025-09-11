import { useNavigate } from "react-router-dom";
import { useSkillsData } from "../../features/hooks/index.hooks";

import styles from './SkillsPage.module.css';
import SparkField from "../../components/SparkField/SparkField";
import { findTextByTag } from "../../utils/dataUtils";
import SkillSearch from "../../components/SkillSearch/SkillSearch";
import TechnologyPreview from "../../components/TechnologyPreview/TechnologyPreview";
import SkillField from "../../components/SkillField/SkillField";



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
                <div className={styles.skills}>
                    <div className={styles.leftSkills}>
                        {skills.map((data, index) => {
                            if (index % 2 === 0) return (
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
                            />)
                        })}
                    </div>
                    <div className={styles.rightSkills}>
                        {skills.map((data, index) => {
                            if (index % 2 === 1) return (
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
                            />)
                        })}
                    </div>
                </div>
            </div>
        </div>  
    )
}