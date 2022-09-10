import Purchases from 'react-native-purchases';

export const handleInitializeInAppPurchases = () => {
  Purchases.setDebugLogsEnabled(true);
  Purchases.configure('appl_pepUHYcBPwCrCbAvwzPqCWBjJTA');
};
