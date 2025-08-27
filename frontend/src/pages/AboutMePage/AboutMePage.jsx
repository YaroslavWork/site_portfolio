import Button from '../../components/Button/Button';
import CharacterField from '../../components/CharacterField/CharacterField';
import DescriptionWithButtons from '../../components/DescriptionWithButtons/DescriptionWithButtons';
import SparkField from '../../components/SparkField/SparkField';
import TitleWithButtons from '../../components/TitleWithButtons/TitleWithButtons';
import { useAboutMeData } from '../../features/hooks/index.hooks';
import { findTextByTag } from '../../utils/dataUtils';
import styles from './AboutMePage.module.css';

export const AboutMePage = () => {
    const { data, isLoading, error } = useAboutMeData();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading home data</div>;

    const titles = data['data']['data']['titles'];
    const books = data['data']['data']['books'];
    const hobbies = data['data']['data']['hobbies'];

    return (
        <div className={styles.aboutMePage}>
            <div className={styles.mainContent}>
            <SparkField text={findTextByTag(titles, 'spark_about_me_string1')} onSparkClick={() => console.log('Spark is clicked')}/>
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
                            <Button text={findTextByTag(titles, 'contact_button')}/>,
                            <Button text={findTextByTag(titles, 'skills_button')}/>,
                            <Button text={findTextByTag(titles, 'projects_button')}/>,
                        ]}
                    />
                </div>
            </div>
            <div className={styles.bottomContent}>

            </div>
        </div>



            <h3>Titles</h3>
            {titles.map((data, index) => (
                <p key={index}>{data.title}: {data.text}</p>
            ))}
            <h3>Books</h3>
            {books.map((data, index) => (
                <p key={index}>{data.author}; {data.title}: {data.progress}</p>
            ))}
            <h3>Hobbies</h3>
            {hobbies.map((data, index) => (
                <p key={index}>{data.name}: {data.description}</p>
            ))}
        </div>
    );
}

