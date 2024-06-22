import React from 'react';
import PropTypes from 'prop-types';

const Result = ({ playerChoice, computerChoice, result, openModal }) => {
    const getResultColor = () => {
        if (result === 'player') {
            return 'green'; // Player wins
        } else if (result === 'computer') {
            return 'red'; // Computer wins
        } else {
            return ''; // Draw
        }
    };

    return (
        <div>
            {playerChoice && computerChoice && (
                <div>
                    <p>Player: {playerChoice}</p>
                    <p>Computer: {computerChoice}</p>
                    <p style={{ color: getResultColor() }}>Result: {result}</p>
                </div>
            )}
            <button style={{ backgroundColor: 'grey' }} onClick={openModal}>Show History</button>
        </div>
    );
};

Result.propTypes = {
    playerChoice: PropTypes.string,
    computerChoice: PropTypes.string,
    result: PropTypes.string,
    openModal: PropTypes.func.isRequired,
};

export default Result;
