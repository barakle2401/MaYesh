import React, { Component } from "react";
import HomePage from "./HomePage/HomePage.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LogIn from "./Login/LogIn.js";
import EditProfile from "./Login/EditProfile.js";
import NewClass from "./NewClass/NewClass";
import Classs from "./Class/Class.js";

import Category from "./Category/Category.js";
import ManageCategory from "./Manage/ManageCategory.js";
import MainManagePage from "./Manage/MainManagePage.js";

import ManageClass from "./Manage/ManageClass.js";

import redirectTemp from "./Login/redirectTemp.js"

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/NewClass" exact component={NewClass} />
          <Route path="/login" exact component={LogIn} />
          <Route path="/Manage" exact component={MainManagePage} />
          <Route path="/RedirectTemp" exact component={redirectTemp}/>
          <Route path="/editProfile/:id" exact component={EditProfile} />
          <Route
            path="/Manage/:name"
            exact
            render={({ match }) => {
              return <ManageCategory name={match.params.name} />;
            }}
          />
          <Route
            path="/Category/:name"
            exact
            render={({ match }) => {
              return <Category name={match.params.name} />;
            }}
          />
          <Route
            path="/Category/:nameC/Class/:nameClass"
            exact
            component={Classs}
          />
          <Route path="/ManageCategory" exact component={ManageCategory} />
          <Route
            path="/ManageClass/:catName/:className"
            exact
            render={({ match }) => {
              return (
                <ManageClass
                  categoryName={match.params.catName}
                  className={match.params.className}
                />
              );
            }}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
