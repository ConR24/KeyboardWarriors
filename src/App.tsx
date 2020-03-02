import React from 'react';
import './App.css';
import TypingPage from "./TypingPage/TypingPage";
import {LandingPage} from "./LandingPage/LandingPage";
import {LeaderboardPage} from "./LeaderboardPage/LeaderboardPage";
import flashlight from "./resources/flashlight.svg";
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

interface MyProps {};
interface MyState {
  testState: string,
  insults: string[],
};

class App extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      testState: "save",
      insults: [],
    }
  }

  componentDidMount() {
    fetch('/insults')
      .then(res => res.json())
      .then(insults => {
          this.setState({insults: insults});
      });
  }

  toggleTheme(e: React.MouseEvent<HTMLImageElement, MouseEvent>): void {
    e.preventDefault();
    console.log("Clicked!");
  }

  render(): JSX.Element {
    return (
      <div className="App">
        <header className="App-header">
          <img className="mode-toggle" onClick={(e) => this.toggleTheme(e)} src={flashlight} alt={'A flashlight'}></img>
        </header>
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path={'/'}>
              <LandingPage />
            </Route>
            <Route exact path={'/fight'}>
              <TypingPage insults={this.state.insults} />
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
