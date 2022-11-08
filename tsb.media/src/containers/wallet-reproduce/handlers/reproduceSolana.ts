import { Connection, clusterApiUrl } from "@solana/web3.js";

export const handleReproduceSolanaWallet = ({ keys }: any) => {
  let connection = new Connection(clusterApiUrl("mainnet-beta"));
  const account = connection.getAccountInfo(keys.publicKey);

  return account;
};
