import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Home, Login, Signup, CreateUser } from "../pages";
import "../styles/App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/create-user">
            <CreateUser />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/signup">
            <Signup />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
