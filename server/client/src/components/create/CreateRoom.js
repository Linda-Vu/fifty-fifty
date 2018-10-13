import React, {Component} from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { createRoom } from '../../actions';


// createRoom should have a place to take user input
// upon submitting the roomName --->
// the page should toggle and reveal a link to the new room

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
          //this.props.history.push("/newRoom");
        });
      }
    
      render() {    
        const { handleSubmit } = this.props;

        if(!this.props.room) {
            return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                label="Room Name"
                name="roomName"
                component={this.renderField}
                />
                <Field
                label="Human 1"
                name="firstUserName"
                component={this.renderField}
                />
                <Field
                label="Human 2"
                name="secondUserName"
                component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
            );
        } else {
            return (
                <div>
                    Here's a link to your new room!:
                    
                    <a href={`localhost:3000/room/?id=${this.props.room._id}`}> 
                        
                        localhost:3000/room/?id={this.props.room._id}
                    </a>
                    
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
      errors.roomName = "Enter a name for your room";
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