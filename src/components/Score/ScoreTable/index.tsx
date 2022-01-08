import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { ScoreData } from '../../../types';

type Props = {
  scores: ScoreData[][];
  players: string[];
  numPlayers: number;
};

function ScoreTable(props: Props) {
  const { scores, players, numPlayers } = props;
  return scores.length ? (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            {players.slice(0, numPlayers).map((player, index) => (
              <TableCell key={index}>{player}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {scores.map((score, index) => (
            <TableRow key={index}>
              <TableCell>{index}</TableCell>
              {score.slice(0, numPlayers).map((item, scoreIndex) => (
                <TableCell key={scoreIndex}>
                  {item.place ? `${item.score}pt / ${item.place}place` : '-'}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <div>No scores</div>
  );
}

export default ScoreTable;
