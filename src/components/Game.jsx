import React, { useState } from 'react';
import Scoreboard from './Scoreboard';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

const Game = () => {
    const [playerChoice, setPlayerChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [result, setResult] = useState('');
    const [score, setScore] = useState({ player: 0, computer: 0 });
    const [history, setHistory] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const choices = ['rock', 'paper', 'scissors'];

    const playGame = (choice) => {
        const computerChoice = choices[Math.floor(Math.random() * 3)];
        setPlayerChoice(choice);
        setComputerChoice(computerChoice);

        const result = calculateResult(choice, computerChoice);
        setResult(result);

        // Update score
        if (result === 'player') {
            setScore((prevScore) => ({ ...prevScore, player: prevScore.player + 1 }));
        } else if (result === 'computer') {
            setScore((prevScore) => ({ ...prevScore, computer: prevScore.computer + 1 }));
        }

        // Update history
        const gameResult = { player: choice, computer: computerChoice, result };
        setHistory((prevHistory) => [gameResult, ...prevHistory]);
    };

    const calculateResult = (player, computer) => {
        if (player === computer) return 'draw';
        if (
            (player === 'rock' && computer === 'scissors') ||
            (player === 'paper' && computer === 'rock') ||
            (player === 'scissors' && computer === 'paper')
        ) {
            return 'player';
        } else {
            return 'computer';
        }
    };

    const getResultColor = () => {
        if (result === 'player') {
            return 'green'; // Player wins
        } else if (result === 'computer') {
            return 'red'; // Computer wins
        } else {
            return ''; // Draw
        }
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div>
            {/* Display game options */}
            <button onClick={() => playGame('rock')}>Rock</button>
            <button onClick={() => playGame('paper')}>Paper</button>
            <button onClick={() => playGame('scissors')}>Scissors</button>

            {/* Display current score */}
            <Scoreboard score={score} />

            {/* Display game result */}
            {playerChoice && computerChoice && (
                <div>
                    <p>Player: {playerChoice}</p>
                    <p>Computer: {computerChoice}</p>
                    <p style={{ color: getResultColor() }}>Result: {result}</p>
                </div>
            )}

            {/* Toggle history modal */}
            <button onClick={openModal}>Show History</button>

            {/* History modal */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Game History"
                className="modal"
                overlayClassName="overlay"
            >
                <button className="close-btn" onClick={closeModal}>Close</button>
                <h2>Game History</h2>
                <ul>
                    {history.map((game, index) => (
                        <li key={index}>
                            Player: {game.player}, Computer: {game.computer}, Result: {game.result}
                        </li>
                    ))}
                </ul>
            </Modal>
        </div>
    );
};

Game.propTypes = {
    score: PropTypes.shape({
        player: PropTypes.number.isRequired,
        computer: PropTypes.number.isRequired,
    }).isRequired,
};

export default Game;
