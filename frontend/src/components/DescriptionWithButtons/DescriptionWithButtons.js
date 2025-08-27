import React from 'react'
import styles from './DescriptionWithButtons.module.css'
import BorderContainer from '../BorderContainer/BorderContainer'
import Buttons from '../Buttons/Buttons';

export default function DescriptionWithButtons( {text, buttons = []} ) {
    return (
        <BorderContainer>
            <p className={styles.textDescription}>{text}</p>
            <Buttons buttons={buttons}/>
        </BorderContainer>
    );
}