import React, { useState } from 'react';
import styles from './Guess.module.css';


interface Props {
    handleGuess: (guess: string) => void;
}


export const Guess = ({ handleGuess }: Props) => {

    const [content, setContent] = useState('');

    const handleChange = (event: any) => setContent(event.target.value);


    return (
        <div className={styles.guess}>
            <span>
            <input
                type="text"
                id="content"
                name="content"
                onChange={handleChange}
                value={content}
            />
                <button onClick={() => handleGuess(content)}>
                    GUESS
                </button>
            </span>
        </div>
    )
}