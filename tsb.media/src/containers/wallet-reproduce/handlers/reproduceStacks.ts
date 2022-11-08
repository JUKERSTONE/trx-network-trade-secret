import { generateWallet, restoreWalletAccounts } from "@stacks/wallet-sdk";
import { StacksTestnet, StacksMainnet } from "@stacks/network";

export const handleReproduceStacksWallet = async ({ keys }: any) => {
  const wallet = await generateWallet({
    secretKey: keys.secretKey,
    password: keys.password,
  });

  const restoredWallet = await restoreWalletAccounts({
    // `baseWallet` is returned from `generateWallet`
    wallet,
    gaiaHubUrl: "https://hub.blockstack.org",
    network: new StacksMainnet(),
  });

  return restoredWallet;
};
