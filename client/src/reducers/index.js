import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import projectsReducer from "./projectsReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  projects: projectsReducer
});
