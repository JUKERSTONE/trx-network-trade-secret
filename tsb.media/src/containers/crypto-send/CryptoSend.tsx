import React from "react";
import { CryptoSendElement } from "../../elements";
import { useCryptoSend } from "./useCryptoSend";

export const CryptoSendContainer = ({ ...props }) => {
  const { ...useCryptoSendProps } = useCryptoSend();
  return <CryptoSendElement {...props} />;
};
