import React from 'react';
import PropTypes from 'prop-types';

class Question extends React.PureComponent {

    static propTypes = {
        questions: PropTypes.shape({
            code: PropTypes.number.isRequired,
            question: PropTypes.string.isRequired,
        }), 
        cbHandleSubmit: PropTypes.func.isRequired,
    };

    questionClicked = (EO) => {
        console.log("user made the choice " + EO.target.value);
        this.props.cbHandleSubmit(this.props.questions);
    }

    render() {
        return(
            <p>
              <input onClick={this.questionClicked} name="vote" type="radio" value={this.props.questions.code}/>
                {this.props.questions.question}
            </p>
        );
    }
}

export default Question;