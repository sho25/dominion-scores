import React from 'react';
import { AppBar } from '@mui/material';

import TabMenu from './components/TabMenu';
import PlayerInput from './components/PlayerInput';
import Score from './components/Score';
import Stats from './components/Stats';
import DeleteFab from './components/DeleteFab';

import useLocalStorage from './hooks/useLocalStorage';

import { ScoreData } from './types';
import { MAX_PLAYERS } from './constant';

import './App.scss';

function App() {
  const [numPlayers, setNumPlayers] = useLocalStorage('numPlayers', 4);
  const [players, setPlayers] = useLocalStorage<string[]>(
    'players',
    Array(MAX_PLAYERS)
      .fill(undefined)
      .map((_, index) => `player ${index + 1}`)
  );
  const [scores, setScores] = useLocalStorage<ScoreData[][]>('scores', []);

  const setPlayerName = (index: number, value: string) => {
    const newPlayers = [...players];
    newPlayers[index] = value;
    setPlayers(newPlayers);
  };

  const setNewScore = (score: ScoreData[]) => {
    setScores([...scores, score]);
  };

  const resetAllData = () => {
    setNumPlayers(4);
    setPlayers(
      Array(MAX_PLAYERS)
        .fill(undefined)
        .map((_, index) => `player ${index + 1}`)
    );
    setScores([]);
  };

  const labels = ['players', 'scores', 'stats'];
  const content = [
    <>
      <PlayerInput
        numPlayers={numPlayers}
        players={players}
        setNumPlayers={setNumPlayers}
        setPlayerName={setPlayerName}
      />
      <DeleteFab action={resetAllData} />
    </>,
    <>
      <Score
        players={players}
        numPlayers={numPlayers}
        scores={scores}
        setNewScore={setNewScore}
      />
      <DeleteFab action={resetAllData} />
    </>,
    <>
      <Stats players={players} numPlayers={numPlayers} scores={scores} />
      <DeleteFab action={resetAllData} />
    </>,
  ];

  return (
    <>
      <AppBar position="static">
        <h2 className="app-bar">Dominion Scores</h2>
      </AppBar>
      <div className="App">
        <TabMenu isFullWidth={true} labels={labels} tabContent={content} />
      </div>
    </>
  );
}

export default App;
