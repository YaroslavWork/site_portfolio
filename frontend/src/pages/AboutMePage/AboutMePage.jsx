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

export const AboutMePage = () => {
    const navigate = useNavigate()

    const { data, isLoading, error } = useAboutMeData();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading about me data</div>;

    const titles = data['data']['data']['titles'];
    const books = data['data']['data']['books'];
    const hobbies = data['data']['data']['hobbies'];

    return (
        <div className={styles.aboutMePage}>
            <div className={styles.mainContent}>
            <SparkField text={findTextByTag(titles, 'spark_about_me_string1')} onSparkClick={() => navigate('/home')}/>
            <div className={styles.columns}>
                <div className={styles.smallColumn}>
                    <CharacterField name={findTextByTag(titles, 'name')}/>
                    <TitleWithButtons
                        title={findTextByTag(titles, 'cv_title')}
                        buttons={[
                            <Button text={findTextByTag(titles, 'download_pdf_button')} isSmallPadding={true}/>,
                            <Button text={findTextByTag(titles, 'download_png_button')} isPrimary={false} isSmallPadding={true}/>,
                        ]}
                    />
                    <TitleWithButtons
                        title={findTextByTag(titles, 'cover_letter_title')}
                        buttons={[
                            <Button text={findTextByTag(titles, 'download_pdf_button')} isSmallPadding={true}/>,
                            <Button text={findTextByTag(titles, 'download_png_button')} isPrimary={false} isSmallPadding={true}/>,
                        ]}
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
                </div>
            </div>
            
            <div className={styles.bottomContent}>
                <BooksField books={[
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
                <HobbiesField hobbies={[
                    hobbies.map((data, index) => (
                        <Hobby 
                            key={index}
                            title={data.name}
                            description={data.description}
                            icon_path={data.icon_path}
                        />
                    ))
                ]}
                />
            </div>
            </div>
        </div>
    );
}

