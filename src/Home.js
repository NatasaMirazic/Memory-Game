import React from "react";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import CardJack from "./images/cards/clubs_J.png";
import CardAce from "./images/cards/hearts_A.png";
import "./styles/home.scss";

function Home() {
  return (
    <div>
      <div className="buttons-container">
        <div>
          <Link to="/new-game" className="new-game-button-container">
            <Button variant="contained" className="new-game-button" color="primary">
              New game
            </Button>
          </Link>
          <Link to="/high-score" className="high-score-button-container">
            <Button variant="contained" className="high-score-button" color="primary">
              High Score
            </Button>
          </Link>
        </div>
        <h1 className="main-title">Memory game!</h1>
      </div>
      <div className="cards-container">
        <img src={CardJack} alt="first card jack" className="card first-card-jack" />
        <img src={CardJack} alt="second card jack" className="card second-card-jack" />
        <img src={CardAce} alt="first card ace" className="card second-card-ace" />
        <img src={CardAce} alt="second card ace" className="card first-card-ace" />
      </div>
    </div>
  )
}

export default Home;
