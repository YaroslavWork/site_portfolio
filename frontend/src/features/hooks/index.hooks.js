import { useQuery } from '@tanstack/react-query';
import * as api from '../api/index.api';

export const useHomeData = (language) => {
  return useQuery({
    queryKey: ['home', language],
    queryFn: () => api.getHomeData(language),
  });
};

export const useAboutMeData = (language) => {
  return useQuery({
    queryKey: ['about_me', language],
    queryFn: () => api.getAboutMeData(language),
  });
};

export const useSkillsData = (language, search) => {
  return useQuery({
    queryKey: ['skills', language, search],
    queryFn: () => api.getSkillsData(language, search),
  });
};

export const useProjectsData = (language) => {
  return useQuery({
    queryKey: ['projects', language],
    queryFn: () => api.getProjectsData(language),
  });
};

export const useWorkExperienceData = (language) => {
  return useQuery({
    queryKey: ['work_experience', language],
    queryFn: () => api.getWorkExperienceData(language),
  });
};

export const useEducationData = (language) => {
  return useQuery({
    queryKey: ['education', language],
    queryFn: () => api.getEducationData(language),
  });
};

export const useContactData = (language) => {
  return useQuery({
    queryKey: ['contact', language],
    queryFn: () => api.getContactData(language),
  });
};

export const useCompanyData  = (companyCode, language) => {
  return useQuery({
    queryKey: ['company', companyCode, language],
    queryFn: () => api.getCompanyData(companyCode, language),
    enabled: !!companyCode,
  });
};

export const useNotFoundData = (language) => {
  return useQuery({
    queryKey: ['not_found', language],
    queryFn: () => api.getNotFoundData(language),
  });
};