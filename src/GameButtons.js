import React from 'react';
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import "./styles/game-buttons.scss";

function GameButtons(props) {
  return (
    <div className={props.buttonsContainerClassName}>
      <Button variant="contained" color="primary" onClick={props.onStartGameEasy} className={props.buttonClassName}>
        Easy
      </Button>
      <Button variant="contained" color="primary" onClick={props.onStartGameMedium} className={props.buttonClassName}>
        Medium
      </Button>
      <Button variant="contained" color="primary" onClick={props.onStartGameHard} className={props.buttonClassName}>
        Hard
      </Button> 
      <Link to="/" className="back-high-score-button-container">
        <Button variant="contained" color="secondary" className={props.backButtonClassName}>
          Back
        </Button>
      </Link>
    </div>
  )
}

export default GameButtons;
