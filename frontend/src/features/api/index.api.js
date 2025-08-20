import { axios } from '../../lib/axios';

export const getHomeData = () => axios.get('/home');
export const getAboutMeData = () => axios.get('/about_me');
export const getSkillsData = () => axios.get('/skills');
export const getProjectsData = () => axios.get('/projects');
export const getWorkExperienceData = () => axios.get('/work_experience');
export const getEducationData = () => axios.get('/education');
export const getContactData = () => axios.get('/contact');