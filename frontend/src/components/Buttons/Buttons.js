import styles from './Buttons.module.css'

export default function Buttons( {buttons = []} ) {
    return (
        <div className={styles.buttonContainer}>
            {buttons.map((button, index) => (
                <div key={index} className={styles.button}>
                    {button}
                </div>
            ))}
        </div>
    );
}