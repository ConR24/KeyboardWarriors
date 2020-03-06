import React from 'react';
import './Leaderboard.css';
import Table from 'react-bootstrap/Table';

export interface LeaderboardProps {
    dark: boolean
}

export interface LeaderboardState {
    records: Array<Record>;
}

export interface Record {
    name: string;
    speed: number;
}

export class Leaderboard extends React.Component<LeaderboardProps, LeaderboardState> {
    constructor(props: LeaderboardProps) {
        super(props);

        this.state = {
            records: []
        };

        this.generateLeaderboard = this.generateLeaderboard.bind(this);
    }

    componentDidMount() {
        fetch('/leaderboard')
            .then(res => res.json())
            .then(ranks => {
                this.setState({records: ranks.Player});
            });
    }

    generateLeaderboard() {
        return this.state.records.map((record, index) => {
            const ariaLabel = "Rank " + (index + 1) + ". Initials " + record.name + ". Speed " + record.speed + " characters per second";
            return (
            <tr key={record.name + record.speed} tabIndex={1} aria-label={ariaLabel}>
                <td>{ index + 1 }</td>
                <td>{ record.name }</td>
                <td>{ record.speed + " char/sec" }</td>
            </tr>) 
         });
    }


    render() {
      return (
          <div className="leaderboard-container" tabIndex={1} aria-label="Leader board">
              <h2 className="leaderboard-title">Leaderboard</h2>
              <div className="leaderboard-table">
                <Table className={this.props.dark ? "dark-table" : ""} borderless striped responsive="sm">
                    <thead tabIndex={1} aria-label="Rank, initials, and typing speed">
                        <tr>
                            <th>Rank</th>
                            <th>Initials</th>
                            <th>Speed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.generateLeaderboard()}
                    </tbody>
                </Table>
              </div>
          </div>
      );
    }
  }