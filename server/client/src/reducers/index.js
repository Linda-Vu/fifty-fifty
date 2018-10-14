import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import roomReducer from "./roomReducer";
import surveyReducer from "./surveyReducer";
import saveUserResponseReducer from "./saveUserResponsesReducer";

let reduxState = {
    room: roomReducer,
    form: formReducer,
    survey: surveyReducer,
    saveUserResponse: saveUserResponseReducer
}

const rootReducer = combineReducers(reduxState);

export default rootReducer;