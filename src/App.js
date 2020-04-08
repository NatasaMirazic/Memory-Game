import React from "react";
import {Switch, Route} from "react-router-dom";
import Game from "./Game";
import HighScore from "./HighScore"
import Home from "./Home";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route path="/high-score" component={HighScore}></Route>
      <Route path="/new-game" component={Game}></Route>
    </Switch>
  )
}

export default App;
