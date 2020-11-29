const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const expressHbs = require('express-handlebars');
// const hbs = require('hbs');
const fs = require('fs');
const webserver = express();
const cors = require('cors');
const {toXML} = require('jstoxml');


// let hb = expressHbs.create();

// webserver.engine('.hbs', hb.engine);


// webserver.set('view engine', '.hbs');
webserver.set('views', './views');

webserver.use(express.urlencoded({extended:true}));
webserver.use(bodyParser.json());
webserver.use(bodyParser.urlencoded({extended: true}));
webserver.use(express.static(path.resolve(__dirname + '/views')));

webserver.use(cors());

const port = 3195;

webserver.get('/stat', function(req, res) {
    let votes = require('./votes.json');
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

webserver.post('/download', function(req, res) {
    let votes = require('./votes.json');
    console.log(votes);
    console.log(req.headers.accept);
    switch (req.headers.accept) {
        case 'application/json':
            console.log(req.headers.accept + ' is ready');
            res.setHeader('Content-Disposition', 'attachment');
            res.setHeader('Content-Type', req.headers.accept);
            res.send(votes);
            break;
        case 'text/html':
            console.log(req.headers.accept + ' is ready');
            res.setHeader('Content-Disposition', 'attachment');
            res.setHeader('Content-Type', req.headers.accept);
            res.send(votes);
            // let hb = expressHbs.create();
            // hb.render('server/veiws/results.hbs', {
            //     framework1: votes[0].framework,
            //     vote1: votes[0].numVotes,
            //     framework2: votes[1].framework,
            //     vote2: votes[1].numVotes,
            //     framework3: votes[2].framework,
            //     vote3: votes[2].numVotes
            // });
            // .then((renderedHTML) => {
            //     res.send({html: renderedHTML});
            // });
            // res.send(hb);
            break;
        case 'application/xml':
            console.log(req.headers.accept + ' is ready');
            res.setHeader('Content-Disposition', 'attachment');
            res.setHeader('Content-Type', req.headers.accept);
            res.send(toXML(votes));
            break;
        default:
            console.log(req.headers.accept + ' is not found');
    }
});

function apdateVotes(reqBody) {
    let votes = require('./votes.json');
    for (let i = 0; i < 3; i++) {
        if (votes[i].code == parseInt(reqBody.code)) {
            console.log(votes[i].numVotes);
            votes[i].numVotes++;
        }
    }
    console.log(2);

    let data = JSON.stringify(votes, null, 2);
    console.log(data);
    fs.writeFileSync('./server/votes.json', data);
};

webserver.listen(port, () => {
    console.log('web server running on port ' + port);
});
