//global imports
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

//local imports
const books = require('./books-data.js');

const app = express();

app.use(morgan('common'));
app.use(cors());


app.get('/books', (req, res) => {
    const { search = "", sort } = req.query; //where the server is looking for the query string, key is search in this ex
  
    if (sort) {
      if (!['title', 'rank'].includes(sort)) {
        return res
          .status(400)
          .send('Sort must be one of title or rank');
      }
    }
  
    let results = books
          .filter(book =>
              book
                .title
                .toLowerCase()
                .includes(search.toLowerCase()));
  
    if (sort) {
      results
        .sort((a, b) => {
          return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      });
    }
  
    res
      .json(results);
  });


module.exports = app; 
