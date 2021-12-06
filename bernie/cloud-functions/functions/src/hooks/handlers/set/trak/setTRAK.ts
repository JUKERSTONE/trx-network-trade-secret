import { buildTRAK } from "../../build";

export const setTRAK = ({ request, response }: any) => {
  const trakToken = buildTRAK({ request });
  //   SEND TO BERNIE DATABASE
  //   SEND TO SOLANA DATABASE
  //   SEND TO FORCHAIN DATABASE
};
