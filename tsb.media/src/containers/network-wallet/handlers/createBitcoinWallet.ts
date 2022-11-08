import { PrivateKey, PublicKey, Address, Script } from "bitcore-lib";

export const createBitcoinWallet = async () => {
  const privateKey = new PrivateKey();
  const publicKey = PublicKey.fromPrivateKey(privateKey);
  const address = publicKey.toString();
  console.log(
    "🚀 ~ file: createBitcoinWallet.ts ~ line 5 ~ createBitcoinWal ~ privateKey",
    { privateKey, publicKey, address }
  );

  return JSON.stringify({ privateKey, publicKey, address });
};
