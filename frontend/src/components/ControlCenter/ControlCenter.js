import BorderContainer from "../BorderContainer/BorderContainer";
import Buttons from "../Buttons/Buttons"
import Button from "../Button/Button"
import styles from './ControlCenter.module.css'
import { useMenuData } from "../../features/hooks/index.hooks";
import { ServerNotRespondPage } from "../../pages/ServerNotRespondPage/ServerNotRespondPage";
import { findTextByTag } from "../../utils/dataUtils";

import { IoClose } from "react-icons/io5";

export const ControlCenter = ({navigate, onChangeLanguage, onChangeTheme, language, onCloseMenu}) => {
    const { data, isLoading, error } = useMenuData(language);
    
    if (isLoading) return <div className={styles.popUpMenu}>Loading...</div>;
    if (error) return (
        <div className={styles.popUpMenu}>
            <ServerNotRespondPage language={language} isInAllPage={false}/>;
        </div>
    )

    const titles = data['data']['data']['menu'];

    return (
        <div className={styles.popUpMenu}>
            <BorderContainer>
                <div className={styles.popUpButton}>
                    <Button text={<IoClose />} color={"--danger"} isSmallPadding={true} onButtonClick={() => onCloseMenu()}/>
                </div>
                <h1 className={styles.controlCenterTitle}>{findTextByTag(titles, "control_center_title")}</h1>
                <h2 className={styles.controlCenterBlockTitle}>{findTextByTag(titles, "paths_title")}</h2>
                <Buttons buttons={[
                    <Button text={findTextByTag(titles, "home_button")} isSmallPadding={true} onButtonClick={() => navigate('/home')}/>,
                    <Button text={findTextByTag(titles, "about_me_button")} isSmallPadding={true} onButtonClick={() => navigate('/about_me')}/>,
                    <Button text={findTextByTag(titles, "skills_button")} isSmallPadding={true} onButtonClick={() => navigate('/skills')}/>,
                    <Button text={findTextByTag(titles, "projects_button")} isSmallPadding={true} onButtonClick={() => navigate('/projects')}/>,
                    <Button text={findTextByTag(titles, "work_experience_button")} isSmallPadding={true} onButtonClick={() => navigate('/work_experience')}/>,
                    <Button text={findTextByTag(titles, "education_button")} isSmallPadding={true} onButtonClick={() => navigate('/education')}/>,
                    <Button text={findTextByTag(titles, "contact_button")} isSmallPadding={true} onButtonClick={() => navigate('/contact')}/>
                ]}
                />
                <h2 className={styles.controlCenterBlockTitle}>{findTextByTag(titles, "language_title")}</h2>
                <Buttons buttons={[
                    <Button text={findTextByTag(titles, "default_button")} isPrimary={false} isSmallPadding={true} onButtonClick={() => onChangeLanguage('default', true)}/>,
                    <Button text={findTextByTag(titles, "english_button")} isSmallPadding={true} onButtonClick={() => onChangeLanguage('en', true)}/>,
                    <Button text={findTextByTag(titles, "polish_button")} isSmallPadding={true} onButtonClick={() => onChangeLanguage('pl', true)}/>,
                    <Button text={findTextByTag(titles, "ukrainian_button")} isSmallPadding={true} onButtonClick={() => onChangeLanguage('ua', true)}/>
                ]}
                />
                <h2 className={styles.controlCenterBlockTitle}>{findTextByTag(titles, "themes_title")}</h2>
                <Buttons buttons={[
                    <Button text={findTextByTag(titles, "default_button")} isPrimary={false} isSmallPadding={true} onButtonClick={() => onChangeTheme('default', true)}/>,
                    <Button text={findTextByTag(titles, "light_button")} isSmallPadding={true} onButtonClick={() => onChangeTheme('light', true)}/>,
                    <Button text={findTextByTag(titles, "dark_button")} isSmallPadding={true} onButtonClick={() => onChangeTheme('dark', true)}/>,
                ]}
                />
            </BorderContainer>
        </div>
    )
};
