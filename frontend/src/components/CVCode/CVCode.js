import React from 'react'
import styles from './CVCode.module.css'

import BorderContainer from '../BorderContainer/BorderContainer'

export default function CVCode( {prompt, code, codeLength=6} ) {
    return (
        <BorderContainer>
            <p className={styles.textPrompt}>{prompt}</p>
            <div className={styles.codeField}>
                {Array(codeLength)
                    .fill(null)
                    .map((_, index) => (
                        <div key={index} className={styles.codeLetter}>
                            {code[index]}
                        </div>
                    ))}
            </div>
        </BorderContainer>
    )
}