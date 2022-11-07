import { useState } from "react";
import { useToasts } from "react-toast-notifications";

import styles from "../styles/login.module.css";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [submittingUp, setSubmittingUp] = useState("");
  const { addToast } = useToasts();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmittingUp(true);

    let error = false;
    if (!email || !email || !phone || !status) {
      addToast("Please fill all the fields", {
        appearance: "error",
        autoDismiss: true,
      });
      error = true;
    }

    if (error) {
      return setSubmittingUp(false);
    }

    const response = await fetch("http://localhost:8000/dummyusers/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        status: status,
      }),
    });

    const res = await response.json();
    console.log(res);

    if (res.success) {
      addToast("DummyUser created successfully", {
        appearance: "success",
        autoDismiss: true,
      });
    } else {
      addToast(res.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }

    setSubmittingUp(false);
  };

  return (
    <form className={styles.loginForm} onSubmit={handleFormSubmit}>
      <span className={styles.loginSignupHeader}> Add A User</span>
      <div className={styles.field}>
        <input
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Phone"
          type="number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Job Status"
          type="text"
          required
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <button disabled={submittingUp}>
          {submittingUp ? "Submitting up..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default CreateUser;
