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
import { api } from "../../api";
import { StacksTestnet, StacksMainnet } from "@stacks/network";
import axios from "axios";
import {
  handleReproduceBitcoinWallet,
  handleReproduceSolanaWallet,
  handleReproduceStacksWallet,
  handleReproduceEthereumWallet,
} from "./handlers";

export const useWalletReproduce = async () => {
  useEffect(() => {
    handleNetworkWallet();
  }, []);

  const handleNetworkWallet = async () => {
    const [pathname] = window.location.pathname.split("/");
    const routeParams = pathname[pathname.length - 1];

    // const { link = "https://trxklist.page.link/zXbp" } = un_wrap_RouteParams({
    //   routeParams,
    // });

    const blockchains = [
      "bitcoin",
      "stacks",
      // "cardano",
      "solana",
      // "doge",
      "ethereum",
    ];

    let hashResponse: string | null = null;

    // const network_wallet_params = await Promise.all(
    //   blockchains.map(async (chain) => {
    //     switch (chain) {
    //       case "bitcoin":
    //         hashResponse = await handleReproduceBitcoinWallet();
    //         return { bitcoin: hashResponse };
    //       case "stacks":
    //         hashResponse = await handleReproduceStacksWallet();
    //         return { stacks: hashResponse };
    //       // case "cardano":
    //       //   hashResponse = await createCardanoWallet({});
    //       //   return { cardano: hashResponse };
    //       case "solana":
    //         hashResponse = await handleReproduceSolanaWallet();
    //         return { solana: hashResponse };
    //       // case "doge":
    //       //   hashResponse = await createDogeWallet();
    //       //   alert(JSON.stringify(hashResponse));
    //       //   return { doge: hashResponse };
    //       case "ethereum":
    //         hashResponse = await handleReproduceEthereumWallet();
    //         return { ethereum: hashResponse };
    //       default:
    //         return;
    //     }
    //   })
    // );

    // alert(JSON.stringify(network_wallet_params));

    // // @ts-ignore
    // window.ReactNativeWebView.postMessage(
    //   JSON.stringify(network_wallet_params)
    // );
  };
};
