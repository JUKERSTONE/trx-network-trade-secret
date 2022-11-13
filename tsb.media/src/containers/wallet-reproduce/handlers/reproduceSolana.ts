import { Connection, clusterApiUrl } from "@solana/web3.js";

export const handleReproduceSolanaWallet = (address: any) => {
  let connection = new Connection(clusterApiUrl("mainnet-beta"));
  const account = connection.getAccountInfo(address);

  return account;
};
