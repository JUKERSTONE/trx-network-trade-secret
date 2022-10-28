import * as assert from "assert";
import ECPairFactory from "ecpair";
import * as ecc from "tiny-secp256k1";
import * as bitcoin from "../../../bitcoin";
import { regtestUtils } from "../utils";

export const createDogeWallet = async () => {
  var dogecoin = require("node-dogecoin")();

  return dogecoin.auth("MyUserName", "mypassword").getNewAddress();
};
