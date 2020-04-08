import React, {useState} from 'react';
import * as moment from 'moment';
import {Link} from "react-router-dom"
import Button from "@material-ui/core/Button"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import GameButtons from './GameButtons';
import EndGameModal from './EndGameModal';
import {ScoreService} from './services/ScoreService';
import {IMAGES, VIEW_CARDS_TIME, LEVELS} from "./constants/constants";
import "./styles/game.scss"

function Game() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [startTime, setStartTime] = useState(moment());
  const [displayTime, setDisplayTime] = useState('00:00');
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [pictures, setPictures] = useState([]);
  // when openedPictureIndex is null, then only one card is opened
  // when second cards opens, openedPictureIndex takes index of that picture
  const [openedPictureIndex, setOpenedPictureIndex] = useState(null);
  // when already two cards are opened, user can't open third card
  const [isToggleDisabled, setIsToggleDisabled] = useState(false);
  const [interval, startInterval] = useState(0);
  const [isResultHighScore, setIsResultHighScore] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(true);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [newScoreName, setNewScoreName] = useState('');
  const [endTime, setEndTime] = useState(moment());
  const [isRestartingGame, setIsRestartingGame] = useState(false);
  const [level, setLevel] = useState(null);
  const [isRedirected, setIsRedirected] = useState(false);

  // shuffle is function which take cards and shuffle their position
  const shuffle = (IMAGES) => {
    for (let i = IMAGES.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [IMAGES[i], IMAGES[j]] = [IMAGES[j], IMAGES[i]];
    }
    return IMAGES;
  }

  const startGame = (level) => {
    setLevel(level);
    setStartTime(moment());
    setIsGameEnded(false);
    setIsResultHighScore(false);
    setIsGameStarted(true);
    setSelectedLevel(level);
    // on start, all cards are shuffled
    shuffle(IMAGES);

    const cardImages = [];
    for (let i = 0; i < level.cards; i++) { 
      cardImages.push(Object.assign({}, IMAGES[i]), Object.assign({}, IMAGES[i]));
    }

    // when user pick up level which he want to play, 
    // shuffle function take certain number of cards depending on the selected level and shuffle their position
    const randomPictures = shuffle(cardImages);

    setPictures(randomPictures);
    getFormattedTime(getDisplayMinutes(), getDisplaySeconds());

    startInterval(setInterval(() => {
      getFormattedTime(getDisplayMinutes(), getDisplaySeconds());
    }, 1000));
  }

  const getFormattedTime = (minutes, seconds) => {
    if (minutes < 10) {
      minutes =  '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    setDisplayTime(`${minutes}:${seconds}`);
  }

  const getDisplaySeconds = () => {
    return moment().diff(startTime, 'seconds') - (getDisplayMinutes() * 60);
  };

  const getDisplayMinutes = () => {
    return moment().diff(startTime, 'minutes');
  };

  const closeDialog = () => {
    setIsOpenDialog(false);
  };

  const openCard = (index) => {
    const picture = pictures[index];
    // Don't open card if it's already opened or when already two are opened, so user can't open third card
    if (picture.isOpened || isToggleDisabled) return;
    const newPictures = [...pictures];
    newPictures[index].isOpened = true;
    setPictures(newPictures);
    // if openedPictureIndex is null, then this card is first opened
    if (openedPictureIndex === null) {
      setOpenedPictureIndex(index);
    } else {
      // when second card is opened, prevents opening of third card
      setIsToggleDisabled(true);
      if (pictures[openedPictureIndex].src === picture.src) {
        // images are the same
        pictures[openedPictureIndex].isSolved = true;
        picture.isSolved = true;
        setIsToggleDisabled(false);
        setOpenedPictureIndex(null);
        if (isGameFinished()) {
          finishGame();
        }
      } else {
        // cards are not the same and timeout used how user can view opened cards for 1s
        setTimeout(() => {
          pictures[openedPictureIndex].isOpened = false;
          picture.isOpened = false;
          setOpenedPictureIndex(null);
          setIsToggleDisabled(false);
        }, VIEW_CARDS_TIME);
      }
    }
  };

  const finishGame = () => {
    setEndTime(moment());
    setIsGameEnded(true);
    setIsRestartingGame(false);
    clearInterval(interval);
    const scoreService = new ScoreService();
    const gameDuration = moment().diff(startTime, 'seconds');
    if (scoreService.isHighScore(gameDuration, level)) {
      setIsResultHighScore(true);
      setIsOpenDialog(true);
    }
  }

  const isGameFinished = () => {
    const closedPictures = pictures.filter(picture => picture.isOpened === false);
    return closedPictures.length === 0;
  };

  const saveHighScore = (event) => {
    event.preventDefault();
    const scoreService = new ScoreService();
    scoreService.addNewScore({name: newScoreName, time:endTime.diff(startTime, 'seconds')}, level);
    setNewScoreName('');
    closeDialog();
    setIsRedirected(true);
  };

  const restartGame = () => {
    setStartTime(moment());
    setIsRestartingGame(true);
  };

  return (
    <div className="section">
      {isGameStarted ?
      // start game
      <div>
        <div className="images">
          {pictures.map(
          (image, index) => 
            <div key={index} >
              <div className='image'>
                {(image.isOpened) ?
                <img
                  src={require("" + image.src)}
                  alt="card"
                  onClick={() => {openCard(index)}}
                  className={[selectedLevel.imageClass, image.isSolved && 'same-cards'].filter(e => !!e).join(' ')}/>
                :
                <img
                  src={require("" + image.background)}
                  alt="card"
                  onClick={() => {openCard(index)}}
                  className={[selectedLevel.imageClass, 'closed-image'].filter(e => !!e).join(' ')}/>
                }
              </div>
            </div>
          )}
        </div>
        <h4 className="display-time">Time spent: {displayTime}</h4>
      </div> :
      // choice of level which user want to play
      <div>
        <GameButtons 
          onStartGameEasy={() => startGame(LEVELS.EASY)} 
          onStartGameMedium={() => startGame(LEVELS.MEDIUM)} 
          onStartGameHard={() => startGame(LEVELS.HARD)}
          buttonsContainerClassName="big-buttons-container"
          buttonClassName="big-new-game-button"
          backButtonClassName="big-back-button"/>
      </div>}
      {isGameEnded ?
      // end game
        isResultHighScore ?
        // result is a high score
          <EndGameModal open={isOpenDialog} 
            title={"You are new high score. Please enter your name."} 
            setNewScoreName={(e) => setNewScoreName(e.target.value)} 
            newScoreName={newScoreName}
            onCloseDialog={closeDialog}
            onSave={saveHighScore}
            redirect={isRedirected} /> :
            // result isn't high score
          <Dialog open={isOpenDialog} aria-labelledby="form-dialog-title">
            <form>
              <DialogTitle id="form-dialog-title">Congratulation</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Unfortunately you didn't get the best result, try again.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                {isRestartingGame ?
                // user start game again
                  startGame(level):
                  // main menu
                  <div>
                    <Button onClick={restartGame} className="medium-button">
                      New game
                    </Button>
                    <Button component={Link} to="/" className="medium-button">
                      Main menu
                    </Button>
                    <Button component={Link} to="/high-score" className="medium-button">
                      High scores
                    </Button>
                  </div>
                }
              </DialogActions>
            </form>
          </Dialog> :
        <div />
      }
    </div>
  )
}

export default Game;
