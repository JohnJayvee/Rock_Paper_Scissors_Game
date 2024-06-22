import React from 'react';
import PropTypes from 'prop-types';


const Scoreboard = ({ score }) => {
    return (
        <div>
            <h2>Scoreboard</h2>
            <p>Player: {score.player}</p>
            <p>Computer: {score.computer}</p>
        </div>
    );
};

Scoreboard.propTypes = {
    score: PropTypes.shape({
        player: PropTypes.string.isRequired,
        computer: PropTypes.string.isRequired,
    }).isRequired,
};

export default Scoreboard;
