import axios from 'axios';
import { CREATE_ROOM_ID} from './types';


export const createRoomId = (body) => async dispatch => {
    const res = await axios.post('/api/rooms', body);
    dispatch({ type: CREATE_ROOM_ID, payload: res.data});
}