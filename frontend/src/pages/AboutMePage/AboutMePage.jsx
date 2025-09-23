import { useNavigate } from 'react-router-dom';

import Book from '../../components/Book/Book';
import Button from '../../components/Button/Button';
import CharacterField from '../../components/CharacterField/CharacterField';
import DescriptionWithButtons from '../../components/DescriptionWithButtons/DescriptionWithButtons';
import SparkField from '../../components/SparkField/SparkField';
import TitleWithButtons from '../../components/TitleWithButtons/TitleWithButtons';
import { useAboutMeData } from '../../features/hooks/index.hooks';
import { findTextByTag } from '../../utils/dataUtils';
import styles from './AboutMePage.module.css';
import BooksField from '../../components/BooksField/BooksField';
import Hobby from '../../components/Hobby/Hobby';
import HobbiesField from '../../components/HobbiesField/HobbiesField';
import { ServerNotRespondPage } from '../ServerNotRespondPage/ServerNotRespondPage';
import LanguageField from '../../components/LanguageField/LanguageField';

const downloadFile = (fileUrl, fileName) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const AboutMePage = ({language='en', onChangeLanguage, onChangeTheme}) => {
    const navigate = useNavigate()

    const { data, isLoading, error } = useAboutMeData(language);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <ServerNotRespondPage language={language}/>;

    const titles = data['data']['data']['titles'];
    const languages = data['data']['data']['languages'];
    const books = data['data']['data']['books'];
    const hobbies = data['data']['data']['hobbies'];

    const handleDownloadClick = (url, name) => {
        downloadFile(url, name);
    };

    return (
        <div className={styles.aboutMePage}>
            <div className={styles.mainContent}>
            <SparkField 
                text={findTextByTag(titles, 'spark_about_me_string1')}
                onSparkClick={() => navigate('/home')}
                navigate={navigate}
                onChangeLanguage={onChangeLanguage}
                onChangeTheme={onChangeTheme}
                language={language}
            />
            <div className={styles.columns}>
                <div className={styles.smallColumn}>
                    <CharacterField name={findTextByTag(titles, 'name')}/>
                    <LanguageField
                        title={findTextByTag(titles, 'language_title')}
                        languages={languages}
                    />
                </div>
                <div className={styles.bigColumn}>
                    <DescriptionWithButtons
                        text={findTextByTag(titles, 'description')}
                        buttons={[
                            <Button text={findTextByTag(titles, 'contact_button')} onButtonClick={() => navigate('/contact')}/>,
                            <Button text={findTextByTag(titles, 'skills_button')} onButtonClick={() => navigate('/skills')}/>,
                            <Button text={findTextByTag(titles, 'projects_button')} onButtonClick={() => navigate('/projects')}/>,
                            <Button text={findTextByTag(titles, 'education_button')} onButtonClick={() => navigate('/education')}/>,
                        ]}
                    />
                    <div class={styles.rows}>
                        <TitleWithButtons
                            title={findTextByTag(titles, 'cv_title')}
                            buttons={[
                                <Button 
                                    text={findTextByTag(titles, 'download_pdf_button')}
                                    onButtonClick={() => handleDownloadClick('/documents/cv.pdf', `${findTextByTag(titles, 'name')} CV`)}
                                    isSmallPadding={true}
                                />,
                                <Button
                                    text={findTextByTag(titles, 'download_png_button')}
                                    onButtonClick={() => handleDownloadClick('/documents/cv.png', `${findTextByTag(titles, 'name')} CV`)}
                                    isPrimary={false}
                                    isSmallPadding={true}
                                />,
                            ]}
                        />
                        <TitleWithButtons
                            title={findTextByTag(titles, 'cover_letter_title')}
                            buttons={[
                                <Button 
                                    text={findTextByTag(titles, 'download_pdf_button')}
                                    onButtonClick={() => handleDownloadClick('/documents/cover_letter.pdf', `${findTextByTag(titles, 'name')} Cover Letter`)}
                                    isSmallPadding={true}
                                />,
                                <Button
                                    text={findTextByTag(titles, 'download_png_button')}
                                    onButtonClick={() => handleDownloadClick('/documents/cover_letter.png', `${findTextByTag(titles, 'name')} Cover Letter`)}
                                    isPrimary={false}
                                    isSmallPadding={true}
                                />,
                            ]}
                        />
                    </div>
                </div>
            </div>
            
            <div className={styles.bottomContent}>
                <BooksField 
                    title={findTextByTag(titles, 'books_title')}
                    books={[
                        books.map((data, index) => (
                            <Book 
                                key={index}
                                author={data.author}
                                title={data.title}
                                progress={data.progress}
                            />
                        ))
                    ]}
                />
                <HobbiesField 
                    title={findTextByTag(titles, 'hobbies_title')}
                    hobbies={[
                        hobbies.map((data, index) => (
                            <Hobby 
                                key={index}
                                title={data.name}
                                description={data.description}
                                images_path={data.images_path}
                            />
                        ))
                    ]}
                />
            </div>
            </div>
        </div>
    );
}

