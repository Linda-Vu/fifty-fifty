import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import roomIdReducer from "./roomIdReducer";

const rootReducer = combineReducers({
  roomId: roomIdReducer,
  form: formReducer
});

export default rootReducer;