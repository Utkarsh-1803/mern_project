import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "../styles/App.css";
import { useToasts } from "react-toast-notifications";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const { addToast } = useToasts();

  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch(
        `http://localhost:8000/dummyusers/all_users?page=${1}&limit=${4}`
      );
      const json = await res.json();
      setUsers(json.data);
    };
    getUsers();
  }, []);

  const fetchUsers = async (currentPage) => {
    const res = await fetch(
      `http://localhost:8000/dummyusers/all_users?page=${currentPage}&limit=${4}`
    );
    const json = await res.json();
    return json.data;
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    const usersFormServer = await fetchUsers(currentPage);
    setUsers(usersFormServer);
  };

  const handleUpdate = async (user) => {
    const response = await fetch(
      `http://localhost:8000/dummyusers/update?id=${user._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName !== "" ? newName : user.name,
          email: newEmail !== "" ? newEmail : user.email,
          phone: newPhone !== "" ? newPhone : user.phone,
          status: newStatus !== "" ? newStatus : user.status,
        }),
      }
    );

    const res = await response.json();
    console.log(res);

    if (res.success) {
      addToast("User updated successfully", {
        appearance: "success",
        autoDismiss: true,
      });
    } else {
      addToast(res.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <>
      <div className="users-block">
        <br />
        <h1>Hello Users!</h1>
        <br />
        <div className="flex">
          {users.length &&
            users.map((user) => {
              return (
                <div key={user._id} className="boxdesign">
                  <p>
                    <strong>{user.name}</strong>
                  </p>
                  <p>{user.email}</p>
                  <p>{user.phone}</p>
                  <p>{user.status}</p>

                  <Popup
                    trigger={<button> Update </button>}
                    position="right center"
                  >
                    <div>Update Details</div>
                    <br />
                    <input
                      type="text"
                      defaultValue={user.name}
                      onChange={(e) => {
                        setNewName(e.target.value);
                      }}
                    />
                    <input
                      type="text"
                      defaultValue={user.email}
                      onChange={(e) => {
                        setNewEmail(e.target.value);
                      }}
                    />
                    <input
                      type="number"
                      defaultValue={user.phone}
                      onChange={(e) => {
                        setNewPhone(e.target.value);
                      }}
                    />
                    <input
                      type="text"
                      defaultValue={user.status}
                      onChange={(e) => {
                        setNewStatus(e.target.value);
                      }}
                    />
                    <br />
                    <br />
                    <button
                      onClick={() => {
                        handleUpdate(user);
                      }}
                    >
                      Save
                    </button>
                  </Popup>

                  <button
                    onClick={async () => {
                      const response = await fetch(
                        `http://localhost:8000/dummyusers/delete?id=${user._id}`
                      );
                      const res = await response.json();
                      if (res.success) {
                        addToast("User deleted successfully", {
                          appearance: "success",
                          autoDismiss: true,
                        });
                      } else {
                        addToast(res.message, {
                          appearance: "error",
                          autoDismiss: true,
                        });
                      }
                      setTimeout(() => {
                        window.location.reload();
                      }, 1000);
                    }}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
        </div>
      </div>

      <ReactPaginate
        previousLabel={"<<"}
        nextLabel={">>"}
        pageCount={6}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </>
  );
};

export default Home;
