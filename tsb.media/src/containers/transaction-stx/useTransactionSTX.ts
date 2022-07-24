import React, { useEffect, useState, useContext } from "react";
import {
  generateWallet,
  generateSecretKey,
  getStxAddress,
} from "@stacks/wallet-sdk";
import { TransactionVersion } from "@stacks/transactions";

import Button from "@mui/material/Button";
import {
  broadcastTransaction,
  AnchorMode,
  makeSTXTokenTransfer,
} from "@stacks/transactions";
import { StacksTestnet, StacksMainnet } from "@stacks/network";

export const useTransactionSTX = () => {
  // const [amount, setAmount] = useState<any>();

  const handleAmount = (e: any) => {
    // setAmount(BigInt(e.target.value));
  };

  // const handleSTXTransaction = async () => {
  //   const txOptions: any = {
  //     // @ts-ignore
  //     recipient: window.recipient,
  //     amount: amount,
  //     // @ts-ignore
  //     senderKey: window.senderKey,
  //     network: "testnet", // for mainnet, use 'mainnet'
  //     memo: "test memo",
  //     anchorMode: AnchorMode.Any,
  //   };

  //   const transaction = await makeSTXTokenTransfer(txOptions)
  //     .then((transaction: any) => {
  //       return transaction;
  //     })
  //     .catch((err) => {
  //       // @ts-ignore
  //       window.ReactNativeWebView.postMessage("err");
  //       return;
  //     });

  //   // // to see the raw serialized tx
  //   // const serializedTx = transaction.serialize().toString("hex");

  //   // broadcasting transaction to the specified network
  //   const broadcastResponse: any = await broadcastTransaction(transaction)
  //     .then((broadcastResponse) => {
  //       return broadcastResponse;
  //     })
  //     .catch((err) => {
  //       // @ts-ignore
  //       window.ReactNativeWebView.postMessage("err");
  //       return;
  //     });

  //   const txId = broadcastResponse.txid;
  //   // @ts-ignore
  //   window.ReactNativeWebView.postMessage(txId);
  // };

  return {
    // handleSTXTransaction,
    // handleAmount,
  };
};
