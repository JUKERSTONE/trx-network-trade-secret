import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";

import { TSBM3DIAPage } from "../../pages";
import { NetworkWalletContainer } from "../../containers";

export const NetworkApp = () => {
  return (
    <Router>
      <Route exact path="/" component={TSBM3DIAPage} />
      <Route exact path="/wallet" component={NetworkWalletContainer} />
      <Route exact path="/protocol/:hashParams" component={TSBM3DIAPage} />
      <Route exact path="/convert/:hashParams" component={TSBM3DIAPage} />
      <Route exact path="/send/:hashParams" component={TSBM3DIAPage} />
    </Router>
  );
};
