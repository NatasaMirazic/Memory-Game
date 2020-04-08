class HighScoreItem {
  name;
  time;
  displayTime;

  constructor(name, time) {
    this.name = name;
    this.time = time;
    this.displayTime = this.getFormattedTime();
  }

  getFormattedTime() {
    let minutes = Math.floor(this.time / 60);
    let seconds = this.time - (minutes * 60);
    if (minutes < 10) {
      minutes =  '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return `${minutes}:${seconds}`;
  }
}

export {HighScoreItem}