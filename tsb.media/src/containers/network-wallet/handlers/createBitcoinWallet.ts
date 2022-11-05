import { PrivateKey, PublicKey } from "bitcore-lib";

export const createBitcoinWallet = async () => {
  const privateKey = new PrivateKey();
  const public_key = PublicKey.fromPrivateKey(privateKey);

  return JSON.stringify({ ...privateKey });
};
