import React, {Component} from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import axios from 'axios';
// import { createRoom } from '../../actions';


// survey component renders questions from DB when the link from createroom is clicked

class Survey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: []
        }
      }

    componentDidMount() {
        const baseUrl = 'http://localhost:3000/api/room/'
        const roomId =  this.props.match.params.roomId + '/questions'
        const surveyUrl = baseUrl + roomId 
        console.log(this.props);
        axios.get(surveyUrl)
        axios.get(surveyUrl)
         .then((response) => {
            const questions = response.data;
            console.log(this);
            this.setState({questions:questions})
         })
        // this.props.fetchSurveyQuestions();
        
    }
        render() {
            const surveyQuestions = this.state.questions.map((question, index) => {
                return (
                    <li id="questions" key={index}>{question}</li>
                )
            }
        )
            return (
            <div>
                <ul>{surveyQuestions}</ul>
            </div>
            )
        }
    
} 

function mapStateToProps(reduxState) {
    let survey = reduxState.survey;  
    return {survey};
  }

export default connect(mapStateToProps)(Survey);
