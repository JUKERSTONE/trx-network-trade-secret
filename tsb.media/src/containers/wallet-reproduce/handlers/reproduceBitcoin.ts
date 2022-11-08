import { PrivateKey, PublicKey } from "bitcore-lib";

export const handleReproduceBitcoinWallet = ({ keys }: any) => {
  var address = new PrivateKey(keys.wif).toAddress();
};
