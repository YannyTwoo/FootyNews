const express = require('express');
const ejs = require('ejs')
const bodyParser = require('body-parser');
const newsApi = require('newsapi');
const session = require('express-session')
const axios = require('axios')
const cors = require('cors');



require('dotenv').config();

const newsapi = new newsApi(process.env.API_KEY)

const app = express();
const PORT = process.env.PORT || 2100;

app.use(express.json());
app.use(express.static('public'))
app.use(cors())



app.set('view engine', 'ejs');


let date = new Date();
let news = [];
let stuff = [];
let teamname = '';
const country = 'gb';
const language = 'en'


getNews = (team) =>{
    newsapi.v2.topHeadlines({
        q: team,
        category: 'sports',
        language: 'en',
        country: 'gb'
    })
    .then(response => {
        console.log(`${team} was clicked`)
        news = response.articles
        // res.redirect('/');
    })
}

app.route('/')
    .get((req, res) => {
        res.render('index', {news:news , teamname:teamname});
    })
    .post( (req, res) => {
        getNews(req.body.teamname);
        // sleep(500);
        console.log('rendering now')
        res.render('index', {news:news , teamname:teamname})
        // console.log(news)

    })

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
})


