import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { fetchSurveyResponses } from "../../actions";
import axios from 'axios';
import "../App.css";


class ResponseRoom extends Component {
  constructor(props) {
      super(props);

      this.state = {};
  }

  componentDidMount() {
    const baseUrl = 'http://localhost:3000/api/room/'
    const roomId =  this.props.match.params.roomId
    const surveyUrl = baseUrl + roomId +'/questions'
    // axios get req grabs the questions from props of Survey's redux state
    axios.get(surveyUrl).then((response) => {
        const questions = response.data;
        console.log(this);
        this.setState({questions:questions}) 
    })

    const { responses } = this.props.match.params;
    // let userId = this.state.userId;
    this.props.fetchSurveyResponses(roomId);
    console.log(this);
  }

  renderUserResponse(user, index) {
    if(!user.responses || !user.responses[index]) {
        return (<div className="no-user-response">user still needs to fill this out</div>)
    }

    return user.responses[index];
  }
  render() {
    let { responses } = this.props;
    let { questions } = this.state;

    if (!responses || !questions) {
        return <div>Loading...</div>;
    }
    

    return (
      <div className="col-md-8">
          {
              responses.map((user, userIndex) => {
                return (
                    <div key={userIndex} className="col-md-8">
                        <li className="unstyled" className="user-name">{user.name}</li>
                        <ul className="unstyled" id="responses-list">{questions.map((question, questionIndex) => {
                            return (
                            <li key={questionIndex} className="response-questions">{question}: {this.renderUserResponse(user, questionIndex)}</li>
                            )
                        })}
                        </ul>
                    </div>
                )
            })
          }
      </div>
    );
  }
}

function mapStateToProps(state) {
  let responses = state.responses;
  return { responses };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchSurveyResponses}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ResponseRoom);
