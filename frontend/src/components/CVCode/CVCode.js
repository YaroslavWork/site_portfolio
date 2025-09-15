import React from 'react'
import styles from './CVCode.module.css'

import BorderContainer from '../BorderContainer/BorderContainer'
import Button from '../Button/Button';

export default function CVCode( {prompt, code, codeLength=6, checkCompanyCodeText, navigate} ) {
    const codeProvided = code.length === codeLength ? true : false;

    return (
        <BorderContainer>
            <p className={styles.textPrompt}>{prompt}</p>
            <div className={styles.codeField}>
                {Array(codeLength)
                    .fill(null)
                    .map((_, index) => {
                        const isFill = code[index] ? styles.fill : '';
                        return (
                        <div key={index} className={`${styles.codeLetter} ${isFill}`}>
                            {code[index]}
                        </div>
                        )
                    })}
            </div>
            {codeProvided ?
                <Button text={checkCompanyCodeText} onButtonClick={() => navigate(`/company/${code}`)}/> : null
            }
        </BorderContainer>
    )
}