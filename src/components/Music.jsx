import React, { Component } from 'react';

let rapidapihost = "x-rapidapi-host"
let rapidapikey = "x-rapidapi-key"
let baseURL = 'https://bridge-app-api.herokuapp.com'

export default class componentName extends Component {
    state = {
        songTitle: '',
        songs: [],
        results: null
    }
    
    findSongs= () => {
        fetch(baseURL + '/music').then(res => {
          return res.json();
        }).then(data => {
          this.setState({
            songs: data,
          });
        });
      }

    handleChange(evt) {
        this.setState({
        songTitle: evt.target.value,
        });
    }

    addSong(event, song) {
        event.preventDefault();
        fetch(baseURL + '/music/add', {
          method: 'POST',
          body: JSON.stringify({
              artist: song.artist.name,
              track: song.title,
              preview: song.preview,
              albumCover: song.album.cover,
              album: song.album.title,
              user: this.props.user
          }),
          headers: {
              'Content-Type': 'application/json',
          },
          }).then(res => {
          return res.json();
          }).then(data => {
            this.setState({
            });
            this.updateSongs(data)
    
        });
      }


    updateSongs = (newSong) => {
    const copySongs = [...this.state.songs];
    copySongs.push(newSong);
    this.setState({
        songs: copySongs,
    });
    }

    clear(evt) {
        evt.preventDefault();
        this.setState({
            results: null,
            songTitle: ""
        })
    }
    
    handleSubmit(evt) {
        evt.preventDefault();
        fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + this.state.songTitle, {
        method: "GET",
        headers: {
            [rapidapihost]: "deezerdevs-deezer.p.rapidapi.com",
            [rapidapikey]: "d65ab70a36mshc05a91c79bb1e24p1b72d0jsna55f54e3789c"
        }
        })
        .then(res => {
            return res.json();
            }).then(data => {
            this.setState({
                results: data.data
            })         
        }).catch(err => {
            console.log(err);
        });
    }

    componentDidMount() {
        this.findSongs();
      }
    
    render() {
        return (
        <>
            <div className='searchMusic'>
            <form onSubmit={ (evt) => this.handleSubmit(evt) }>
                <input type="text" id="songTitle" placeholder='artist,song,album'
                value={ this.state.songTitle}
                onChange={ (evt) => this.handleChange(evt) }/>
                <input type="submit" value="Search"/>
            </form>
            </div>
            {
                this.state.results ? 
                <div>
                <div className='musicsPreview' >
                {
                    this.state.results.map(song => {
                        return (
                        <div className='musicPreview'>
                        <h3>{song.title} by {song.artist.name} </h3> 
                        <a href="#" onClick={(event) => this.addSong(event, song)}> Add Song</a> </div>
                        )
                    })
                }   
                </div>
                <button onClick={(event) => this.clear(event)}>Clear Results</button>
                </div> 
                : ''
            }

            <div className="musics">
            {
                this.state.songs.map(song => {
                return (
                    <div className='music'>
                    <h2>{song.artist}</h2>
                    <img src={song.albumCover} />
                    <h3>Song: {song.track}</h3>
                    <h3>Album: {song.album}</h3>
                    <a href={song.preview}>&#9658; target="_blank"</a> 
                    </div>
                )
                })
            }
            </div>

        </>
        )
        }
  }