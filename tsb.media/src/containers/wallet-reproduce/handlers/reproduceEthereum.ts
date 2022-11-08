const ethers = require("ethers");

export const handleReproduceEthereumWallet = ({ keys }: any) => {
  let wallet = new ethers.Wallet(keys);
  const balance = wallet.getBalance();

  return balance;
};
