import { SAVE_USER_RESPONSES } from '../actions/types';

export default function(state = null, action) {
  console.log(action.type, action.payload);
  switch (action.type) {
    case SAVE_USER_RESPONSES:
    //   console.log(state);
      return action.payload;
    default:
      return state;      
  }
}