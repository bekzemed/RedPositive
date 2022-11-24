import { all, takeLatest } from "redux-saga/effects";

import { UserActionType } from "../interfaces/types";
import {
  addUserSaga,
  getUserSaga,
  removeUserSaga,
  updateUserSaga,
} from "./sagas";

function* rootSaga() {
  yield all([
    takeLatest(UserActionType.ADDING_USER, addUserSaga),
    takeLatest(UserActionType.GETTING_USER, getUserSaga),
    takeLatest(UserActionType.REMOVING_USER, removeUserSaga),
    takeLatest(UserActionType.UPDATING_USER, updateUserSaga),
  ]);
}

export default rootSaga;
