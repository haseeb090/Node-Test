const express =require('express');
const hbs = require('hbs');
var app = express();
const fs = require('fs');


hbs.registerPartials(__dirname + '/views/partials');

app.set('view enigne', 'hbs');


app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) =>{
        if(err){ 
            console.log('Unable to respond'); 
        }
    });
    next();
});

app.use((req, res, next)=>{
    res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});

app.get('/', (req, res)=>{
    // res.send('<h1>Hello!</h1>');
    res.render('home.hbs', {
        welcomeMessage: `Welcome to telaran'rhiod`,
        pageTitle:'Home Page'
    });
});

app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        pageTitle:'About Page'
    });
});

app.get('/bad', (req, res)=>{
    res.send({
        Error: 'Error page needs to go drop a deuce'
    });
});
app.listen(3000, ()=>{
    console.log('Server running on port 3000');
});