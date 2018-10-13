import axios from 'axios';
import { CREATE_ROOM } from './types';
import { FETCH_SURVEY_QUESTIONS } from './types';

export const createRoom = (body, callback) => async dispatch => {
    const res = await axios.post('/api/rooms', body);
    dispatch({ type: CREATE_ROOM, payload: res.data});
    callback();
}

export const fetchSurveyQuestions = () => async dispatch => {
    const res = await axios.get('/api/room/:roomId/questions');
  
    dispatch({ type: FETCH_SURVEY_QUESTIONS, payload: res.data });
  };


