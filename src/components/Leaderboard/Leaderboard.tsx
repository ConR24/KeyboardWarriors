import React from 'react';
import './Leaderboard.css';
import Table from 'react-bootstrap/Table';
import { msToTimeString } from "../../util";

export interface LeaderboardProps {}

export interface LeaderboardState {
    records: Array<Record>;
}

export interface Record {
    name: string;
    time: number;
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
            return (
            <tr key={record.name}>
                <td>{ index + 1 }</td>
                <td>{ record.name }</td>
                <td>{ msToTimeString(record.time) }</td>
            </tr>) 
         });
    }


    render() {
      return (
          <div className="leaderboard-container">
              <h2 className="leaderboard-title">Leaderboard</h2>
              <div className="leaderboard-table">
                <Table borderless striped responsive="sm">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Initials</th>
                            <th>Time</th>
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