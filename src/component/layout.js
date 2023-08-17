import { Link } from "react-router-dom";
import styles from "./layout.module.css";

const Layout = () => {
  return (
    <>
      <nav className={styles.navBar}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/" className={styles.navLink}>
              Home
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/user" className={styles.navLink}>
              Users
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/bookmarked" className={styles.navLink}>
              Bookmarks
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Layout;
