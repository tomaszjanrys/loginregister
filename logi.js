const { urlencoded } = require('express');
const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const port = 5555;
const bodyParser = require('body-parser');
/////////////////Passport/////////////////////////////
const passport = require('passport');
const initPass = require('./passconfig');
initPass(passport)
////////////////////////End pass///////////////////////////

// URLENCODED  Analizuje przychodzące żądania za pomocą ładunków zakodowanych 
//w formacie urlencod i opiera się na analizatorze składni treści.
const urlencodedParser = bodyParser.urlencoded({extended:false})

const users = [];
///////////////////////////////////
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));

app.use(express.json())

///////////////////////////////////

app.set('view engine', 'ejs');
app.set('views','./views');
///////////////////////////////////

app.get('/',(req,res)=>{
    res.render('index')
});
//////////Loging///////////////
app.get('/login',(req,res)=>{
    res.render('login')
});
app.post('/login', (req,res)=>{

});
/////////////Register///////////
app.get('/register',(req,res)=>{
    res.render('register')
});
app.post('/register', urlencodedParser, async (req, res) => {
    try {
      //hashuje wpisany password przez user
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      users.push({
        id: Date.now().toString(),
        //urlencoded
        name: req.body.username,
        email: req.body.email,
        password: hashedPassword
      })
      //po przeslaniu przekierowanie do login 
      res.redirect('/login')
    } catch {
      res.redirect('/register')
    }
    console.log(users)
  })







///////////////////////////////////
app.listen(port,(err)=>{
    try {
        console.info('Server running ... on  ' + port)
    }catch{
        console.error("Error" + err)
    }
});

