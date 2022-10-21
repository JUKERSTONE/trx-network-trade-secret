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

export const useCryptoSend = async () => {
  const [STXProfile, setSTXProfile] = useState();

  const { blockchain } = window as any;

  useEffect(() => {
    async () => {
      switch (blockchain) {
        case "bitcoin":
          return;
        case "stacks":
          const serealizedKeys = await sendCryptoOnChain();
          // hash params
          // dynamic link
          break;
        case "doge":
          return;
        case "cardano":
          return;
        case "ethereum":
          return;
        case "solana":
          return;
        default:
          // @ts-ignore
          return window.ReactNativeWebView.postMessage(serealizedKeys);
      }
    };
  }, []);
};
