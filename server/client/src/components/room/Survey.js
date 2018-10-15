import React, {Component} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import { saveUserResponses } from '../../actions';
import "../App.css";

// survey component renders questions from DB when the link from createroom is clicked

class Survey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            users: [],
            userId: '1'
        }
      }

    componentDidMount() {
        const baseUrl = 'http://localhost:3000/api/room/'
        const roomId =  this.props.match.params.roomId + '/questions'
        const surveyUrl = baseUrl + roomId 
        console.log(this.props);
        // axios get req grabs the questions from props of Survey's redux state
        axios.get(surveyUrl).then((response) => {
            const questions = response.data;
            console.log(this);
            this.setState({questions:questions})
            this.setState({responses: new Array(questions.length)});
            //axios request below gets the endpoint for users in a given room
            axios.get(baseUrl + this.props.match.params.roomId + '/users').then(response => {
                const users = response.data;
                console.log(users);
                this.setState({users:users});
            })
            // axios.post(baseUrl + this.props.match.params.roomId.userId + '/submitResponses').then(response => {
            //     const userResponse = response.data;
            //     console.log(userResponse);
            //     this.setState({userResponse:userResponse});
            // })
         })        
    }

    // handles user event of clicking and links it up with redux actions
    handleSubmitButtonClick(event) {
        let roomId = this.props.match.params.roomId;
        let userId = this.state.userId;
        let body = {responses: this.state.responses};
        this.props.saveUserResponses(body, roomId, userId, this.props.history);

        console.log(this);
    }

        render() {
            const surveyQuestions = this.state.questions.map((question, index) => {
                return (
                    <li key={index}>{question} <input type="text" className="survey-inpuy" onChange={event => {
                        let updatedResponse = this.state.responses;
                        updatedResponse[index] = event.target.value;
                    }}></input></li>
                )
            })
            return (
            <div className="col-md-6">
                What's your name?
                <select onChange={event => this.setState({userId: event.target.value})}>
                    {this.state.users.map(user => {
                        return (
                            <option value={user.userId} key={user.userId} >{user.name}</option>
                        )
                    })}
                </select>
                <ul className="unstyled" id="questions-list">{surveyQuestions}</ul>
                <Button bsStyle="primary" onClick={event => this.handleSubmitButtonClick(event)}> Submit </Button>
                <Link to="/" className="btn btn-danger">Cancel</Link>

            </div>
            )
        }
    
} 

function mapStateToProps(reduxState) {
    let survey = reduxState.survey;
    let response = reduxState.saveUserResponse;
    return {survey, response};
}

function mapDispatchToProps(dispatch) {
    console.log(this.state);
    return bindActionCreators({ saveUserResponses }, dispatch);
  }

export default connect(mapStateToProps, mapDispatchToProps)(Survey);
