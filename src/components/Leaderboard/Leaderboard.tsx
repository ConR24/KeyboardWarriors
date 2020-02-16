import React from 'react';
import './Leaderboard.css';
import Table from 'react-bootstrap/Table'

export class Leaderboard extends React.Component {
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
                    {/*Hard Coded Currently until design is finalized*/}
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>RJC</td>
                            <td>1:24:45</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>RJC</td>
                            <td>1:30:15</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>RJC</td>
                            <td>1:30:16</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>RJC</td>
                            <td>1:34:45</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>RJC</td>
                            <td>1:36:15</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>RJC</td>
                            <td>1:38:16</td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td>RJC</td>
                            <td>1:40:45</td>
                        </tr>
                        <tr>
                            <td>8</td>
                            <td>RJC</td>
                            <td>1:42:15</td>
                        </tr>
                        <tr>
                            <td>9</td>
                            <td>RJC</td>
                            <td>1:43:16</td>
                        </tr>
                        <tr>
                            <td>10</td>
                            <td>RJC</td>
                            <td>1:50:16</td>
                        </tr>
                    </tbody>
                </Table>
              </div>
          </div>
      );
    }
  }