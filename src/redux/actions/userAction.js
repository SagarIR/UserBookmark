import { FETCH_USER, BOOKMARK } from "../constant/actionType";

export const fetchUser = (page, perPage) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://api.github.com/users?since=${
          (page - 1) * perPage
        }&per_page=${perPage}`
      );
      const data = await response.json();

      const users = data.map(({ id, login, avatar_url }) => ({
        id,
        login,
        avatar_url,
        bookmarked: false,
      }));

      dispatch({
        type: FETCH_USER,
        payload: users,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
};

export const bookmarkUser = (user) => ({
  type: BOOKMARK,
  payload: user,
});
