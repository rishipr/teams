import {
  CREATE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  GET_PROJECT,
  PROJECT_LOADING,
  GET_PROJECTS,
  PROJECTS_LOADING
} from "../actions/types";

const initialState = {
  projects: [],
  project: [],
  projectLoading: false,
  projectsLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_PROJECT:
      return {
        ...state,
        projects: [action.payload, ...state.projects]
      };
    case UPDATE_PROJECT:
      let index = state.projects.findIndex(
        project => project._id === action.payload._id
      );

      state.projects.splice(index, 1);

      return {
        ...state,
        projects: [action.payload, ...state.projects]
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          project => project._id !== action.payload
        )
      };
    case GET_PROJECT:
      return {
        ...state,
        project: action.payload,
        projectLoading: false
      };
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        projectsLoading: false
      };
    case PROJECT_LOADING:
      return {
        ...state,
        projectLoading: true
      };
    case PROJECTS_LOADING:
      return {
        ...state,
        projectsLoading: true
      };
    default:
      return state;
  }
}
