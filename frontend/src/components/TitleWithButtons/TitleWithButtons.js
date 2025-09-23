import React from 'react'
import Buttons from '../Buttons/Buttons';
import BorderContainer from '../BorderContainer/BorderContainer';
import styles from './TitleWithButtons.module.css'

export default function TitleWithButtons({ title, buttons=[] }) {
  return (
    <BorderContainer>
        <h2 className={styles.titleText}>{title}</h2>
        <Buttons buttons={buttons}/>
    </BorderContainer>
  );
}