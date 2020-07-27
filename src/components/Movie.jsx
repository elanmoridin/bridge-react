import React, { Component } from 'react';
import Modals from './Modals'

let baseURL = 'http://localhost:3003'


export default class componentName extends Component {


  constructor(props) {
    super(props)
    this.state = {
      baseURL: 'http://www.omdbapi.com/?apikey=b764ea59&t=',
      movieTitle: '',
      searchURL: '',
      movie: null,
      movies: []
    }
  }

  findMovies= () => {
    fetch(baseURL + '/movies').then(res => {
      return res.json();
    }).then(data => {
      this.setState({
        movies: data,
      });
    });
  }

  handleChange(evt) {
    this.setState({
      movieTitle: evt.target.value,
    });
  }

  addMovie(event) {
    event.preventDefault();
    fetch(baseURL + '/movies/add', {
      method: 'POST',
      body: JSON.stringify({
          title: this.state.movie.Title,
          year: this.state.movie.Year,
          image: this.state.movie.Poster,
          genre: this.state.movie.Genre,
          plot: this.state.movie.Plot,
          user: this.props.user
      }),
      headers: {
          'Content-Type': 'application/json',
      },
      }).then(res => {
      return res.json();
      }).then(data => {
        this.setState({
          movie: null
        });
        this.updateMovies(data)

    });
  }

  updateMovies = (newMovie) => {
    const copyMovies = [...this.state.movies];
    copyMovies.push(newMovie);
    this.setState({
      movies: copyMovies,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.setState({
      searchURL: this.state.baseURL + this.state.movieTitle,
    }, () => {
      fetch(this.state.searchURL).then(response => {
        return response.json();
      }).then(data => {
        
        this.setState({
          movie: data,
        });
      }).catch(err => {
        console.log('error:', err);
      });
    });
  }

  componentDidMount() {
    this.findMovies();
  }


  render() {
    return (
      <>
        <div className='searchMovie'>
        <form onSubmit={ (evt) => this.handleSubmit(evt) }>
            <input type="text" id="movieTitle" placeholder="Movie's name"
            value={ this.state.movieTitle}
            onChange={ (evt) => this.handleChange(evt) }/>
          <input type="submit" value="Search"/>
        </form> 
        </div>
        {
          this.state.movie
            ? <div className='preview'>

          <h1>{this.state.movie.Title}</h1>
            <h2>Year: {this.state.movie.Year}</h2>
            <img className='previewImg' src={this.state.movie.Poster} alt={this.state.movie.Title}/>
            <h3>Genre: {this.state.movie.Genre}</h3>
            <h4>Plot: {this.state.movie.Plot}</h4> 
            <button onClick={(event) => this.addMovie(event)}>Add movie</button>
            </div> 
            : ''
        }
        

        <div className="movies">
          {
            this.state.movies.map(movie => {
              return (
                <div  className='movie'>
                      <h2>{movie.title}</h2>
                      <img className='movieImg' alt=''src={movie.image} />
                      <h3>Genre: {movie.genre}</h3>
                      <h3>Year: {movie.year}</h3>
                      <h3>Plot: {movie.plot}</h3> 
                      <Modals/>
                  </div>
                
              )
            })
          }
        </div>

      </>
    )
  }
}