import axios from 'axios';
import { CREATE_ROOM } from './types';


export const createRoom = (body, callback) => async dispatch => {
    const res = await axios.post('/api/rooms', body);
    dispatch({ type: CREATE_ROOM, payload: res.data});
    callback();
}