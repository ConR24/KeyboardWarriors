import React from 'react';
import './App.css';
import TypingPage from "./TypingPage/TypingPage";
import {LandingPage} from "./LandingPage/LandingPage";
import {LeaderboardPage} from "./LeaderboardPage/LeaderboardPage";
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

interface MyProps {};
interface MyState {
  testState: string,
};

// TODO: this is just here until the routing and everything is set up, so it should be removed eventually
let insults = ["You are dumb", "Your father was a hamster and your mother smelt of elderberries", "I dislike you"];

class App extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      testState: "save",
    }
  }

  render(): JSX.Element {
    return (
      <div className="App">
        <header className="App-header">
          
        </header>
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path={'/'}>
              <LandingPage />
            </Route>
            <Route exact path={'/fight'}>
              <TypingPage insults={insults} />
            </Route>
            <Route exact path={'/leaderboard'}>
              <LeaderboardPage />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
