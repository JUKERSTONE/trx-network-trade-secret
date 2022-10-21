import React, { useState, useEffect } from "react";

import { createStacksWallet, un_wrap_RouteParams } from "./handlers";

export const createBlockchainWallet = async () => {
  const [hashParams, setHashParams] = useState<string>(null!);

  useEffect(() => {
    async () => {
      const [pathname] = window.location.pathname.split("/");
      const routeParams = pathname[pathname.length - 1];

      const { blockchain } = un_wrap_RouteParams({
        routeParams,
      });

      switch (blockchain) {
        case "bitcoin":
          return setHashParams("hashParams");
        case "stacks":
          const hashParams = await createStacksWallet();
          return setHashParams(hashParams);
        case "doge":
          return setHashParams("hashParams");
        case "cardano":
          return setHashParams("hashParams");
        case "ethereum":
          return setHashParams("hashParams");
        case "solana":
          return setHashParams("hashParams");
        default:
          return;
      }
    };
  }, []);

  return {
    hashParams,
  };
};
