import { useNavigate, useParams } from "react-router-dom";
import { useCompanyData } from '../../features/hooks/index.hooks';
import styles from './CompanyPage.module.css'

export const CompanyPage = () => {
    const navigate = useNavigate()
    const { companyCode } = useParams()

    const { data, isLoading, isError, error } = useCompanyData(companyCode);

    if (isLoading) return <div>Loading...</div>;
    if (isError) {
        if (error.response && error.response.status === 404) {
            return <div>Company with code '{companyCode}' not found.</div>;
        }
        return <div>An unexpected error occurred.</div>;
    }

    const titles = data['data']['titles'];
    const skills = data['data']['skills'];

    return (
        <div className={styles.mainPage}>
            {titles.map((title, index) => (
                <p key={index}>{title.title} - {title.text}</p>
            ))}
        </div>
    )
}