import { useQuery } from '@tanstack/react-query';
import * as api from '../api/index.api';

export const useHomeData = () => useQuery({
  queryKey: ['home'],
  queryFn: api.getHomeData,
});
export const useAboutMeData = () => useQuery({
  queryKey: ['aboutMe'],
  queryFn: api.getAboutMeData,
});
export const useSkillsData = () => useQuery({
  queryKey: ['skills'],
  queryFn: api.getSkillsData,
});
export const useProjectsData = () => useQuery({
  queryKey: ['projects'],
  queryFn: api.getProjectsData,
});
export const useWorkExperienceData = () => useQuery({
  queryKey: ['workExperience'],
  queryFn: api.getWorkExperienceData,
});
export const useEducationData = () => useQuery({
  queryKey: ['education'],
  queryFn: api.getEducationData,
});
export const useContactData = () => useQuery({
  queryKey: ['contact'],
  queryFn: api.getContactData,
});
export const useCompanyData = (companyCode) => useQuery({
  queryKey: ['company', companyCode],
  queryFn: () => api.getCompanyData(companyCode),
  enabled: !!companyCode
})
export const useNotFoundData = () => useQuery({
  queryKey: ['notFound'],
  queryFn: () => api.getNotFoundData(),
})