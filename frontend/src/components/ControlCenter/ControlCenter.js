import React from "react";
import BorderContainer from "../BorderContainer/BorderContainer";
import Buttons from "../Buttons/Buttons"
import Button from "../Button/Button"
import styles from './ControlCenter.module.css'
import { useMenuData } from "../../features/hooks/index.hooks";
import { ServerNotRespondPage } from "../../pages/ServerNotRespondPage/ServerNotRespondPage";
import { findTextByTag } from "../../utils/dataUtils";

import { LuSun, LuMoon, LuHouse, LuSquareUserRound, LuSquareChartGantt,
    LuMonitorCheck, LuSettings, LuPaperclip, LuPhone
 } from "react-icons/lu";

export const ControlCenter = ({navigate, onChangeLanguage, onChangeTheme, language, onCloseMenu, blockOrder = ["themes", "paths", "language"]}) => {
    const { data, isLoading, error } = useMenuData(language);

    const [themesBlockTitle, setThemesBlockTitle] = React.useState(null);
    const [themesBlockTheme, setThemesBlockTheme] = React.useState(styles.mainColor);
    const [pathsBlockTitle, setPathsBlockTitle] = React.useState(null);
    const [pathsBlockTheme, setPathsBlockTheme] = React.useState(styles.mainColor);
    const [languageBlockTitle, setLanguageBlockTitle] = React.useState(null);
    const [languageBlockTheme, setLanguageBlockTheme] = React.useState(styles.mainColor);

    function onChangeThemeTitleString(text) {
        if (text) {
            setThemesBlockTitle(text);
            setThemesBlockTheme(styles.secondaryColor);
        } else {
            setThemesBlockTitle(findTextByTag(titles, "themes_title"));
            setThemesBlockTheme(styles.mainColor);
        }
    }

    function onChangePathsTitleString(text) {
        if (text) {
            setPathsBlockTitle(text);
            setPathsBlockTheme(styles.secondaryColor);
        } else {
            setPathsBlockTitle(findTextByTag(titles, "paths_title"));
            setPathsBlockTheme(styles.mainColor);
        }
    }

    function onChangeLanguageTitleString(text) {
        if (text) {
            setLanguageBlockTitle(text);
            setLanguageBlockTheme(styles.secondaryColor);
        } else {
            setLanguageBlockTitle(findTextByTag(titles, "language_title"));
            setLanguageBlockTheme(styles.mainColor);
        }
    }

    if (isLoading) return <div className={styles.popUpMenu}>Loading...</div>;
    if (error) return (
        <div className={styles.popUpMenu}>
            <ServerNotRespondPage language={language} isInAllPage={false}/>;
        </div>
    )

    const titles = data['data']['data']['menu'];

    if (themesBlockTitle === null) {
        setThemesBlockTitle( findTextByTag(titles, "themes_title") );
    }
    if (pathsBlockTitle === null) {
        setPathsBlockTitle( findTextByTag(titles, "paths_title") );
    }
    if (languageBlockTitle === null) {
        setLanguageBlockTitle( findTextByTag(titles, "language_title") );
    }


    // Block definitions with order
    const blocks = {
        themes: (
            <div className={styles.controlCenterBlock} style={{order: blockOrder.indexOf("themes")}}>
                <h2 className={`${styles.controlCenterBlockTitle} ${themesBlockTheme}`}>{themesBlockTitle}</h2>
                <Buttons buttons={[
                    <Button
                        text={<LuSun/>}
                        isSmallPadding={true}
                        onButtonClick={() => onChangeTheme('light', true)}
                        onMouseEnter={() => onChangeThemeTitleString(findTextByTag(titles, "light_button"))}
                        onMouseLeave={() => onChangeThemeTitleString()}
                    />, 
                    <Button
                        text={<LuMoon/>}
                        isSmallPadding={true}
                        onButtonClick={() => onChangeTheme('dark', true)}
                        onMouseEnter={() => onChangeThemeTitleString(findTextByTag(titles, "dark_button"))}
                        onMouseLeave={() => onChangeThemeTitleString()}
                    />,
                ]}
                />
            </div>
        ),
        paths: (
            <div className={styles.controlCenterBlock} style={{order: blockOrder.indexOf("paths")}}>
                <h2 className={`${styles.controlCenterBlockTitle} ${pathsBlockTheme}`}>{pathsBlockTitle}</h2>
                <Buttons buttons={[
                    <Button
                        text={<LuHouse/>}
                        isSmallPadding={true}
                        onButtonClick={() => navigate('/home')}
                        onMouseEnter={() => onChangePathsTitleString( findTextByTag(titles, "home_button") )}
                        onMouseLeave={() => onChangePathsTitleString()}
                    />,
                    <Button
                        text={<LuSquareUserRound/>}
                        isSmallPadding={true}
                        onButtonClick={() => navigate('/about_me')}
                        onMouseEnter={() => onChangePathsTitleString( findTextByTag(titles, "about_me_button") )}
                        onMouseLeave={() => onChangePathsTitleString()}
                    />,
                    <Button
                        text={<LuSquareChartGantt/>}
                        isSmallPadding={true}
                        onButtonClick={() => navigate('/skills')}
                        onMouseEnter={() => onChangePathsTitleString( findTextByTag(titles, "skills_button") )}
                        onMouseLeave={() => onChangePathsTitleString()}
                    />,
                    <Button
                        text={<LuMonitorCheck />}
                        isSmallPadding={true}
                        onButtonClick={() => navigate('/projects')}
                        onMouseEnter={() => onChangePathsTitleString( findTextByTag(titles, "projects_button") )}
                        onMouseLeave={() => onChangePathsTitleString()}
                    />,
                    <Button
                        text={<LuSettings/>}
                        isSmallPadding={true}
                        onButtonClick={() => navigate('/work_experience')}
                        onMouseEnter={() => onChangePathsTitleString( findTextByTag(titles, "work_experience_button") )}
                        onMouseLeave={() => onChangePathsTitleString()}
                    />,
                    <Button
                        text={<LuPaperclip/>}
                        isSmallPadding={true}
                        onButtonClick={() => navigate('/education')}
                        onMouseEnter={() => onChangePathsTitleString( findTextByTag(titles, "education_button") )}
                        onMouseLeave={() => onChangePathsTitleString()}
                    />,
                    <Button
                        text={<LuPhone/>}
                        isSmallPadding={true}
                        onButtonClick={() => navigate('/contact')}
                        onMouseEnter={() => onChangePathsTitleString( findTextByTag(titles, "contact_button") )}
                        onMouseLeave={() => onChangePathsTitleString()}
                    />
                ]}
                />
            </div>
        ),
        language: (
            <div className={styles.controlCenterBlock} style={{order: blockOrder.indexOf("language")}}>
                <h2 className={`${styles.controlCenterBlockTitle} ${languageBlockTheme}`}>{languageBlockTitle}</h2>
                <Buttons buttons={[
                    <Button
                        text={"EN"}
                        isSmallPadding={true}
                        onButtonClick={() => onChangeLanguage('en', true)}
                        onMouseEnter={() => onChangeLanguageTitleString( findTextByTag(titles, "english_button") )}
                        onMouseLeave={() => onChangeLanguageTitleString()}
                    />,
                    <Button
                        text={"PL"}
                        isSmallPadding={true}
                        onButtonClick={() => onChangeLanguage('pl', true)}
                        onMouseEnter={() => onChangeLanguageTitleString( findTextByTag(titles, "polish_button") )}
                        onMouseLeave={() => onChangeLanguageTitleString()}
                    />,
                    <Button
                        text={"UK"}
                        isSmallPadding={true} 
                        onButtonClick={() => onChangeLanguage('ua', true)}
                        onMouseEnter={() => onChangeLanguageTitleString( findTextByTag(titles, "ukrainian_button") )}
                        onMouseLeave={() => onChangeLanguageTitleString()}
                    />
                ]}
                />
            </div>
        )
    };

    return (
        <div className={styles.popUpMenu}>
            <BorderContainer>
                <div className={styles.menu}>
                    {blockOrder.map(key => blocks[key])}
                </div>
            </BorderContainer>
        </div>
    )
};
