import React from 'react';
import Login from './components/Login.jsx'
import Movie from './components/Movie.jsx'
import Books from './components/Books.jsx'
import Music from './components/Music.jsx'
import Navbar from './components/Navbar.jsx'
import Welcome from './components/Welcome.jsx'
import Last from './Last.js'



import './App.css';
import { Switch , Route} from 'react-router-dom'

let baseURL
if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003'
} else {
  baseURL = 'https://bridge-app-api.herokuapp.com/'
}

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: null,
      LoginUsername: '',
      LoginPassword: '',
      NewUsername: '',
      NewPassword: '',
      email: '', 

    }
  }


addUser = (newUser) => {
  const copyUser = [...this.state.users];
  copyUser.push(newUser);
  this.setState({
    users: copyUser,
  });
}

handleChange = (event) => {
  this.setState({
      [event.target.id]: event.target.value,
  });
}

handleLogin = (event) => {
  event.preventDefault();
  console.log("hello")
  fetch(baseURL + '/users/login', {
      method: 'POST',
      body: JSON.stringify({
          username: this.state.LoginUsername,
          password: this.state.LoginPassword
      }),
      headers: {
          'Content-Type': 'application/json',
      },
  }).then(res => {
      return res.json();
  }).then(data => {
      // this.props.addUser(data);
      this.setState({
          username: data.username,
          LoginUsername: '',
          LoginPassword: ''
      });
  }).catch(err => {
    console.log(err);
});
}

handleSignUp = (event) => {
  event.preventDefault();
  fetch(baseURL + '/users/signup', {
      method: 'POST',
      body: JSON.stringify({
          username: this.state.NewUsername,
          password: this.state.NewPassword,
          email: this.state.email
      }),
      headers: {
          'Content-Type': 'application/json',
      },
  }).then(res => {
      return res.json();
  }).then(data => {
      console.log(data)
      this.setState({
          username: data.username
      });
      fetch(baseURL + '/bridge', {
          method: 'POST',
          body: JSON.stringify({
              username: data.username,
          }),
          headers: {
              'Content-Type': 'application/json',
          },
      }).then(res => {
          return res.json();
      }).then(data => {
        this.setState({
        LoginUsername: '',
        LoginPassword: '',
        NewUsername: '',
        NewPassword: '',
        email: '', 
      });
    });
  })
}

handleLogout = () => {

  this.setState({
      username:null
  });
}

render () {

    return (

      <div >
        {
          this.state.username ? 
        <>
        <Navbar handleLogout={this.handleLogout} />
        <Switch>  
          
          
          <Route exact path='/' 
          render={ () =>
          <Welcome  username = {this.state.username}
            />

        } />

          { <Route exact path='/lastdance' component={Last}/> }

          <Route exact path='/movies' render={()=><Movie 
          user={this.state.username}

          />}/>
          <Route exact path='/music' render={() => <Music 
          user={this.state.username}
          />}/>
          
          <Route exact path='/books' render={() => <Books 
          user={this.state.username}
          />}/>
        </Switch>
        </>
    : 
    
    <Login 
    handleSignUp={this.handleSignUp}
    handleLogin={this.handleLogin}
    handleChange={this.handleChange}
    username = {this.state.username}
    LoginUsername = {this.state.LoginUsername}
    LoginPassword = {this.state.LoginPassword}
    NewUsername = {this.state.NewUsername}
    NewPassword = {this.state.NewPassword}
    email = {this.state.email}
    />     
    }  
      </div>


    )}
}

export default App;
