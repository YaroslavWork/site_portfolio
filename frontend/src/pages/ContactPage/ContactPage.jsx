import { useNavigate } from "react-router-dom";
import { useContactData } from "../../features/hooks/index.hooks";
import SparkField from "../../components/SparkField/SparkField";
import { findTextByTag } from "../../utils/dataUtils";

import styles from './ContactPage.module.css';
import ContactField from "../../components/ContactField/ContactField";

export const ContactPage = () => {
    const navigate = useNavigate()

    const { data, isLoading, error } = useContactData();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading skills data</div>;

    const titles = data['data']['data']['titles'];
    const contacts = data['data']['data']['contacts'];

    return (
        <div className={styles.contactPage}>
            <div className={styles.mainContent}>
                <SparkField text={findTextByTag(titles, 'spark_contact_string1')}/>
                <div className={styles.contactContent}>
                    {contacts.map((data, index) => (
                        <ContactField key={index} identification={data.identification} />
                    ))}
                </div>
            </div>
        </div>
    )
}