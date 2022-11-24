export enum UserActionType {
  ADD_USER = "ADD_USER",
  REMOVE_USER = "REMOVE_USER",
  GET_USER = "GET_USER",
  UPDATE_USER = "UPDATE_USER",
  SET_ERRORS = "SET_ERRORS",

  GETTING_USER = "GETTING_USER",
  UPDATING_USER = "UPDATING_USER",
  REMOVING_USER = "REMOVING_USER",
  ADDING_USER = "ADDING_USER",
}

export type Action = {
  type: UserActionType;
  payload?: any;
};
