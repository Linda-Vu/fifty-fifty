import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import roomReducer from "./roomReducer";

let reduxState = {
    room: roomReducer,
    form: formReducer   
}


const rootReducer = combineReducers(reduxState);

export default rootReducer;