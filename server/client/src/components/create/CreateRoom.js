import React, {Component} from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import {Button} from 'react-bootstrap';
import { bindActionCreators } from "redux";
import { createRoom } from '../../actions';

// createRoom should have a place to take user input
// upon submitting the roomName --->
// the page should toggle and reveal a link to the new room
// couldn't figure out how to render placeholder text in the fields :(
class CreateRoom extends Component {
    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;

        return (
          <div className={className}>
            <label>{field.label}</label>
            <input className="form-control" type="text" {...field.input} />
            <div className="text-help">
              {touched ? error : ""}
            </div>
          </div>
        );
      }
    
      onSubmit(values) {
        console.log(values);
        this.props.createRoom(values, () => {
        });
      }
    
      render() {    
        const { handleSubmit } = this.props;

        if(!this.props.room) {
            return (
            <div className="col-md-6">  
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                    label="Room Name"
                    name="roomName"
                    component={this.renderField}
                    />
                    <Field
                    label="Person 1"
                    name="firstUserName"
                    component={this.renderField}
                    />
                    <Field
                    label="Person 2"
                    name="secondUserName"
                    component={this.renderField}

                    />
                    <Link to="/" className="btn btn-danger"> C A N C E L </Link>
                    <Button bsStyle="success" type="submit"> S U B M I T </Button>
                </form>
            </div>
            );
        } else {
            return (
                <div className="col-md-8" className="link-to-room" style={{ background: 'rgb(153, 150, 177)', width: '100vw', height: '100vh' }}>
                    <p className="new-room">
                    Here's a link to your new room!
                    </p>
                    <Link to ={`/room/${this.props.room._id}`} > 
                        localhost:3000/room/questions
                    </Link>
                    
                </div>
            )
        }
      }
}

function validate(values) {
    // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
    const errors = {};
  
    // Validate the inputs from 'values'
    if (!values.roomName) {
      errors.roomName = "What is this conversation about?";
    }
    if (!values.firstUserName) {
      errors.firstUserName = "Enter a name for your user";
    }
    if (!values.secondUserName) {
      errors.secondUserName = "Enter a name for your user";
    }
  
    // If errors is empty, the form is fine to submit
    // If errors has *any* properties, redux form assumes form is invalid
    return errors;
  }
  
  function mapStateToProps(reduxState) {
    let room = reduxState.room;  
    return {room};
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ createRoom }, dispatch);
  }
  
  const createRoomForm = reduxForm({
    validate,
    form: 'createRoom'
  })(CreateRoom);
  
export default connect(mapStateToProps, mapDispatchToProps)(createRoomForm);


//   handleKeyPress = (event) => {
//     if(event.key === 'Enter'){
//       console.log('enter press here! ')

//     }
//   }

//   render() {
//        return(
//            <div>
//              <input type="text" id="one" onKeyPress={this.handleKeyPress} />
//           </div>
//        );
//   }