import React, { useRef } from 'react';
import { FaRegKeyboard } from "react-icons/fa6";
import styles from './MobileKeyboardInput.module.css';

export default function MobileKeyboardInput() {
    const hiddenInputRef = useRef(null);

    const handleTappableAreaClick = () => {
        if (hiddenInputRef.current) {
            hiddenInputRef.current.focus();
        }
    };

    return (
        <div className={styles.container}>
            <div
                className={styles.tappableArea}
                onClick={handleTappableAreaClick}
                role="button"
                tabIndex={0}
            >
                <FaRegKeyboard/>
            </div>
            <input
                type="text"
                ref={hiddenInputRef}
                className={styles.hiddenInput}
                aria-hidden="true"
            />
        </div>
    );
}