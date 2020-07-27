import React, { useState, useEffect } from 'react';
import axios from "axios";

import espn2 from './img/espn-nba-logo.png'
import espn3 from './img/nba-countdown.jpg'
import teamlogo from './img/team_logo.jpg'
import allen from './img/aibutton.jpg'
import bryant from './img/bryant.jpg'
import fantasy from './img/fantasy.jpg'
import jordan from './img/jordam.jpeg'
import kobe from './img/kobe-logo.png'
//import Header from '/component/header'
//import './App.css';

export default function Last(){
  let [scores, setScores] = useState([]);

  let baseURL = 'https://bridge-app-api.herokuapp.com'
  
  let baseAPI = `/api/v1/updates`

  /*handleChange=(evt)=>{
    this.setState({
      nbaTeam: evt.target.value,
    })
  }*/


  useEffect(() => {
      axios.get(baseURL + baseAPI)
      .then(({ data }) => {
        setScores(data);
      })
      .catch((err) => {
        console.log(err)
      })
}, [])


 

  return (
    <>
      
      <main>
      <br />
      <div className="container">
     
      
          <div className="col-md-12">
              <div className="card card-cascade wider reverse">
            
                  <div className="card-body card-body-cascade text-center">

                    <h4 id= 'logobball'className="card-title"><img src='https://a.espncdn.com/combiner/i?img=/i/teamlogos/leagues/500/nba.png&w=68&h=30&transparent=true' alt="basket" />{""}<strong></strong></h4>
                    <h4 id= 'logobball' className="card-title"><img src={fantasy} width='68' height= '30'  alt="basket" />{""}<strong></strong></h4>
                    <h4 id= 'logobball' className="card-title"><img src={bryant} width='68' height= '30'  alt="basket" />{""}<strong></strong></h4>
                    <h4 id= 'logobball' className="card-title"><img src={jordan} width='68' height= '30'  alt="basket" />{""}<strong></strong></h4> <br/><br/>
                    <h4 id= 'logoNba' className="card-title"><img src={kobe} width='100' height= '70'  alt="basket" />{""}<strong></strong></h4>
                    <h4 id= 'logoNba' className="card-title"><img src={espn2} width='100' height= '70'  alt="basket" />{""}<strong></strong></h4>
                    <h4 id= 'logoNba' className="card-title"><img src={espn3} width='100' height= '70'  alt="basket" />{""}<strong></strong></h4><br/><br/>
                   
            <form onClick={ (evt) => this.useEffect(evt) }>
                  <input type="text" id="allensub" placeholder="NBA Team" width='200'
                      //value={ this.state.nbaTeam}
                      // onChange={ (evt) => this.handleChange(evt) }
                       />
          <input width='70' height= '30' id='allenSubmitButton' type="submit"/> 
          </form> 
                      <br/><br/>
                   <h4  className="card-title"><img src={teamlogo} width='500' height= '200'  alt="basket" />{""}<strong></strong></h4>



                    {/* table */}
                    <table id="dtBasicExample" className="table table-striped table-bordered table-sm" cellSpacing="0" width="100%">
                        <thead>
                          <tr>
                            <th className="th-sm">Date</th>
                            <th className="th-sm">Home Team
                            </th>
                            <th className="th-sm">Home team score
                            </th>
                            <th className="th-sm">Visitors Team
                            </th>
                            <th className="th-sm">Visitors Team Score
                            </th>
                            <th>Status
                            </th>
                            <th>Season
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                              scores.map((score, index) => (
                                <tr key={index}>
                                  <td>{score.date.replace(/T/, ' ').replace(/\..+/, '').slice(0,10)}</td>
                                  <td>{score.home_team}</td>
                                  <td>{score.home_team_score}</td>
                                  <td>{score.visitor_team}</td>
                                  <td>{score.visitor_team_score}</td>
                                  <td>{score.status}</td>
                                  <td>{score.season}</td>
                                </tr>
                              ))
                          }
                        </tbody>
                        <tfoot>
                          <tr>
                            <th>Date
                            </th>
                            <th>Home Team
                            </th>
                            <th>Home Team Score
                            </th>
                            <th>Visitors Team
                            </th>
                            <th>Visitors Team Score
                            </th>
                            <th>Status
                            </th>
                            <th>Season
                            </th>
                          </tr>
                        </tfoot>
                      </table>
                    
                    <a className="px-2 fa-lg li-ic" href="#!"><i className="fab fa-linkedin-in"></i></a>
                    <a className="px-2 fa-lg tw-ic" href="#!"><i className="fab fa-twitter"></i></a>
                    <a className="px-2 fa-lg fb-ic" href="#!"><i className="fab fa-facebook-f"></i></a>
                  </div>
                </div>
          </div>
      </div>

      </main>
    </>
  );
}