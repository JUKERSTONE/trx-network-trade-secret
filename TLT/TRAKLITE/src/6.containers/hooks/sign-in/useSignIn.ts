import { useState } from "react";

import { SignInState } from "./types";
import { store } from "../../../3.stores";
import * as actions from "../../../3.stores";
import { updateSignInState, signInState } from "./handlers";
import { signIn, signInWithSpotify } from "../../../2.auth";
import axios from "axios";
// @ts-ignore
import AppleMusic from "@bouncyapp/react-native-apple-music";

export const useSignIn = (navigation: any) => {
  const [signInForm, setSignInForm] = useState<SignInState>(signInState);
  const [isLoadingTraklist, setIsLoadingTraklist] = useState(false);
  const [isLoadingSpotify, setIsLoadingSpotify] = useState(false);
  const [isLoadingApple, setIsLoadingApple] = useState(false);

  const handleSignInChange = (text: any, field: any) =>
    updateSignInState(text, field, signInForm, setSignInForm);

  const handleSignInWithTraklist = async () => {
    setIsLoadingTraklist(true);
    const newData = await signIn(signInForm);

    if (newData.success) {
      setIsLoadingTraklist(false);
      store.dispatch(actions.USER_LOGGED_IN("log user in.", newData));
    } else {
      setIsLoadingTraklist(false);
      alert("User details not found. Try again");
    }
  };

  const handleSignInWithSpotify = async () => {
    setIsLoadingSpotify(true);
    const newData = await signInWithSpotify();
    console.log(
      "🚀 ~ file: useSignIn.ts ~ line 34 ~ handleSignInWithSpotify ~ newData",
      newData
    );
    // if empty

    if (newData.success) {
      setIsLoadingSpotify(false);
      store.dispatch(actions.USER_LOGGED_IN("log user in.", newData.data));
    } else {
      setIsLoadingSpotify(false);
      alert(newData.data);
    }
  };

  const handleSignInWithApple = async () => {
    const AppleMusicKeyId = "MBVSJA2QBU";
    const AppleMusicTeamId = "3J39XKJXT5";
    const AppleMusicPrivateKey =
      "-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgDnVAe5C0dO1ouzHu\nfEJpHLfb4KsL3kAa5JVOLdcoiu+gCgYIKoZIzj0DAQehRANCAATvYaFa0e/LgWb2\noIwX1OOpBilYle616YJmPDhgNLvtb4YoiDCqIEdSdgcRzEM5rnnLFwc1evaYPyOb\neX8ghAKf\n-----END PRIVATE KEY-----";

    await AppleMusic.initialize(
      AppleMusicKeyId,
      AppleMusicTeamId,
      AppleMusicPrivateKey
    );
    const test = await AppleMusic.login()
      .then((response: any) => {
        console.log(
          "🚀 ~ file: useSignIn.ts ~ line 77 ~ test ~ response",
          response
        );
      })
      .catch((err: any) => {
        alert(err);
      });
    console.log(
      "🚀 ~ file: useSignIn.ts ~ line 77 ~ handleSignInWithApple ~ test",
      test
    );
    await AppleMusic.getUserMusicToken();
  };

  const handleAuthNavigation = () => {
    navigation.navigate("REGISTER.");
  };

  return {
    handleSignInChange,
    handleSignInWithTraklist,
    handleSignInWithSpotify,
    handleSignInWithApple,
    handleAuthNavigation,
    isLoadingTraklist,
    isLoadingSpotify,
    isLoadingApple,
  };
};

export default useSignIn;
