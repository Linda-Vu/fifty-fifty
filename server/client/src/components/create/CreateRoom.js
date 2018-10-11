import React, {Component} from "react";

// createRoom should have a place to take user input
// upon submitting the roomName --->
// the page should toggle and reveal a link to the new room

class CreateRoom extends Component {
    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
          console.log('enter press here! ')
        }
      }
      render() {
           return(
               <div>
                 <input type="text" id="one" onKeyPress={this.handleKeyPress} />
              </div>
           );
      }
}
  
  export default CreateRoom;