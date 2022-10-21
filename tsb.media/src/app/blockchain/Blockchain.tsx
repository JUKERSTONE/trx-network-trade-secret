import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import {
  BlockchainWalletContainer,
  CryptoSendContainer,
  // CryptoListenerContainer,
} from "../../containers";

export const BlockchainApp = () => {
  return (
    <Router>
      {/* <Route exact path="/" component={CryptoListenerContainer} /> */}
      <Route
        exact
        path="/wallet/:hashParams"
        component={BlockchainWalletContainer}
      />
      <Route exact path="/send/:hashParams" component={CryptoSendContainer} />
    </Router>
  );
};

/*******************************
 *
 * route
 * container
 *  - useEffect logic
 *  - views
 *
 */
