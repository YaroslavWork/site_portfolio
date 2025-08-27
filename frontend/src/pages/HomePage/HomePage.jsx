import { useContext } from 'react';

import Button from '../../components/Button/Button';
import CharacterField from '../../components/CharacterField/CharacterField';
import CVCode from '../../components/CVCode/CVCode';
import DescriptionWithButtons from '../../components/DescriptionWithButtons/DescriptionWithButtons';
import IconsWithButtons from '../../components/IconsWithButtonsField/IconsWithButtonsField';
import SparkField from '../../components/SparkField/SparkField';
import Title from '../../components/Title/Title';
import { useHomeData } from '../../features/hooks/index.hooks';
import styles from './HomePage.module.css';
import { GlobalStateContext } from '../../features/hooks/globalStateContext';

import { FiGithub, FiLinkedin } from "react-icons/fi";

import { findTextByTag } from '../../utils/dataUtils';


export const HomePage = () => {
    const { data, isLoading, error } = useHomeData();
    const { globalString } = useContext(GlobalStateContext);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading home data</div>;

    const titles = data['data']['data']['titles'];

    return (
        <div className={styles.homePage}>
            <div className={styles.mainContent}>        
                <SparkField text={findTextByTag(titles, 'spark_main_page_string1')} onSparkClick={() => console.log('Spark is clicked')}/>
                

                <div className={styles.columns}>
                    <div className={styles.smallColumn}>
                        <CharacterField name={findTextByTag(titles, 'name')}/>
                        <IconsWithButtons 
                            iconsWithLinks={[
                                { icon: <FiGithub/>, link: "https://github.com/YaroslavWork"},
                                { icon: <FiLinkedin/>, link: "https://www.linkedin.com/"}
                            ]}
                            buttons={[
                                <Button text={findTextByTag(titles, 'contact_button')}/>
                            ]}
                        />
                    </div>
                    
                    <div className={styles.bigColumn}>
                        <Title text={findTextByTag(titles, 'position')} isPrimary={true}/>
                        <DescriptionWithButtons 
                            text={findTextByTag(titles, 'short_description')}
                            buttons={[
                                <Button text={findTextByTag(titles, 'about_me_button')}/>,
                                <Button text={findTextByTag(titles, 'skills_button')}/>,
                                <Button text={findTextByTag(titles, 'projects_button')}/>,
                            ]}
                        />
                        <CVCode prompt={find_text_by_tag(titles, 'personality_code_description')} code={globalString}/>
                    </div>
                </div>
            </div>
        </div>
    );
}