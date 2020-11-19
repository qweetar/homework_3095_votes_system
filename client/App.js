'user strict';

import React from 'react';
import ReactDom from 'react-dom';

import VotesBlock from './components/VotesBlock';

ReactDom.render(
    <VotesBlock />, document.getElementById('container')
);