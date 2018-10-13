import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import roomReducer from "./roomReducer";
import surveyReducer from "./surveyReducer";

let reduxState = {
    room: roomReducer,
    form: formReducer,
    survey: surveyReducer   
}


const rootReducer = combineReducers(reduxState);

export default rootReducer;