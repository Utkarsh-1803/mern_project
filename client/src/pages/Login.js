import { useState } from "react";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
import styles from "../styles/login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const { addToast } = useToasts();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);

    let error = false;
    if (!email || !password) {
      addToast("Please enter both email and password", {
        appearance: "error",
        autoDismiss: true,
      });
      error = true;
    }

    if (error) {
      return setLoggingIn(false);
    }

    const response = await fetch("http://localhost:8000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const res = await response.json();

    if (res.success) {
      history.push("/");
      addToast("LoggedIn Successfully", {
        appearance: "success",
        autoDismiss: true,
      });
    } else {
      addToast(res.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }

    setLoggingIn(false);
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Paasword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <button disabled={loggingIn}>
          {loggingIn ? "Logging in..." : "Log In"}
        </button>
      </div>
    </form>
  );
};

export default Login;
