require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');
const cloudinary = require('cloudinary').v2;

const postRoutes = require('./routes/post');
const pageRoutes = require('./routes/page');

const mongoURL = process.env.MONGOURL;

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended : true,
  })
);
app.use(express.static(path.join(__dirname, 'public')));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', postRoutes);
app.use('/', pageRoutes);

mongoose.Promise = Promise;
mongoose
  .connect(mongoURL, {
    useUnifiedTopology : true,
    useNewUrlParser    : true,
  })
  .then(() => {
    app.listen(process.env.PORT || 8080, function() {
      console.log('App running!');
    });
  })
  .catch(err => console.log(err));
