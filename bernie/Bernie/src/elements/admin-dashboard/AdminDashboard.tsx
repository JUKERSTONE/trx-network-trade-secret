import {View, Text, Button} from 'react-native';
import React from 'react';

export const AdminDashboardElement = ({
  handleNavigateTrending,
  handleNavigateNews,
}: any) => {
  return (
    <View>
      <Button title="TLT Trending" onPress={handleNavigateTrending} />
      <Button title="TLT News" onPress={handleNavigateNews} />
    </View>
  );
};
