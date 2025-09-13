import React from 'react'
import BorderContainer from '../BorderContainer/BorderContainer'
import styles from './ContactField.module.css'

import { DynamicIcon } from '../DynamicIcons/DynamicIcons'

export default function ContactField({ identification, iconName, isPrimary=false }) {
  return (
    <BorderContainer>
        <DynamicIcon iconName={iconName} isPrimary={isPrimary} size={45}/>
        <p className={styles.contactIdentification}>{identification}</p>
    </BorderContainer>
  )
}
