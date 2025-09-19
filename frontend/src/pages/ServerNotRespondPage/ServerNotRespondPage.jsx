import { useEffect, useState } from 'react';
import SparkField from '../../components/SparkField/SparkField'
import styles from './ServerNotRespondPage.module.css'

export const ServerNotRespondPage = ({language='en', isInAllPage=true}) => {
    const [data, setData] = useState(null);
    const mainDivStyle = !isInAllPage ? `${styles.serverNotRespondPage} ${styles.autoHeight}` : `${styles.serverNotRespondPage}`

    useEffect(() => {
        fetch('/texts/serverNotRespond.json')
        .then(response => response.json())
        .then(jsonData => setData(jsonData));
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    console.log(data);

    return (
        <div className={mainDivStyle}>
            <SparkField text={data['spark_server_not_respond'][language]}/>
        </div>
    )
}