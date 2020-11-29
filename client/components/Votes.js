import React from 'react';
import PropTypes from 'prop-types';

class Votes extends React.PureComponent {

    static propTypes = {
        vote: PropTypes.shape({
            code: PropTypes.number.isRequired,
            numVotes: PropTypes.number.isRequired,
        }), 
    };

    render() {
        return(
            <td>
               { this.props.vote.numVotes }
            </td>
        );
    }

}

export default Votes;