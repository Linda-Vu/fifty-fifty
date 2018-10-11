import { CREATE_ROOM_ID } from '../actions/types';

export default function(state = {}, action) {
  console.log(action.type, action.payload);
  switch (action.type) {
    case CREATE_ROOM_ID:
    //   console.log(state);
      return action.payload;
    default:
      return state;      
  }
}