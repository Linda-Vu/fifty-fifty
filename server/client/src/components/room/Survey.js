import React, {Component} from "react";
import { connect } from "react-redux";
import axios from 'axios';
import "../App.css";

// import { createRoom } from '../../actions';


// survey component renders questions from DB when the link from createroom is clicked

class Survey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            users: [],
        }
      }

    componentDidMount() {
        const baseUrl = 'http://localhost:3000/api/room/'
        const roomId =  this.props.match.params.roomId + '/questions'
        const surveyUrl = baseUrl + roomId 
        console.log(this.props);
        // axios grabs the questions from
        axios.get(surveyUrl).then((response) => {
            const questions = response.data;
            console.log(this);
            this.setState({questions:questions})
            //axios request below gets the endpoint for users in a given room
            axios.get(baseUrl + this.props.match.params.roomId + '/users').then(response => {
                const users = response.data;
                console.log(users);
                this.setState({users:users});
            })
         })        
    }
        render() {
            const surveyQuestions = this.state.questions.map((question, index) => {
                return (
                    <li key={index}>{question} <input type="text" onChange={event => console.log(index, event.target.value)}></input></li>
                )
            }
        )
            return (
            <span>
                What's your name?
                <select onChange={event => console.log(event.target.value)}>
                    {this.state.users.map(user => {
                        return (
                            <option value={user.userId} key={user.userId} >{user.name}</option>
                        )
                    })}
                </select>
                <ul className="unstyled" id="questions-list">{surveyQuestions}</ul>
            </span>
            )
        }
    
} 

function mapStateToProps(reduxState) {
    let survey = reduxState.survey;  
    return {survey};
  }

export default connect(mapStateToProps)(Survey);
