import { useNavigate } from "react-router-dom"
import styles from './NotFoundPage.module.css'
import SparkField from "../../components/SparkField/SparkField"
import { useNotFoundData } from "../../features/hooks/index.hooks"
import { findTextByTag } from "../../utils/dataUtils"
import { ServerNotRespondPage } from "../ServerNotRespondPage/ServerNotRespondPage"


export const NotFoundPage = ({language='en', onChangeLanguage, onChangeTheme}) => {
    const navigate = useNavigate()

    const { data, isLoading, error } = useNotFoundData(language);
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <ServerNotRespondPage language={language}/>;

    const titles = data['data']['data']['titles'];

    return (
        <div className={styles.notFoundPage}>
            <SparkField
                text={findTextByTag(titles, 'spark_not_found_page_string1')}
                onSparkClick={() => navigate('/home')}
                navigate={navigate}
                onChangeLanguage={onChangeLanguage}
                onChangeTheme={onChangeTheme}
                language={language}
            />
        </div>
    )
}