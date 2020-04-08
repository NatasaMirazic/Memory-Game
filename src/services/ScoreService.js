import {KEY, RESULT_SIZE, DEFAULT_SCORES} from "../constants/constants";
import { HighScoreItem } from "../models/HighScoreItem";

class ScoreService {
  isHighScore(score, level) {
    const scores = this.getScoresByLevel(level);
    const maxScore = this.getMaxScore(scores);
    if (score < maxScore.time || score.length < RESULT_SIZE) {
      return true;
    }
    return false;
  }
  
  getMaxScore(scores) {
    return scores.reduce(function (prev, current) {
      return (prev.time > current.time) ? prev : current
    })
  }

  addNewScore(newScore, level) {
    const scores = this.getScoresByLevel(level);
    const maxScore = this.getMaxScore(scores);
    if (newScore.time < maxScore.time) {
      scores.push(newScore);
      const sort = this.getScoresSortedByTime(scores);
      localStorage.setItem(KEY[level.key], JSON.stringify(sort.slice(0, RESULT_SIZE)));
    } else if (scores.length < RESULT_SIZE) {
      scores.push(newScore);
      const sortScores = this.getScoresSortedByTime(scores);
      localStorage.setItem(KEY[level.key], JSON.stringify(sortScores));
    }
  }

  getScoresSortedByTime(scores) {
    return scores.sort((a, b) => (a.time > b.time) ? 1 : -1);
  }

  getScoresByLevel(level) {
    const scores = JSON.parse(localStorage.getItem(KEY[level.key]));
    if (!scores || scores.length === 0) {
      // on first run of the application, default result will be written in the tables 
      const sortScores = this.getScoresSortedByTime(DEFAULT_SCORES[level.key]);
      localStorage.setItem(KEY[level.key], JSON.stringify(sortScores));
      return sortScores.map(score => new HighScoreItem(score.name, score.time));
    }
    return scores.map(score => new HighScoreItem(score.name, score.time));
  }

  getAllScores() {
    return {
      easy: this.getAllScoresByLevel(KEY.EASY, DEFAULT_SCORES.EASY),
      medium: this.getAllScoresByLevel(KEY.MEDIUM, DEFAULT_SCORES.MEDIUM),
      hard: this.getAllScoresByLevel(KEY.HARD, DEFAULT_SCORES.HARD),
    }
  }

  getAllScoresByLevel(level, defaultScores) {
    let sortScores = JSON.parse(localStorage.getItem(level)) || defaultScores;
    sortScores = sortScores.map(score => new HighScoreItem(score.name, score.time));
    return this.getScoresSortedByTime(sortScores);
  }
}

export {ScoreService}
