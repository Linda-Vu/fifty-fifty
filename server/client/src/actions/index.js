import axios from 'axios';
import { CREATE_ROOM_ID} from './types';


export const createRoomId = () => async dispatch => {
    const res = await axios.post('/api/rooms');
    dispatch({ type: CREATE_ROOM_ID, payload: res.data});
}