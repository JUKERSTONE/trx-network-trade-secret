import React from "react";
import { MetaverseElement } from "../../elements";

export const NetworkWalletElement = ({ endpoint, wallets, ...props }: any) => {
  console.log(
    "🚀 ~ file: NetworkWallet.tsx:5 ~ NetworkWalletElement ~ props",
    props
  );
  return (
    <>
      <div>NETWORK WALLET - </div>
      <MetaverseElement />
    </>
  );
};
