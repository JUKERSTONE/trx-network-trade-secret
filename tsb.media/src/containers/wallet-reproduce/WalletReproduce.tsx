import React from "react";
import { WalletReproduceElement } from "../../elements";
import { useWalletReproduce } from "./useReproduce";

export const WalletReproduceContainer = ({ ...props }) => {
  const { ...useWalletrReproduce } = useWalletReproduce();
  return <WalletReproduceElement {...props} />;
};
