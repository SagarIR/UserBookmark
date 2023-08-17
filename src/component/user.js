import Layout from "./layout";
import styles from "./user.module.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, bookmarkUser } from "../redux/actions/userAction";

const User = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  useEffect(() => {
    dispatch(fetchUser(currentPage, perPage));
  }, [dispatch, currentPage, perPage]);

  useEffect(() => {
    if (users.length > 0) {
      setLoading(false);
    }
  }, [users]);

  const handleToggleBookmark = (user) => {
    dispatch(bookmarkUser(user));
  };

  const filteredUsers = users.filter(
    (user) =>
      !user.bookmarked &&
      user.login.toLowerCase().includes(search.toLowerCase())
  );

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <Layout />
      <div className={styles.tabContent}>
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        {loading ? (
          <div>Loading...</div>
        ) : filteredUsers.length === 0 ? (
          <div>No users found</div>
        ) : (
          <ul className={styles.userList}>
            {filteredUsers.map((user) => (
              <li key={user.id} className={styles.userItem}>
                <div className={styles.userCard}>
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className={styles.userAvatar}
                  />
                  <div className={styles.userDetails}>
                    <span className={styles.userLogin}>{user.login}</span>
                    <button
                      onClick={() => handleToggleBookmark(user)}
                      className={`${styles.bookmarkButton} ${
                        user.bookmarked ? styles.bookmarked : ""
                      }`}
                    >
                      {user.bookmarked ? "Unbookmark" : "Bookmark"}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        {filteredUsers.length > 0 && (
          <button className={styles.loadMoreButton} onClick={handleLoadMore}>
            Load More
          </button>
        )}
      </div>
    </>
  );
};

export default User;
