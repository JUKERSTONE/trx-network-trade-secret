import React, { useEffect, useState, useContext } from "react";
import {
  makeContractCall,
  broadcastTransaction,
  AnchorMode,
  FungibleConditionCode,
  makeStandardSTXPostCondition,
  UIntCV,
  uintCV,
} from "@stacks/transactions";
import { StacksMainnet } from "@stacks/network";
import axios from "axios";

// @ts-ignore
// import CoinMarketCap from "coinmarketcap-api";

export const useTransactionPurchaseWhitelistSTX = () => {
  const handleTransact = async () => {
    const network = new StacksMainnet();

    const contractAddress = "SP26RS42R5ZH10VWWG4HFYPRJRC3JJ3FKWY4V58CW";
    const contractName = "TRAKLIST-MARKETPLACE-V2";

    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=blockstack%2C%20bitcoin%2C%20cardano%2C%20solana&vs_currencies=gbp",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const sxtInGBP = response.data.blockstack.gbp;

    // @ts-ignore
    const stxInTUC = window.price * sxtInGBP;

    const stxNotation = Math.floor(stxInTUC * Math.pow(10, 6));

    // alert(Math.floor(stxNotation));

    // @ts-ignore
    const price: UIntCV = uintCV(stxNotation);

    // @ts-ignore
    const postConditionAddress = window.publicKey;
    const postConditionCode = FungibleConditionCode.Equal;
    // @ts-ignore
    const postConditionAmount = BigInt(stxNotation);

    const standardSTXPostCondition = makeStandardSTXPostCondition(
      postConditionAddress,
      postConditionCode,
      postConditionAmount
    );
    const txOptions = {
      contractAddress,
      contractName,
      functionName: "user-purchase-whitelist",
      functionArgs: [price],
      // @ts-ignore
      senderKey: window.senderKey,
      validateWithAbi: true,
      network,
      postConditions: [standardSTXPostCondition],
      anchorMode: AnchorMode.Any,
      fee: 1500n,
    };

    return makeContractCall(txOptions)
      .then(async (transaction) => {
        broadcastTransaction(transaction, network)
          .then((broadcastResponse) => {
            const txId = broadcastResponse.txid;

            // @ts-ignore
            window.ReactNativeWebView.postMessage(txId);
          })
          .catch((err) => {
            console.log(
              "🚀 ~ file: useTransactionPurchaseWhitelist.ts ~ line 63 ~ .then ~ err",
              err,
              "failed"
            );

            // @ts-ignore
            window.ReactNativeWebView.postMessage("failed");
          });
      })
      .catch((err) => {
        console.log(
          "🚀 ~ file: useTransactionPurchaseWhitelist.ts ~ line 69 ~ handleTransact ~ err",
          err,
          "failed2"
        );
        // @ts-ignore
        window.ReactNativeWebView.postMessage("failed");
      });
  };
  return {
    handleTransact,
  };
};
