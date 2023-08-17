import { FETCH_USER, BOOKMARK } from "../constant/actionType";

const initialUsersState = [];

export const usersReducer = (state = initialUsersState, { type, payload }) => {
  switch (type) {
    case FETCH_USER:
      return [...state, ...payload];

    case BOOKMARK:
      return state.map((user) =>
        user.id === payload.id
          ? { ...user, bookmarked: !user.bookmarked }
          : user
      );

    default:
      return state;
  }
};
