import { combineReducers } from "redux";
import usersReducers from "./store/reducers";
const rootReducer = combineReducers({
  users: usersReducers,
});

export type State = ReturnType<typeof rootReducer>;
export default rootReducer;
