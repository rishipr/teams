import axios from "axios";

import { CREATE_PROJECT, GET_PROJECTS, PROJECTS_LOADING } from "./types";

// Create Project
export const createProject = projectData => dispatch => {
  axios
    .post("/api/projects/create", projectData)
    .then(res =>
      dispatch({
        type: CREATE_PROJECT,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

// Get all projects for specific user
export const getProjects = () => dispatch => {
  dispatch(setProjectsLoading());
  axios
    .get("/api/projects")
    .then(res =>
      dispatch({
        type: GET_PROJECTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROJECTS,
        payload: null
      })
    );
};

// Projects loading
export const setProjectsLoading = () => {
  return {
    type: PROJECTS_LOADING
  };
};
