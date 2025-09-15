import { useEffect, useState } from 'react';
import SparkField from '../../components/SparkField/SparkField'
import styles from './ServerNotRespondPage.module.css'

export const ServerNotRespondPage = ({language='en'}) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/texts/serverNotRespond.json')
        .then(response => response.json()) // Automatically parses the JSON
        .then(jsonData => setData(jsonData));
    }, []); // The empty dependency array ensures this runs only once

    if (!data) {
        return <div>Loading...</div>;
    }

    console.log(data);

    return (
        <div className={styles.serverNotRespondPage}>
            <SparkField text={data['spark_server_not_respond'][language]}/>
        </div>
    )
}