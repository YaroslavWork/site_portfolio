import * as featherIcons from 'react-icons/fi'
import styles from './DynamicIcons.module.css'

export const DynamicIcon = ({ iconName, size=24, isPrimary }) => {
  const className = isPrimary ? styles.isPrimary : '';
  const IconComponent = featherIcons[iconName];
  const ErrorIcon = featherIcons['FiAlertTriangle'];

  return IconComponent ? <IconComponent size={size} className={className}/> : <ErrorIcon size={size} className={styles.error}/>;
};