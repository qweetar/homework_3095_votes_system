const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressHbs = require('express-handlebars');
const hbs = require('hbs');
const fs = require('fs');
const webserver = express();
const cors = require('cors');
const { web } = require('webpack');
const { send } = require('process');

webserver.engine('hbs', expressHbs({
    layoutsDir: "views/layouts",
    defaultLayout: 'index',
    extname: 'hbs'
}))

webserver.set('view engine', 'hbs');
webserver.set('views', './views/layouts');

webserver.use(express.urlencoded({extended:true}));
webserver.use(bodyParser.json());
webserver.use(bodyParser.urlencoded({extended: true}));
webserver.use(express.static(path.join(__dirname + '/public')));

webserver.use(cors());

const port = 3095;

let votes;


webserver.get('/stat', function(req, res) {
    votes = require('./votes.json');
    // console.log(votes);
    res.json(votes);
});


webserver.post('/variants', function(req, res) {
    let questions = require('./questions.json');
    res.json(questions);
});

webserver.post('/vote', function(req, res) {
    console.log(req.body);
    res.send('vote ok');
    apdateVotes(req.body);
});

function apdateVotes(reqBody) {
    for (let i = 0; i < 3; i++) {
        if (votes[i].code == parseInt(reqBody.code)) {
            console.log(votes[i].numVotes);
            votes[i].numVotes++;
        }
    }
    console.log(2);

    let data = JSON.stringify(votes, null, 2);
    console.log(data);
    fs.writeFileSync('votes.json', data);
};

webserver.listen(port, () => {
    console.log('web server running on port ' + port);
});
