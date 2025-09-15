import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

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
import { ServerNotRespondPage } from '../ServerNotRespondPage/ServerNotRespondPage';


export const HomePage = () => {
    const navigate = useNavigate()

    const { data, isLoading, error } = useHomeData();
    const { globalString } = useContext(GlobalStateContext);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <ServerNotRespondPage/>;

    const titles = data['data']['data']['titles'];

    return (
        <div className={styles.homePage}>
            <div className={styles.mainContent}>        
                <SparkField text={findTextByTag(titles, 'spark_main_page_string1')} onSparkClick={() => navigate('/home')}/>
                

                <div className={styles.columns}>
                    <div className={styles.smallColumn}>
                        <CharacterField name={findTextByTag(titles, 'name')}/>
                        <IconsWithButtons 
                            iconsWithLinks={[
                                { icon: <FiGithub/>, link: findTextByTag(titles, 'github_path')},
                                { icon: <FiLinkedin/>, link: findTextByTag(titles, 'linkedin_path')}
                            ]}
                            buttons={[
                                <Button text={findTextByTag(titles, 'contact_button')} onButtonClick={() => navigate('/contact')}/>
                            ]}
                        />
                    </div>
                    
                    <div className={styles.bigColumn}>
                        <Title text={findTextByTag(titles, 'position')} isPrimary={true}/>
                        <DescriptionWithButtons 
                            text={findTextByTag(titles, 'short_description')}
                            buttons={[
                                <Button text={findTextByTag(titles, 'about_me_button')} onButtonClick={() => navigate('/about_me')}/>,
                                <Button text={findTextByTag(titles, 'skills_button')} onButtonClick={() => navigate('/skills')}/>,
                                <Button text={findTextByTag(titles, 'projects_button')} onButtonClick={() => navigate('/projects')}/>,
                            ]}
                        />
                        <CVCode 
                            prompt={findTextByTag(titles, 'personality_code_description')}
                            code={globalString}
                            checkCompanyCodeText={findTextByTag(titles, 'check_company_code_button')}
                            navigate={navigate}
                        />
                    </div>
                </div>

                <div className={styles.columnsForSmallerScreen}>
                    <CharacterField name={findTextByTag(titles, 'name')}/>
                    <Title text={findTextByTag(titles, 'position')} isPrimary={true}/>
                    <DescriptionWithButtons 
                        text={findTextByTag(titles, 'short_description')}
                        buttons={[
                            <Button text={findTextByTag(titles, 'about_me_button')} onButtonClick={() => navigate('/about_me')}/>,
                            <Button text={findTextByTag(titles, 'skills_button')} onButtonClick={() => navigate('/skills')}/>,
                            <Button text={findTextByTag(titles, 'projects_button')} onButtonClick={() => navigate('/projects')}/>,
                        ]}
                    />
                    <CVCode 
                        prompt={findTextByTag(titles, 'personality_code_description')}
                        code={globalString}
                        checkCompanyCodeText={findTextByTag(titles, 'check_company_code_button')}
                        navigate={navigate}
                    />
                    <IconsWithButtons 
                        iconsWithLinks={[
                            { icon: <FiGithub/>, link: findTextByTag(titles, 'github_path')},
                            { icon: <FiLinkedin/>, link: findTextByTag(titles, 'linkedin_path')}
                        ]}
                        buttons={[
                            <Button text={findTextByTag(titles, 'contact_button')} onButtonClick={() => navigate('/contact')}/>
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}