const express = require('express');
const ejs = require('ejs')
const bodyParser = require('body-parser');
const newsApi = require('newsapi');
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
let teamname = '';

app.route('/')
    .get((req, res) => {
        res.render('index', {news:news , teamname:teamname});
    })
    .post((req, res) => {

        // const {parcel} = req.body;
        // if(!parcel){
        //     return res.status(400).send({status:'failed'})
        // }
        // res.status(200).send({status:'received'})

        newsapi.v2.topHeadlines({
            q: req.body.teamname,
            category: 'sports',
            language: 'en',
            country: 'gb'
        })
        .then(response => {
            console.log("response stat: " + response.articles);
            console.log("\nresponse : " + response.totalResults);
            news = response.articles

            res.render('index', {news:news});
        })
        
        console.log(news)

    })

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
})


