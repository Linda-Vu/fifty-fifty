import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import roomReducer from "./roomReducer";
import surveyReducer from "./surveyReducer";
import saveUserResponseReducer from "./saveUserResponsesReducer";
import fetchSurveyResponses from "./surveyResponseReducer";

let reduxState = {
    room: roomReducer,
    form: formReducer,
    survey: surveyReducer,
    saveUserResponse: saveUserResponseReducer,
    responses: fetchSurveyResponses
}

const rootReducer = combineReducers(reduxState);

export default rootReducer;