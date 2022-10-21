import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import {
  TRXSupport,
  TSBM3DIAPage,
  NewStacksAccountPage,
  ConnectStacksAccountPage,
  RefreshPage,
  TransactionContractCallPage,
  TransactionContractCallTRXPage,
  TransactionPurchaseWhitelistSTXPage,
  TransactionPurchaseWhitelistTUCPage,
  TransactionSTXPage,
  TransactionClaimWhitelistPage,
  AppleMusicConnectPage,
} from "../../pages";

export const NetworkApp = () => {
  return (
    <Router>
      <Route exact path="/" component={TSBM3DIAPage} />
      <Route exact path="/wallet" component={TSBM3DIAPage} />
      <Route exact path="/protocol/:hashParams" component={TSBM3DIAPage} />
      <Route exact path="/convert/:hashParams" component={TSBM3DIAPage} />
      <Route exact path="/send/:hashParams" component={TSBM3DIAPage} />
    </Router>
  );
};
