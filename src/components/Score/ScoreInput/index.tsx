import React from 'react';
import { TextField } from '@mui/material';

import './ScoreInput.scss';

type Props = {
  players: string[];
  numPlayers: number;
  scores: string[];
  handleInput: (index: number, value: string) => void;
};

function ScoreInput(props: Props) {
  const { players, numPlayers, scores, handleInput } = props;

  return (
    <div>
      {players.slice(0, numPlayers).map((player, index) => (
        <div className="scoreInputRow" key={index}>
          <div className="playerName">
            <span>{player}</span>
          </div>
          <TextField
            size="small"
            type="number"
            required={true}
            value={scores[index]}
            onChange={(e) => {
              handleInput(index, e.target.value);
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default ScoreInput;
