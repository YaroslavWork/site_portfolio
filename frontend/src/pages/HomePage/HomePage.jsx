import SparkField from '../../components/SparkField/SparkField';
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
            <SparkField text={titles.find(obj => obj.title === 'spark_main_page_string1').text} onSparkClick={() => console.log('Spark is clicked')}/>
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