import React, { Component } from 'react';

// server variables setup and clearly laid out for heroku and local use
let serverURL = 'https://bridge-app-api.herokuapp.com'
// set variable to the .env hidden key
const api_book_key = process.env.api_book_key


export default class componentName extends Component {

  constructor(props) {
    super(props)
    // default state for this component set
    this.state = {
      baseURL: 'https://www.googleapis.com/books/v1/volumes?q=',
      apiKey: api_book_key,
      searchURL: '',
      bookTitle: '',
      book: null,
      booklist: []
    }
  }


  // setup function for handling text entry box
  handleChange(evt) {
    this.setState({
      bookTitle: evt.target.value,
    });
  }

  // find books function
  findBooks =() => {
    fetch(serverURL + '/books').then((res) => {
      return res.json()
    }).then(data => {
      this.setState({booklist: data})
    })
  }

  // function to add book to the server database
  addBook(event) {
    // prevent default refresh
    event.preventDefault()
    // fetch to the grab info from book books api via the book controller route
    fetch(serverURL + '/books/add', {
      method: 'POST',
      // pulling json data from the api call and assigning it to objects in objects
      body: JSON.stringify({
          title: this.state.books.items[0].volumeInfo.title,
          author: this.state.books.items[0].volumeInfo.authors[0],
          description: this.state.books.items[0].volumeInfo.description,
          publishedDate: this.state.books.items[0].volumeInfo.publishedDate,
          image: this.state.books.items[0].volumeInfo.imageLinks.thumbnail,
          rating: this.state.books.items[0].volumeInfo.averageRating,
          preview: this.state.books.items[0].volumeInfo.previewLink,
      }),
      headers: {
          'Content-Type': 'application/json',
      },
      }).then(res => {
      return res.json()
      }).then(data => {
      this.setState({book:null})
      this.updateBooks(data)
    })
  }

  updateBooks = (newBook) => {
    const copyBooks = [...this.state.booklist];
    copyBooks.push(newBook);
    this.setState({
      booklist: copyBooks,
    })
    // console.log(this.state.booklist)
  }

  // function for the submit button to pull data from the books api
  handleSubmit(evt) {
    // prevent refresh on default
    evt.preventDefault();
    // set the state for searchURL which is a combo of base api / search box / apik key insert from the .env folders
    this.setState({
      searchURL: this.state.baseURL + this.state.bookTitle + this.state.apiKey
    }, () => {
      // fetch response from api to grab json data
      fetch(this.state.searchURL).then(response => {
        return response.json();
      }).then(data => {
        // send data to console log and to the current state object books
        // console.log(data)
        this.setState({
          books: data,
        })
        // send erros to console log
      }).catch(err => {
        console.log('error:', err);
      });
    });
  }

  componentDidMount() {
    this.findBooks()
  }

  render() {
    return (
      <>
        {/* form for looking up books from the google books api */}
        <form onSubmit={ (evt) => this.handleSubmit(evt) }>
          <input type="text" id="bookTitle"
            value={ this.state.bookTitle} placeholder="Enter Book Title"
            onChange={ (evt) => this.handleChange(evt) }/>
          <input type="submit" value="Search"/>
        </form>
        {/* setting if statemetn for if the state is blank then it'll show the pull from the api and if not it'll show nothing */}
        {
          // takes state from handleSubmit where books is given data from api call and if that exists then it shows the preview window with the book found in the search
          this.state.books
            ? <div className= 'preview'>
            {/* grab title of book from the json object array */}
            <h1>Title: {this.state.books.items[0].volumeInfo.title}</h1>
            {/* grab the image of the book from the json object*/}
            <img className='bookPic' src={this.state.books.items[0].volumeInfo.imageLinks.thumbnail} alt={this.state.books.items[0].volumeInfo.title}/>
            {/* grab authors from the json data -- array returned so it grabs the first */}
            <h2>Author: {this.state.books.items[0].volumeInfo.authors[0]}</h2>
            {/* grabs description from the json data*/}
            <h3>Description: {this.state.books.items[0].volumeInfo.description}</h3>
            {/* grabs the date it was published */}
            <h3>Published Date: {this.state.books.items[0].volumeInfo.publishedDate}</h3>
            {/* rating is pulled from google books rating of books */}
            <h3>Average Rating: {this.state.books.items[0].volumeInfo.averageRating}</h3>
            {/* this is a link to a readable preview from the book */}
            <a href={this.state.books.items[0].volumeInfo.previewLink} target="_blank">Preview Here</a>
            {/* button to add the book info the database and make this part of the feed */}
            <button onClick={(event) => this.addBook(event)}>Add Book to Feed</button>
          </div> 
            : ''
        }
          <div className = "book-grid">
            {
              this.state.booklist.map(book => {
                return (
                  <div key = {book._id} className = 'book'>
                    <h2>{book.title}</h2>
                    <img className='bookImg' src={book.image} alt={book.title}/>
                    <h3>Author: {book.author}</h3>
                    <a href={book.previewLink} target="_blank"></a>
                    <h3>Published Year: {book.publishedDate}</h3>
                  </div>
                )
              })
            }
          </div>
        </>
    )
  }
}