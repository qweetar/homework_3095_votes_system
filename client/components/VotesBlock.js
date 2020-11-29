import React from "react";
import isoFetch from "isomorphic-fetch";
import ResultBlock from './ResultBlock';
import Question from "./Question";
import DownloadButton from './DownloadButton';

class VotesBlock extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.loadVotes();
    this.loadQuestions();
  }

  state = {
    questionsReady: false,
    chosenVote: false,
    questions: [],
    voteResult: [],
    votesReady: false,
  };

  fetchError = (errorMessage) => {
    console.log(errorMessage);
  };

  fetchSuccess = (loadedData) => {
    console.log(loadedData);
    this.setState({
      votesReady: true,
      voteResult: loadedData,
    });
  };

  loadVotes = () => {
    isoFetch("http://46.101.125.193:3195/stat", {
    // isoFetch("http://localhost:3195/stat", {
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
      questionsReady: true,
      questions: loadedData,
    });
  };

  loadQuestions = () => {
    isoFetch("http://46.101.125.193:3195/variants", {
    // isoFetch("http://localhost:3195/variants", {
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
    this.loadVotes();
  }

  handleSubmit = (value) => {
    console.log(value);
    isoFetch("http://46.101.125.193:3195/vote", {
    // isoFetch("http://localhost:3195/vote", {
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
    console.log("component update");
    console.log(this.state.voteResult);
      if (!this.state.votesReady) {
        return <div>загрузка данных...</div>
      };

      let resultCode = <ResultBlock
        votes={this.state.voteResult}
        />;

      let questionsCode = this.state.questions.map(question => 
          <Question 
          key={question.code} 
          questions={question} 
          cbHandleSubmit={this.handleSubmit}
          />
        );

      let jsonBtn  = <DownloadButton btnName={'json'} />;
      let htmlBtn  = <DownloadButton btnName={'html'}/>;
      let xmlBtn  = <DownloadButton btnName={'xml'}/>;
      console.log("end");

    return (
      <div>
        <h1>Рейтинг JS фреймворков на основе народного голосования</h1>
        <div>
            <h3>Какой фреймвор JavaScript Вам больше всего нравится?</h3>
            {questionsCode}
        </div>
        <div>
          <h3>Рейтинг народного голосования</h3>
          {resultCode}
        </div>
        <div>
          <h3>Скачать результаты голосования</h3>
          <ul type='none'>
          {jsonBtn}
          {htmlBtn}
          {xmlBtn}
          </ul>
        </div>
      </div>
    );
  }
}

export default VotesBlock;
