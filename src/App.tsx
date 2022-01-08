import React, { useState } from 'react';
import { AppBar } from '@mui/material';

import TabMenu from './components/TabMenu';
import PlayerInput from './components/PlayerInput';
import Score from './components/Score';

import { ScoreData } from './types';
import { MAX_PLAYERS } from './constant';

import './App.scss';

function App() {
  const [numPlayers, setNumPlayers] = useState(4);
  const [players, setPlayers] = useState<string[]>(
    Array(MAX_PLAYERS)
      .fill(undefined)
      .map((_, index) => `player ${index + 1}`)
  );
  const [scores, setScores] = useState<ScoreData[][]>([]);

  const setPlayerName = (index: number, value: string) => {
    const newPlayers = [...players];
    newPlayers[index] = value;
    setPlayers(newPlayers);
  };

  const setNewScore = (score: ScoreData[]) => {
    setScores([...scores, score]);
  };

  const labels = ['players', 'scores', 'stats'];
  const content = [
    <PlayerInput
      numPlayers={numPlayers}
      players={players}
      setNumPlayers={setNumPlayers}
      setPlayerName={setPlayerName}
    />,
    <Score
      players={players}
      numPlayers={numPlayers}
      scores={scores}
      setNewScore={setNewScore}
    />,
    <div>stats</div>,
  ];

  return (
    <>
      {/* header */}
      <AppBar position="static">
        <h2 className="app-bar">Dominion Scores</h2>
      </AppBar>
      {/* content */}
      <div className="App">
        <TabMenu isFullWidth={true} labels={labels} tabContent={content} />
      </div>
    </>
  );
}

export default App;
