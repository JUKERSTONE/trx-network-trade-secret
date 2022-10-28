import React, { useEffect, useState, useContext } from "react";
import { StacksMainnet, StacksTestnet, StacksMocknet } from "@stacks/network";
import {
  generateWallet,
  generateSecretKey,
  generateNewAccount,
  restoreWalletAccounts,
  getStxAddress,
} from "@stacks/wallet-sdk";
import { TransactionVersion } from "@stacks/transactions";
import axios from "axios";
import { sendCryptoOnChain } from "./handlers";

export const useWalletSend = async () => {
  const { blockchain, link = "https://dynamic_link/" } = window as any;

  useEffect(() => {
    async () => {
      let hashResponse: any = "";
      let redirectURL: any = "";
      switch (blockchain) {
        case "bitcoin":
          hashResponse = await sendCryptoOnChain();
          redirectURL = link + hashResponse;
          window.location.replace(redirectURL);
          return;
        case "stacks":
          hashResponse = await sendCryptoOnChain();
          redirectURL = link + hashResponse;
          window.location.replace(redirectURL);
          break;
        case "doge":
          hashResponse = await sendCryptoOnChain();
          redirectURL = link + hashResponse;
          window.location.replace(redirectURL);
          return;
        // case "cardano":
        //   hashResponse = await sendCryptoOnChain();
        //   redirectURL = link + hashResponse;
        //   window.location.replace(redirectURL);
        //   return;
        case "ethereum":
          hashResponse = await sendCryptoOnChain();
          redirectURL = link + hashResponse;
          window.location.replace(redirectURL);
          return;
        case "solana":
          hashResponse = await sendCryptoOnChain();
          redirectURL = link + hashResponse;
          window.location.replace(redirectURL);
          return;
        default:
          // @ts-ignore
          return window.ReactNativeWebView.postMessage(serealizedKeys);
      }
    };
  }, []);
};
