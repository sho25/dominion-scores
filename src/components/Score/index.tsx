import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import {
  Fab,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

import ScoreTable from './ScoreTable';
import ScoreInput from './ScoreInput';
import { ScoreData } from '../../types';

import './Score.scss';
import { MAX_PLAYERS } from '../../constant';

type Props = {
  scores: ScoreData[][];
  players: string[];
  numPlayers: number;
  setNewScore: (score: ScoreData[]) => void;
};

const INITIAL_SCORE = Array(MAX_PLAYERS).fill(0);

function Score(props: Props) {
  const { scores, players, numPlayers, setNewScore } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [temporaryScore, setTemporaryScore] = useState<string[]>(INITIAL_SCORE);

  const handleScoreInput = (index: number, value: string) => {
    const newScores = [...temporaryScore];
    newScores[index] = value;
    setTemporaryScore(newScores);
    console.log({ newScores });
  };

  const calculatePlace = (scores: number[]) => {
    const sorted = scores.slice(0, numPlayers).sort((a, b) => b - a);
    return scores.map((score, index) => {
      return {
        score: score,
        place: index < numPlayers ? sorted.indexOf(score) + 1 : null,
      };
    });
  };

  return (
    <div className="scoreContainer">
      {/* TODO: add option for what to show */}
      <ScoreTable {...props} />
      <Fab className="fab" color="primary" onClick={() => setIsOpen(true)}>
        <AddIcon />
      </Fab>
      <Dialog scroll="body" open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Add New Score</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <ScoreInput
              {...props}
              scores={temporaryScore}
              handleInput={handleScoreInput}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              // save score
              const newScore = calculatePlace(
                temporaryScore.map((score) => Number(score))
              );
              console.log(newScore);
              setNewScore(newScore);
              // reset
              setTemporaryScore(INITIAL_SCORE);
              setIsOpen(false);
            }}
            autoFocus
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Score;
