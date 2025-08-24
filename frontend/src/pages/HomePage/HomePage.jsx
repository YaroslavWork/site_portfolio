import CharacterField from '../../components/CharacterField/CharacterField';
import SparkField from '../../components/SparkField/SparkField';
import Title from '../../components/Title/Title';
import { useHomeData } from '../../features/hooks/index.hooks';
import styles from './HomePage.module.css';

export const HomePage = () => {
    const { data, isLoading, error } = useHomeData();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading home data</div>;

    const titles = data['data']['data']['titles'];
    console.log(titles); // Debugging line to check titles

    return (
        <>
            <SparkField text={find_text_by_tag(titles, 'spark_main_page_string1')} onSparkClick={() => console.log('Spark is clicked')}/>
            <CharacterField name={find_text_by_tag(titles, 'name')}/>
            <Title text={find_text_by_tag(titles, 'position')} isPrimary={true}/>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className={styles.homePage}>
                <h1>Home Page</h1>
                <ul>
                    {titles.map((titleObj, index) => (
                        <li key={index}>{titleObj.title}: {titleObj.text}</li>
                    ))}
                </ul>
            </div>
        </>
    );
}

function find_text_by_tag(data, tag) {
    return data.find(obj => obj.title === tag).text
}