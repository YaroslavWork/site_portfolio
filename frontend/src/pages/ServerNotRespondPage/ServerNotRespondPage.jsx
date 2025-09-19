import { useEffect, useState } from 'react';
import SparkField from '../../components/SparkField/SparkField'
import styles from './ServerNotRespondPage.module.css'

export const ServerNotRespondPage = ({language='en', isInAllPage=true}) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch('/texts/serverNotRespond.json')
        .then(response => response.json())
        .then(jsonData => setData(jsonData));
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }
    
    return (
        isInAllPage ? (
            <div className={styles.serverNotRespondPage}>
                <SparkField text={data['spark_server_not_respond'][language]}/>
            </div>
        ) : (
            <SparkField text={data['spark_server_not_respond'][language]}/>
        )
    );
}