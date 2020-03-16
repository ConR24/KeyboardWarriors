import React from 'react';
import './App.css';
import TypingPage from "./TypingPage/TypingPage";
import {JoinPage} from "./JoinPage/JoinPage";
import {LandingPage} from "./LandingPage/LandingPage";
import {LeaderboardPage} from "./LeaderboardPage/LeaderboardPage";
import sun from "./resources/sun.svg";
import moon from "./resources/night.svg";
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

interface MyProps {}
interface MyState {
  testState: string,
  insults: string[],
  dark: boolean
}

class App extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      testState: "save",
      insults: [],
      dark: localStorage.getItem("darkMode") ? localStorage.getItem("darkMode") === "true" : false
    }

    this.toggleTheme = this.toggleTheme.bind(this);
  }

  componentDidMount() {
    fetch('/insults')
      .then(res => res.json())
      .then(insults => {
          this.setState({insults: insults});
      });
  }

  toggleTheme(e: any): void {
    e.preventDefault();
    //Set localStorage in callback because setState is async
    this.setState({
      dark: !this.state.dark
    }, () => {
      localStorage.setItem("darkMode", this.state.dark ? "true" : "false");
    });
  }

  render(): JSX.Element {
    return (
        <div className={this.state.dark ? "App dark" : "App"}>
          <header className="App-header">
          </header>
          <Router basename={process.env.PUBLIC_URL}>
            <Switch>
              <Route exact path={'/'}>
                <LandingPage dark={this.state.dark} />
              </Route>
              <Route exact path={'/fight'}>
                <TypingPage dark={this.state.dark} insults={this.state.insults} />
              </Route>
              <Route exact path={'/leaderboard'}>
                <LeaderboardPage dark={this.state.dark} />
              </Route>
              <Route exact path={'/join'}>
                <JoinPage />
              </Route>
            </Switch>
          </Router>
          {
            this.state.dark ? <img className="mode-toggle dark" onClick={this.toggleTheme} onKeyPress={this.toggleTheme} src={sun} alt={'A sun'} tabIndex={1} aria-label="Toggle for light mode"></img> :
            <img className="mode-toggle" onClick={this.toggleTheme} onKeyPress={this.toggleTheme} src={moon} alt={'A cloudy moon'} tabIndex={1} aria-label="Toggle for dark mode"></img>
          }
        </div>
    );
  }
}

export default App;
