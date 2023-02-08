// to log into herko type, `heroku auth:login` in terminal which will open a browser for you to log in
// then create an heroku instance: `herko create` which gives you a random url that your site will be hosted at
// type in `git remote -v` will check that we are both getting heroku and origin links to github and heroku attached to your repo
// We add and commit any changes like we know how to do
// then we do `git push heroku main` (i think may have missed this one)
// in order to open in browser, type in `heroku open` 

const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3001; //when we deploy a port in heroku, it will deploy to an available heroku port firs, then it will run it on our local server

const app = express();

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
