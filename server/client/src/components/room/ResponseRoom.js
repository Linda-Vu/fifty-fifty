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

  renderUserResponse(response) {
    if(!response) {
        return (<em className="no-user-response">...waiting for user response</em>)
    }

    return response;
  }
  render() {
    let { responses } = this.props;
    let { questions } = this.state;

    if (!responses || !questions) {
        return <div>Loading...</div>;
    }

    let users = responses;

    return (
        <div className="col-md-7 col-sm-7">
           { questions.map((question, questionIndex) => {
               return (
                <div className="container question-container" key={questionIndex}>   
                    <div className="row">
                        <div className="col-md-12 col-sm-12 justified question-style">
                            {question}
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="offset-md-1 col-md-5 col-sm-5 centered">
                                <p className="name-style">
                                {users[0].name}
                                </p>
                            <br/>
                                <p className="user-response">
                                {this.renderUserResponse(users[0].responses[questionIndex])}
                                </p>
                        </div>
                        <div className="offset-md-1 col-md-5 col-sm-5 centered">
                                <p className="name-style">
                                {users[1].name}
                                </p>
                            <br/>
                                <p className="user-response">
                                {this.renderUserResponse(users[1].responses[questionIndex])}
                                </p>
                        </div>
                    </div>
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


