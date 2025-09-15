import { useNavigate } from "react-router-dom"
import styles from './NotFoundPage.module.css'
import SparkField from "../../components/SparkField/SparkField"
import { useNotFoundData } from "../../features/hooks/index.hooks"
import { findTextByTag } from "../../utils/dataUtils"
import { ServerNotRespondPage } from "../ServerNotRespondPage/ServerNotRespondPage"


export const NotFoundPage = () => {
    const navigate = useNavigate()

    const { data, isLoading, error } = useNotFoundData();
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <ServerNotRespondPage/>;

    const titles = data['data']['data']['titles'];

    return (
        <div className={styles.notFoundPage}>
            <SparkField text={findTextByTag(titles, 'spark_not_found_page_string1')} onSparkClick={() => navigate('/home')}/>
        </div>
    )
}