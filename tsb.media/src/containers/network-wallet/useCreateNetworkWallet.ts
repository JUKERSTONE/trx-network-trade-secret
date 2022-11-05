import React, { useState, useEffect } from "react";

import {
  // createBitcoinWallet,
  createStacksWallet,
  // createCardanoWallet,
  // createSolanaWallet,
  createDogeWallet,
  un_wrap_RouteParams,
} from "./handlers";

export const useCreateNetworkWallet = async () => {
  useEffect(() => {
    test();
  }, []);

  const test = async () => {
    const [pathname] = window.location.pathname.split("/");
    const routeParams = pathname[pathname.length - 1];

    const { link = "https://dynamic_link/" } = un_wrap_RouteParams({
      routeParams,
    });

    const blockchains = [
      "bitcoin",
      "stacks",
      "cardano",
      "solana",
      "doge",
      "ethereum",
    ];

    let hashResponse: string | null = null;
    const network_wallet_params = blockchains.forEach(async (chain) => {
      switch (chain) {
        case "bitcoin":
          // hashResponse = await createBitcoinWallet();
          return { bitcoin: hashResponse };
        case "stacks":
          hashResponse = await createStacksWallet();
          return { stacks: hashResponse };
        // case "cardano":
        //   hashResponse = await createCardanoWallet({});
        //   return { cardano: hashResponse };
        // case "solana":
        //   hashResponse = await createSolanaWallet();
        //   return { solana: hashResponse };
        case "doge":
          hashResponse = await createDogeWallet();
          return { doge: hashResponse };
        case "ethereum":
          hashResponse = await createStacksWallet();
          return { ethereum: hashResponse };
        default:
          return;
      }
    });

    const hashParams = network_wallet_params;
    const redirectURL = link + hashParams;

    window.location.replace(redirectURL);
  };
};
