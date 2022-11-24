import { UserActionType } from "../interfaces/types";
import { UserState, initialUserState } from "../interfaces/state";
import { Action } from "../interfaces/types";

const userReducer = (
  state: UserState = initialUserState,
  action: Action
): UserState => {
  switch (action.type) {
    case UserActionType.ADD_USER:
      return [...state, action.payload];

    case UserActionType.REMOVE_USER:
      return state.filter((user) => user._id !== action.payload);

    case UserActionType.UPDATE_USER:
      const indexToUpdate = state.findIndex(
        (user) => user._id === action.payload._id
      );
      return [
        ...state.slice(0, indexToUpdate),
        action.payload,
        ...state.slice(indexToUpdate + 1),
      ];
    case UserActionType.GET_USER:
      let users = action.payload.map((user: any) => ({
        ...user,
        key: user._id,
      }));
      return users;
    default:
      return state;
  }
};

export default userReducer;
