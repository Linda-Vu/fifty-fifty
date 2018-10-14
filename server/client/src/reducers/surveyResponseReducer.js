import { FETCH_SURVEY_RESPONSES } from '../actions/types';

export default function(state = null, action) {
  console.log(action.type, action.payload);
  switch (action.type) {
    case FETCH_SURVEY_RESPONSES:
    //   console.log(state);
      return action.payload;
    default:
      return state;      
  }
}