import React from "react";
import { BlockchainWalletElement } from "../../elements";
import { createBlockchainWallet } from "./createBlockchainWallet";

export const BlockchainWalletContainer = ({ ...props }) => {
  const { ...useBlockchainWalletProps } = createBlockchainWallet();
  return <BlockchainWalletElement {...props} />;
};
