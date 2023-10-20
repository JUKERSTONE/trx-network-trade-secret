import {View, Text, Button} from 'react-native';
import React from 'react';

export const AdminDashboardElement = ({
  handleNavigateTrending,
  handleNavigateNews,
  handleNavigateOriginalRanker,
  handleNavigateTRX00Match,
  handleNavigateMerchandise,
  handleNavigateRecords,
  handleNavigateTRXRequests,
}: any) => {
  return (
    <View>
      <Button title="TLT Trending" onPress={handleNavigateTrending} />
      {/* <Button title="TLT News" onPress={handleNavigateNews} /> */}
      {/* <Button title="ORIGINALS RANKER" onPress={handleNavigateOriginalRanker} /> */}
      <Button title="TRX-00 Matcher" onPress={handleNavigateTRX00Match} />
      <Button title="TRX Requests" onPress={handleNavigateTRXRequests} />
      {/* <Button title="Merchandise Shop" onPress={handleNavigateMerchandise} /> */}
      {/* <Button title="Records Shop" onPress={handleNavigateRecords} /> */}
      {/* <Button title="Tickets Shop" onPress={handleNavigateTickets} /> */}
    </View>
  );
};
