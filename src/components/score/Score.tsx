import React from 'react';
import styles from './Score.module.css';

interface Props {
    guess: string;
    score: number;
}

export const Score = ({guess, score}: Props) => {
    return (
        <div className={styles.score}>
            <span>{guess}: {+(score.toFixed(3))}%</span>
        </div>
    )
}