import { call, CallEffect, put, PutEffect } from "redux-saga/effects";
import { apiData } from "../api/api";
import { Action } from "../interfaces/types";
import { User } from "../interfaces/user";
import { addUser, deleteUser, getUser, setErrors, updateUser } from "./actions";

let BASE_URL = import.meta.env.VITE_API;

// fetch users
export function* getUserSaga(
  action: Action
): Generator<CallEffect<any> | PutEffect<Action>, void, User[]> {
  try {
    const user = yield call(apiData, BASE_URL, null, "GET");

    yield put(getUser(user));
  } catch (error: any) {
    yield put(setErrors(error));
  }
}

// update user
export function* updateUserSaga(
  action: Action
): Generator<CallEffect<any> | PutEffect<Action>, void, User> {
  console.log(action.payload);

  try {
    yield call(
      apiData,
      BASE_URL + `/${action.payload._id}`,
      action.payload,
      "PUT"
    );
    yield put(updateUser(action.payload));
  } catch (error: any) {
    yield put(setErrors(error));
  }
}

// add user
export function* addUserSaga(
  action: Action
): Generator<CallEffect<any> | PutEffect<Action>, void, User> {
  try {
    const addedUser = yield call(apiData, BASE_URL, action.payload, "POST");

    yield put(addUser(addedUser));
  } catch (error: any) {
    yield put(setErrors(error));
  }
}

// delete user
export function* removeUserSaga(
  action: Action
): Generator<CallEffect<any> | PutEffect<Action>, void, string> {
  try {
    yield call(apiData, BASE_URL + `/${action.payload}`, null, "DELETE");
    yield put(deleteUser(action.payload));
  } catch (error: any) {
    yield put(setErrors(error));
  }
}
