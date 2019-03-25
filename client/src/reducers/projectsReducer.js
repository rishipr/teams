import {
  CREATE_PROJECT,
  GET_PROJECTS,
  PROJECTS_LOADING
} from "../actions/types";

const initialState = {
  projects: [],
  projectsLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_PROJECT:
      return {
        ...state,
        projects: [action.payload, ...state.projects]
      };
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        projectsLoading: false
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
