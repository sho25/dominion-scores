import React, { useState } from 'react';
import { TextField } from '@mui/material';

import { MAX_PLAYERS } from '../../../constant';

import './ScoreInput.scss';

type Props = {
  players: string[];
  numPlayers: number;
  scores: string[];
  handleInput: (index: number, value: string) => void;
};

function ScoreInput(props: Props) {
  const { players, numPlayers, scores, handleInput } = props;
  const [hasErrors, setHasErrors] = useState<boolean[]>(
    Array(MAX_PLAYERS).fill(false)
  );

  return (
    <div>
      {players.slice(0, numPlayers).map((player, index) => (
        <div className="scoreInputRow" key={index}>
          <span>{player}</span>
          <TextField
            size="small"
            type="number"
            required={true}
            helperText={hasErrors[index] ? 'numbers only' : undefined}
            value={scores[index]}
            error={hasErrors[index]}
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
