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
  TransactionPurchaseWhitelistPage,
  TransactionSTXPage,
  TransactionClaimWhitelistPage,
} from "../pages";

export const TSBM3DIAApp = () => {
  return (
    <Router>
      <Route exact path="/" component={TSBM3DIAPage} />
      <Route exact path="/walter/stacks" component={NewStacksAccountPage} />
      <Route
        exact
        path="/walter/stacks/connect"
        component={ConnectStacksAccountPage}
      />
      <Route exact path="/walter/stacks/refresh" component={RefreshPage} />
      <Route
        exact
        path="/walter/stacks/transaction/contract/call"
        component={TransactionContractCallPage}
      />
      <Route
        exact
        path="/walter/stacks/transaction/stx"
        component={TransactionSTXPage}
      />
      <Route exact path="/test" component={TransactionContractCallTRXPage} />
      <Route
        exact
        path="/walter/stacks/contract-call/purchase-whitelist"
        component={TransactionPurchaseWhitelistPage}
      />
      <Route
        exact
        path="/walter/stacks/contract-call/claim-whitelist"
        component={TransactionClaimWhitelistPage}
      />
    </Router>
  );
};
