import axios from 'axios';
import { FETCH_ROOM_ID} from './types';

export const fetchRoomId = (roomName) => async dispatch => {
    const res = await axios.post('/api/rooms', roomName);
    dispatch({ type: FETCH_ROOM_ID, payload: res.data});
}