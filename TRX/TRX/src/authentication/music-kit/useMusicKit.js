import React, {useEffect, useState, useContext} from 'react';
// @ts-ignore
import AppleMusic from '@bouncyapp/react-native-apple-music';

export const useMusicKit = () => {
  const initialize = () => {
    const test = AppleMusic.initialize(
      'MBVSJA2QBU',
      '3J39XKJXT5',
      'MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgDnVAe5C0dO1ouzHufEJpHLfb4KsL3kAa5JVOLdcoiu+gCgYIKoZIzj0DAQehRANCAATvYaFa0e/LgWb2oIwX1OOpBilYle616YJmPDhgNLvtb4YoiDCqIEdSdgcRzEM5rnnLFwc1evaYPyObeX8ghAKf',
    );
    alert(test);
  };
  return {
    initialize,
  };
};
