import axios from 'axios';
import { CREATE_ROOM } from './types';
import { FETCH_SURVEY_QUESTIONS } from './types';
import { SAVE_USER_RESPONSES } from './types';


// index.js within actions folder contains actions for reducers
export const createRoom = (body, callback) => async dispatch => {
    const res = await axios.post('/api/rooms', body);
    dispatch({ type: CREATE_ROOM, payload: res.data});
    callback();
}

export const fetchSurveyQuestions = () => async dispatch => {
    const res = await axios.get('/api/room/:roomId/questions');
  
    dispatch({ type: FETCH_SURVEY_QUESTIONS, payload: res.data });
  };


// we have to template the roomId and userId in front end sysntax with the `${}`
export const saveUserResponses = (body, roomId, userId, history) => async dispatch => {
    const res = await axios.post(`/api/room/${roomId}/${userId}/submitResponses`, body);

    dispatch({ type: SAVE_USER_RESPONSES, payload: res.data });
    history.push(`/room/${roomId}/responses`);
  };
