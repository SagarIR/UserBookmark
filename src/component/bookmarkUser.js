import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bookmarkUser } from "../redux/actions/userAction";
import styles from "./user.module.css";
import Layout from "./layout";

const BookmarkedUser = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const bookmarkedUser = useSelector((state) =>
    state.users.filter((user) => user.bookmarked)
  );

  const filteredBookmarkedUser = bookmarkedUser.filter((user) =>
    user.login.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleBookmark = (user) => {
    dispatch(bookmarkUser(user));
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <Layout />
      <div className={styles.tabContent}>
        <input
          type="text"
          placeholder="Search bookmarked users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        {loading ? (
          <div>Loading...</div>
        ) : filteredBookmarkedUser.length === 0 ? (
          <div>No bookmarked users found</div>
        ) : (
          <ul className={styles.userList}>
            {filteredBookmarkedUser.map((user) => (
              <li key={user.id} className={styles.userItem}>
                <div className={styles.userCard}>
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className={styles.userAvatar}
                  />
                  <span className={styles.userLogin}>{user.login}</span>
                  <button
                    onClick={() => handleToggleBookmark(user)}
                    className={`${styles.bookmarkButton} ${
                      user.bookmarked ? styles.bookmarked : ""
                    }`}
                  >
                    Unbookmark
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default BookmarkedUser;
