import React, { useState } from 'react';
import { Guess } from '../../components/guess/Guess';
import styles from './Game.module.css';
import { Score } from '../../components/score/Score';

const API_URL = 'https://tzalemtal-api.herokuapp.com';

export const Game = () => {

    const [results, setResults] = useState([] as any);  
    const [error, setError] = useState(null);


    const handleGuess = (guess: string) => {
        evaluateGuess(guess);
    }

    const evaluateGuess = (guess: string) => {
        console.log(`guess: ${guess}`);
        fetch(`${API_URL}/score`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*'
          },
          body: JSON.stringify({
            guess,
          }),
        })
          .then((res) => res.json())
          .then((result) => {
            setError(null);
            setResults([...results, result]);
          }).catch((err) => setError(err))
      }

    const gameOver = (() => {
        if (results.length === 0) {
            return false;
        }
        if (results[results.length - 1].score == 100) {
            return true;
        }
        return false
    })();

    return (
        <div className={styles.game}>
            Tzalemtal!
            <div>
                <img src={'/fishing.jpg'}></img>
            </div>
            {error && `Error: ${error}`}
            {!!!gameOver && (
                <Guess handleGuess={handleGuess}/>
            )}
            {
                !!gameOver && `YOU WON!`
            }
            {
                results.slice(0).reverse().map((r: any, index: number) => (
                    <Score key={index} score={r['score']} guess={r['guess']} />
                ))
            }
            
        </div>
    );
}