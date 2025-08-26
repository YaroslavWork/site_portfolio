import Button from '../../components/Button/Button';
import CharacterField from '../../components/CharacterField/CharacterField';
import CVCode from '../../components/CVCode/CVCode';
import DescriptionWithButtons from '../../components/DescriptionWithButtons/DescriptionWithButtons';
import IconsWithButtons from '../../components/IconsWithButtonsField/IconsWithButtonsField';
import SparkField from '../../components/SparkField/SparkField';
import Title from '../../components/Title/Title';
import { useHomeData } from '../../features/hooks/index.hooks';
import styles from './HomePage.module.css';

import { FiGithub, FiLinkedin } from "react-icons/fi";


export const HomePage = () => {
    const { data, isLoading, error } = useHomeData();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading home data</div>;

    const titles = data['data']['data']['titles'];
    console.log(titles); // Debugging line to check titles

    return (
        <div className={styles.homePage}>
            <div className={styles.mainContent}>        
                <SparkField text={find_text_by_tag(titles, 'spark_main_page_string1')} onSparkClick={() => console.log('Spark is clicked')}/>
                

                <div className={styles.columns}>
                    <div className={styles.smallColumn}>
                        <CharacterField name={find_text_by_tag(titles, 'name')}/>
                        <IconsWithButtons 
                            iconsWithLinks={[
                                { icon: <FiGithub/>, link: "https://github.com/YaroslavWork"},
                                { icon: <FiLinkedin/>, link: "https://www.linkedin.com/"}
                            ]}
                            buttons={[
                                <Button text={find_text_by_tag(titles, 'contact_button')}/>
                            ]}
                        />
                    </div>
                    
                    <div className={styles.bigColumn}>
                        <Title text={find_text_by_tag(titles, 'position')} isPrimary={true}/>
                        <DescriptionWithButtons 
                            text={find_text_by_tag(titles, 'short_description')}
                            buttons={[
                                <Button text={find_text_by_tag(titles, 'about_me_button')}/>,
                                <Button text={find_text_by_tag(titles, 'skills_button')}/>,
                                <Button text={find_text_by_tag(titles, 'projects_button')}/>,
                            ]}
                        />
                        <CVCode prompt={find_text_by_tag(titles, 'personality_code_description')} code={'test1'}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

function find_text_by_tag(data, tag) {
    return data.find(obj => obj.title === tag).text
}