import React from 'react'
import styles from './DescriptionWithButtons.module.css'
import BorderContainer from '../BorderContainer/BorderContainer'
import Buttons from '../Buttons/Buttons';

export default function DescriptionWithButtons( {text, buttons = [], color=null} ) {
    const styleVar = color ? { '--company-bold-color': `#${color}` } : {};
    
    return (
        <BorderContainer>
            <p
                style={styleVar}
                className={styles.textDescription}
                dangerouslySetInnerHTML={{ __html: text }} // Trusted source
            />
            <Buttons buttons={buttons}/>
        </BorderContainer>
    );
}