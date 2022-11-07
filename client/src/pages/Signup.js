import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import styles from "../styles/login.module.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signingUp, setSigningUp] = useState("");
  const { addToast } = useToasts();
  const history = useHistory();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSigningUp(true);

    let error = false;
    if (!email || !password) {
      addToast("Please fill all the fields", {
        appearance: "error",
        autoDismiss: true,
      });
      error = true;
    }

    if (error) {
      return setSigningUp(false);
    }

    const response = await fetch("http://localhost:8000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    // console.log(response);
    const res = await response.json();
    console.log(res);

    if (res.success) {
      history.push("/login");
      addToast("User registered successfully, please login now", {
        appearance: "success",
        autoDismiss: true,
      });
    } else {
      addToast(res.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }

    setSigningUp(false);
  };

  return (
    <form className={styles.loginForm} onSubmit={handleFormSubmit}>
      <span className={styles.loginSignupHeader}> Signup</span>
      <div className={styles.field}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <button disabled={signingUp}>
          {signingUp ? "Signing up..." : "Signup"}
        </button>
      </div>
      <div>
        <br />
        <span>Already registered click here to </span>
        <Link to="/login">
          <span>login</span>
        </Link>
      </div>
    </form>
  );
};

export default Signup;
