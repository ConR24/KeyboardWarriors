import React from 'react';
import './App.css';
import TypingPage from "./TypingPage/TypingPage";
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
            </Switch>
          </Router>
          {
            this.state.dark ? <img className="mode-toggle dark" onClick={(e) => this.toggleTheme(e)} src={sun} alt={'A sun'}></img> :
             <img className="mode-toggle" onClick={(e) => this.toggleTheme(e)} src={moon} alt={'A cloudy moon'}></img>
          }
          
          
        </div>
    );
  }
}

export default App;
