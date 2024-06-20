import React from 'react';

const Scoreboard = ({ score }) => {
    return (
        <div>
            <h2>Scoreboard</h2>
            <p>Player: {score.player}</p>
            <p>Computer: {score.computer}</p>
        </div>
    );
};



export default Scoreboard;
