import SparkField from '../../components/SparkField/SparkField'
import styles from './ServerNotRespondPage.module.css'

export const ServerNotRespondPage = () => {
    return (
        <div className={styles.serverNotRespondPage}>
            <SparkField text="Sorry, my backend is currently unavailable. Try again later. I'm working on it ;)"/>
        </div>
    )
}