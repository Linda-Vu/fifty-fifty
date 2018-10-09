const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/dev')
require('./models/Room');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

require('./routes/roomRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // like our main.js file, or main.css file!
    app.use(express.static('client/build'));
  
    // Express will serve up the index.html file
    // if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT);