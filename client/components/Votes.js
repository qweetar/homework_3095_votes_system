import React from 'react';
import PropTypes from 'prop-types';

class Votes extends React.PureComponent {

    static propTypes = {
        vote: PropTypes.shape({
            code: PropTypes.number.isRequired,
            framework: PropTypes.string.isRequired,
            numVotes: PropTypes.number.isRequired,
        }), 
    };

    render() {
        return(
            <li>
              Кол-во голосов за {this.props.vote.framework}: { this.props.vote.numVotes }
            </li>
        );
    }

}

export default Votes;