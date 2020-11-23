import React from "react";
import isoFetch from "isomorphic-fetch";
import Votes from './Votes';
import Question from "./Question";

class VotesBlock extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.loadData();
    this.loadQuestions();
  }

  state = {
    dataReady: false,
    voteResult: [],
    chosenVote: null,
    questions: [],
  };

  fetchError = (errorMessage) => {
    console.log(errorMessage);
  };

  fetchSuccess = (loadedData) => {
    console.log(loadedData);
    this.setState({
      dataReady: true,
      voteResult: loadedData,
    });
  };

  loadData = () => {
    // isoFetch("http://46.101.125.193:3195/stat", {
    isoFetch("http://localhost:3095/stat", {
      method: "get",
      headers: {
        "Accept": "application/json",
      },
    })
      .then(response => {
        if (!response.ok) { 
          throw new Error("fetch error " + response.status);
        } else {
          return response.json();
        }
      })
      .then(data => {
        this.fetchSuccess(data);
      })
      .catch(error => {
        this.fetchError(error.message);
      });
  };

  fetchQuestionSuccess = (loadedData) => {
    console.log(loadedData);
    this.setState({
      questions: loadedData,
    });
  };

  loadQuestions = () => {
    // isoFetch("http://46.101.125.193:3195/variants", {
    isoFetch("http://localhost:3095/variants", {
      method: "post",
      headers: {
        "Accept": "application/json",
      },
    })
      .then(response => {
        if (!response.ok) { 
          throw new Error("fetch error " + response.status);
        } else {
          return response.json();
        }
      })
      .then(data => {
        this.fetchQuestionSuccess(data);
      })
      .catch(error => {
        this.fetchError(error.message);
      });
  };

  fetchSubminSuccess = () => {
    this.loadData();
    this.loadQuestions();
  }

  handleSubmit = (value) => {
    console.log(value);
    // isoFetch("http://46.101.125.193:3195/vote", {
    isoFetch("http://localhost:3095/vote", {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(value),
    })
    .then(response => {
      if(!response.ok) {
        throw new Error("fetch error " + response.status);
      } else {
        this.fetchSubminSuccess();
      }
    })
    .then(data => {
    })
    .catch(error => {
      this.fetchError(error.message);
    });
    };

  render() {
      if (!this.state.dataReady) {
        return <div>загрузка данных...</div>
      };

      let votesCode = this.state.voteResult.map( vote => 
            <Votes key={vote.code} vote={vote} />
        );

      let questionsCode = this.state.questions.map(question => 
          <Question 
          key={question.code} 
          questions={question} 
          cbHandleSubmit={this.handleSubmit}
          />
        );

    return (
      <div>
        <h1>Рейтинг JS фреймворков на основе народного голосования</h1>
        <div>
            <h3>Какой фреймвор JavaScript Вам больше всего нравится?</h3>
            {questionsCode}
        </div>
        <div>
          <h3>Рейтинг народного голосования</h3>
          <ul>
          {votesCode}
          </ul>
        </div>
      </div>
    );
  }
}

export default VotesBlock;
