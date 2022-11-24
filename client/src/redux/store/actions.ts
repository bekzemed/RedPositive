import { User } from "../interfaces/user";
import { UserActionType, Action } from "../interfaces/types";

export const setErrors = (error: string): Action => ({
  type: UserActionType.SET_ERRORS,
  payload: { message: error },
});

//
export const getUser = (user: User[]): Action => ({
  type: UserActionType.GET_USER,
  payload: user,
});

export const deleteUser = (id: string): Action => ({
  type: UserActionType.REMOVE_USER,
  payload: id,
});

export const updateUser = (user: User): Action => ({
  type: UserActionType.UPDATE_USER,
  payload: user,
});

export const addUser = (user: User): Action => ({
  type: UserActionType.ADD_USER,
  payload: user,
});

// request action creators
export const getUserRequest = (): Action => ({
  type: UserActionType.GETTING_USER,
});
export const updateUserRequest = (user: User): Action => ({
  type: UserActionType.UPDATING_USER,
  payload: user,
});
export const removeUserRequest = (id: string): Action => ({
  type: UserActionType.REMOVING_USER,
  payload: id,
});
export const addUserRequest = (user: User): Action => ({
  type: UserActionType.ADDING_USER,
  payload: user,
});
