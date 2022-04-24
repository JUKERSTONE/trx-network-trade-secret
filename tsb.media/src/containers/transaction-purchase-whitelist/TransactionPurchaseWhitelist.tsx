import React from "react";
import { TransactionPurchaseWhitelistElement } from "../../elements";
import { useTransactionPurchaseWhitelist } from "./useTransactionPurchaseWhitelist";

export const TransactionPurchaseWhitelistContainer = () => {
  const { ...useTransactProps } = useTransactionPurchaseWhitelist();
  return <TransactionPurchaseWhitelistElement {...useTransactProps} />;
};
