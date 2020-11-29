import React from 'react';
import PropTypes from 'prop-types';
import Votes from './Votes';

class ResultBlock extends React.PureComponent {

    static propTypes = {
        votes: PropTypes.arrayOf(
          PropTypes.shape({
              code: PropTypes.number.isRequired,
              numVotes: PropTypes.number.isRequired,
          }) 
        ),
    };
    
      render() {
          let votesCode = this.props.votes.map( vote => 
                <Votes key={vote.code} vote={vote} />
            );

            return(
              <table border='1px solid black'>
                <thead>
                  <tr>
                    <th>Фреймворк</th>
                    <th>React</th>
                    <th>Angular</th>
                    <th>Vue</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Кол-во голосов</td>
                    {votesCode}
                  </tr>
                </tbody>
              </table>
            );
      }


}

export default ResultBlock;