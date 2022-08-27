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
  const [amount, setAmount] = useState(0);

  // useEffect(() => {
  //   // @ts-ignore
  //   alert(window.recipient + " : tsb.media");
  // }, []);

  const handleSTXTransaction = async () => {
    const txOptions: any = {
      // @ts-ignore
      recipient: window.recipient,
      // @ts-ignore
      amount,
      // @ts-ignore
      senderKey: window.senderKey,
      network: "mainnet", // for mainnet, use 'mainnet'
      memo: "trx:pay:2374",
      anchorMode: AnchorMode.Any,
    };

    const transaction = await makeSTXTokenTransfer(txOptions)
      .then((transaction: any) => {
        return transaction;
      })
      .catch((err) => {
        alert(JSON.stringify(err));
        // @ts-ignore
        window.ReactNativeWebView.postMessage("err");
        return;
      });

    // // to see the raw serialized tx
    // const serializedTx = transaction.serialize().toString("hex");

    // broadcasting transaction to the specified network
    const broadcastResponse: any = await broadcastTransaction(transaction)
      .then((broadcastResponse) => {
        return broadcastResponse;
      })
      .catch((err) => {
        // @ts-ignore
        window.ReactNativeWebView.postMessage("err");
        return;
      });

    const txId = broadcastResponse.txid;
    // @ts-ignore
    window.ReactNativeWebView.postMessage(txId);
  };

  const handleAmount = (event: any) => {
    event.preventDefault();
    setAmount(event.target.value);
  };

  return {
    handleSTXTransaction,
    handleAmount,
  };
};
