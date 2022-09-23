import './App.css';
import { useState } from 'react'
import axios from 'axios';
import {apiKey} from './config'
import bookGiftImage from './assets/images/bookgift.png'
import SearchIcon from '@mui/icons-material/Search';
import Card from './components/Card';

function App() {
  const [search,setSearch] = useState("")
  const [bookData,setBookData] = useState([])
  const searchBook=(evt) => {
    if(evt.key === "Enter") {
      axios.get('https://www.googleapis.com/books/v1/volumes?q=' + search + '&key=' + apiKey + '&maxResults=40')
      .then(res => setBookData(res.data.items))
      .catch(err => console.error(err))
    }
  }
  let bookUrl = 'https://www.googleapis.com/books/v1/volumes?q='
  let imgPlaceholder = 'https://via.placeholder.com/150'


  return (
    <>
      <div className="header">
        
        <div className="row1">
          <h1>A book is a gift you can<br/> open again and again.</h1>
        </div>

        <div className="row2">
          <h2>Find Your Book</h2>
          <div className="search">
            <input 
              type="text"
              placeholder="Search for a book..."
              value={search}
              onChange={e=>setSearch(e.target.value)}
              onKeyPress={searchBook}
            />
            <button><SearchIcon/></button>
          </div>
          <img src={bookGiftImage} alt="Gift of Books"/>
        </div>
      </div>

      <div className="book-list">
        {
          <Card book={bookData}/>
        }
      </div>
    </>
  );
}

export default App;
