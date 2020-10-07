if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const { urlencoded } = require('express');
const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const port = 5555;
const bodyParser = require('body-parser');
/////////////////Passport/////////////////////////////
const flash = require('express-flash');
const session = require('express-session')
const passport = require('passport');
const initPass = require('./passconfig');
const { initialize } = require('passport');
const {check , validationResult} = require('express-validator');
const optionCheck = [
  check('user','Min 3 znaki').exists().isLength({min:3})
] 
initPass(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)
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
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
///////////////////////////////////

app.get('/',(req,res)=>{
    res.render('index')
});
//////////Loging///////////////
app.get('/login',(req,res)=>{
    res.render('login')
});
app.post('/login',passport.authenticate('local',{
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))
/////////////Register///////////
app.get('/register',(req,res)=>{
    res.render('register')
});
app.post('/register', urlencodedParser,optionCheck, async (req, res) => {
  const er = validationResult(req);
  if(!er.isEmpty()){
    alert = er.array()
    console.log(alert)
  } 
  try {
      //hashuje wpisany password przez user
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      users.push({
        id: Date.now().toString(),
        //urlencoded
        name: req.body.user,
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

