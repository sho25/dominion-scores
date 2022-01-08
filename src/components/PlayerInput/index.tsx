import { ToggleButtonGroup, ToggleButton, TextField } from '@mui/material';
import React from 'react';
import { MAX_PLAYERS } from '../../constant';

import './PlayerInput.scss';

type Props = {
  numPlayers: number;
  players: string[];
  setNumPlayers: (n: number) => void;
  setPlayerName: (index: number, value: string) => void;
};

function PlayerInput(props: Props) {
  const { numPlayers, players, setNumPlayers, setPlayerName } = props;
  const handleNumPlayerClick = (
    event: React.MouseEvent<HTMLElement>,
    newPlayers: string | null
  ) => {
    if (newPlayers !== null) {
      setNumPlayers(Number(newPlayers));
    }
  };

  return (
    <div className="playerContainer">
      <div className="title">Select Players</div>
      <ToggleButtonGroup
        className="group"
        exclusive
        color="primary"
        value={numPlayers.toString()}
        onChange={handleNumPlayerClick}
      >
        {Array(MAX_PLAYERS - 1)
          .fill(undefined)
          .map((_, index) => (
            <ToggleButton key={index} value={(index + 2).toString()}>
              &nbsp;{index + 2}&nbsp;
            </ToggleButton>
          ))}
      </ToggleButtonGroup>
      <div className="title">Player names</div>
      {players.slice(0, numPlayers).map((player, index) => {
        return (
          <div key={index}>
            <TextField
              className="field"
              id={`playerInput-${index}`}
              //   label={`player ${index + 1}`}
              defaultValue={player}
              size="small"
              onChange={(e) => setPlayerName(index, e.target.value)}
              onBlur={(e) => {
                if (e.target.value === '')
                  setPlayerName(index, `player ${index + 1}`);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default PlayerInput;
