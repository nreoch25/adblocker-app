import React from "react";
import { Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "./components/Header";
import * as Routes from "./Routes";

const App = () => (
  <div>
    <Helmet>
      <title>MERN Boilerplate</title>
      <meta property="og:title" content="MERN Boilerplate" />
    </Helmet>
    <Header />
    <Route
      path="/"
      component={({ match }) => (
        <div>
          <Switch>
            <Route exact path="/" component={Routes.Index} />
            <Route exact path="/about" component={Routes.About} />
            <Route exact path="/upload" component={Routes.Upload} />
            <Route exact path="/inventory" component={Routes.Inventory} />
            <Route exact path="/signup" component={Routes.Signup} />
            <Route exact path="/logout" component={Routes.Logout} />
            <Route component={Routes.PageNotFound} />
          </Switch>
        </div>
      )}
    />
  </div>
);

export default App;
