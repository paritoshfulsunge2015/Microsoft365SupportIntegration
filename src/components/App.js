import React from "react";
import { Route, Switch } from "react-router-dom";
import { initializeIcons } from "@uifabric/icons";

import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import { Header } from "./common/Header";
import { Navigation } from "./common/Navigation";
import PageNotFound from "./PageNotFound";
import { AdminConsent, SignOut } from "./auth";
import { GetConciergeConfig, GetConciergeConfigWithSSO } from "./M365Resources";

initializeIcons();

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <div className="layout">
        <div>
          <Navigation />
        </div>
        <div className="viewport">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/adminconsent" component={AdminConsent} />
            <Route path="/signout" component={SignOut} />
            <Route path="/getconciergeconfig" component={GetConciergeConfig} />
            <Route
              path="/getconciergeconfigwithsso"
              component={GetConciergeConfigWithSSO}
            />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
