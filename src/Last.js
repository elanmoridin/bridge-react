import React, { useState, useEffect, } from 'react';
import Slide from './components/slides/Slide.jsx'
import axios from "axios";
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel' 
import Slides from './components/slides/Slides' 




export default function Last(){
  let [scores, setScores] = useState([]);
  let highlight= {
    data:['/highlightgame1','/highlightgame2','/highlightgame3',
    '/highlightgame4',
    '/highlightgame5',
    '/highlightgame6',
    '/highlightgame7'
  ]
  
  }

  let baseURL = 'https://bridge-app-api.herokuapp.com'
  
  let baseAPI = `/api/v1/updates`
 
  
  useEffect(() => {

       
    axios.get(baseURL + baseAPI)
    .then(({ data }) => {
      setScores(data);
      console.log(data)
    })
    .catch((err) => {
      console.log(err)
    })

}, [])




  return (
    <>
      
      <main className='backg'>
      <br />
      <div className="backborder">
     
      
          <div className="col-md-12">
              <div className="card card-cascade wider reverse">
            
                  <div className="card-body card-body-cascade text-center">

                    <h4 id= 'logobball'className="card-title"><img src='https://a.espncdn.com/combiner/i?img=/i/teamlogos/leagues/500/nba.png&w=85&h=48&transparent=true' alt="basket" />{""}<strong></strong></h4>
                    <br/><br/><br/>
                  <div className='carouselDiv'><br/>
                  <Slide />

                  <br/><br/>

                  <Slides />
                 
                  </div> <br/><br/>

             {/* <form >
                  <input type="text" id="allensub" placeholder="NBA Team" width='200'
                      value={scores.home_team}
                   
                       />
                  <input width='70' height= '30' id='allenSubmitButton' type="submit"/> 
            </form>  */}
                     
                   
           
                    <br/><br/>
                    
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
                            <th>Highlights</th>
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
                                 
                                  <td><a href='/highlightgame1'><button id= 'allenSubmitButton'></button></a>
                                  </td>
                                </tr>
                              ))
                              }

                            
                                      
                        </tbody>
                
                      </table>
                 
              
                  </div>
                </div>
          </div>
      </div>
    

      </main>
    </>
  );
}

