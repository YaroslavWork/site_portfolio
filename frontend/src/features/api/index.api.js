import { axios } from '../../lib/axios';

export const getHomeData = (language) => axios.get(`/home/?language=${language}`);
export const getAboutMeData = (language='en') => axios.get(`/about_me/?language=${language}`);
export const getSkillsData = (language='en', search='') => axios.get(`/skills/?language=${language}&search=${search}`);
export const getProjectsData = (language='en') => axios.get(`/projects/?language=${language}`);
export const getWorkExperienceData = (language='en') => axios.get(`/work_experience/?language=${language}`);
export const getEducationData = (language='en') => axios.get(`/education/?language=${language}`);
export const getContactData = (language='en') => axios.get(`/contact/?language=${language}`);
export const getCompanyData = async (companyCode, language='en') => {
    const { data } = await axios.get(`/company/${companyCode}/?language=${language}`);
    return data
}
export const getNotFoundData = (language='en') => axios.get(`/404/?language=${language}`)