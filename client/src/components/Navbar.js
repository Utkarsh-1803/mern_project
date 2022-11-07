import { useState, useEffect } from "react";
import styles from "../styles/navbar.module.css";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        `http://localhost:8000/dummyusers/search?text=${searchText}`
      );

      const res = await response.json();

      if (res.success) {
        const dummyResults = [...res.data];
        setResults(dummyResults);
      }
    };

    if (searchText.length > 0) {
      fetchUsers();
    } else {
      setResults([]);
    }
  }, [searchText]);

  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/" className={styles.logo}>
          Dignitech Media
        </Link>
      </div>

      <div className={styles.searchContainer}>
        <img
          className={styles.searchIcon}
          src="https://cdn-icons-png.flaticon.com/512/2811/2811790.png"
          alt=""
        />

        <input
          placeholder="Search users"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {results.length > 0 && (
          <div className={styles.searchResults}>
            <ul>
              {results.map((user) => (
                <li
                  className={styles.searchResultsRow}
                  key={`user-${user._id}`}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
                    alt=""
                  />
                  <span>{user.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.rightNav}>
        <div className={styles.navLinks}>
          <ul>
            <li>
              <Link to="/create-user">Add A User</Link>
            </li>
            <li>
              <Link to="/login">Log in</Link>
            </li>
            <li>
              <Link to="/signup">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
