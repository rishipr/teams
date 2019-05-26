import {
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  GET_TASKS,
  TASKS_LOADING
} from "../actions/types";

const initialState = {
  tasks: [],
  tasksLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_TASK:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks]
      };
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        tasksLoading: false
      };
    case TASKS_LOADING:
      return {
        ...state,
        tasksLoading: true
      };
    default:
      return state;
  }
}
