import React, { Component } from "react";
import Addpolicy from "./components/policy/Addpolicy";

import Claimsettlement from "./components/ClaimSettlement/Claimsettlement";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from "./components/user/User";
import Userpolicy from "./components/userPolicy/Userpolicy";

export class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={<User />} />
              <Route path="/Addpolicy" element={<Addpolicy />} />
              <Route path="/UserPolicy" element={<Userpolicy />} />
              <Route path="/Claimsettlement" element={<Claimsettlement />} />
            </Route>
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
