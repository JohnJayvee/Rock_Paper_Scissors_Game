import React, { useState } from 'react';
import Scoreboard from './Scoreboard';
import Modal from 'react-modal';
import Result from './Result';

Modal.setAppElement('#root'); // Necessary for screen reader accessibility

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

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const resetGame = () => {
        setPlayerChoice(null);
        setComputerChoice(null);
        setResult('');
        setScore({ player: 0, computer: 0 });
        setHistory([]);
    };

    return (
        <div>
            {/* Display game options */}
            <button style={{ backgroundColor: '#6f6261' }} onClick={() => playGame('rock')}>Rock</button>&nbsp;&nbsp;
            <button style={{ backgroundColor: '#d9bda5' }} onClick={() => playGame('paper')}>Paper</button>&nbsp;&nbsp;
            <button style={{ backgroundColor: '#04bf94' }} onClick={() => playGame('scissors')}>Scissors</button>

            {/* Display current score */}
            <Scoreboard score={score} />

            {/* Display game result */}
            <Result
                playerChoice={playerChoice}
                computerChoice={computerChoice}
                result={result}
                openModal={openModal}
            />

            {/* Reset game */}
            <br />
            <button style={{ backgroundColor: 'red' }} onClick={resetGame}>Reset</button>

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

export default Game;
