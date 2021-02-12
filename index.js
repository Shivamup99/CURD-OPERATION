const mongoose = require('mongoose');
//const genres = require('./routes/genres');
//const customers = require('./routes/customers');
const movies = require('./route/movie');
const express = require('express');
const app = express();

const url ="mongodb+srv://shivam:NrDP9cDIANQhbYyw@cluster0.kgywn.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(url,{useCreateIndex:true,useUnifiedTopology:true,useFindAndModify:false,useNewUrlParser:true})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
//app.use('/api/genres', genres);
//app.use('/api/customers', customers);
app.use('/api/movies', movies);

const port = process.env.PORT || 5004;
app.listen(port, () => console.log(`Listening on port ${port}...`));