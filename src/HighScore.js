import React from "react";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";
import {ScoreService} from './services/ScoreService';
import HighScoreTable from './HighScoreTable';
import './styles/high-score.scss';

function HighScore() {
  const score = new ScoreService();
  const data = score.getAllScores();

  return (
    <div>
      <div className="container-all-tables">
        <HighScoreTable data={data.easy} title="Easy" />
        <HighScoreTable data={data.medium} title="Medium" />
        <HighScoreTable data={data.hard} title="Hard" />
      </div>
      <Button color="primary" component={Link} to="/" className="high-score-back-button">
        Back
      </Button>
    </div>
  )
}

export default HighScore;
