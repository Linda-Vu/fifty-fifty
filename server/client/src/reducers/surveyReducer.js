import { FETCH_SURVEY_QUESTIONS } from '../actions/types';

export default function(state = null, action) {
  console.log(action.type, action.payload);
  switch (action.type) {
    case FETCH_SURVEY_QUESTIONS:
    //   console.log(state);
      return action.payload;
    default:
      return state;      
  }
}