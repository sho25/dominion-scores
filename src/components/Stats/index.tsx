import React from 'react';
import { Chart } from 'react-google-charts';

import { ScoreData } from '../../types';

type Props = {
  numPlayers: number;
  players: string[];
  scores: ScoreData[][];
};

function Stats(props: Props) {
  const { numPlayers, players, scores } = props;
  const formatPieChartData = (scores: ScoreData[][]) => {
    const firstPlaceCount = Array(numPlayers).fill(0);
    scores.forEach((scoreRow) => {
      scoreRow.slice(0, numPlayers).forEach((score, playerIndex) => {
        if (score.place === 1) firstPlaceCount[playerIndex]++;
      });
    });
    return [
      ['Player Name', 'Win Rate'],
      ...players.map((player, index) => {
        return [player, firstPlaceCount[index]];
      }),
    ];
  };

  const formatLineChartData = (scores: ScoreData[][]) => {
    return [
      ['Games', ...players.slice(0, numPlayers)],
      ...scores.map((score, index) => {
        return [
          index,
          ...score
            .slice(0, numPlayers)
            .map((s) => (s.place ? numPlayers - s.place : null)),
        ];
      }),
    ];
  };

  return (
    <div>
      {scores.length ? (
        <>
          <div>Win Rate</div>
          <Chart chartType="PieChart" data={formatPieChartData(scores)} />

          <div>Game Summary</div>
          <Chart
            chartType="LineChart"
            data={formatLineChartData(scores)}
            options={{
              legend: { position: 'bottom' },
              vAxis: { textPosition: 'none' },
            }}
          />
        </>
      ) : (
        'No Stats'
      )}
    </div>
  );
}

export default Stats;
