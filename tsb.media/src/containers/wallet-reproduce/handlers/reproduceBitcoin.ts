import { PrivateKey, PublicKey } from "bitcore-lib";
import axios from "axios";

export const handleReproduceBitcoinWallet = async (address: any) => {
  const response = await axios.get(
    "https://blockchain.info/rawaddr/" + address,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};
