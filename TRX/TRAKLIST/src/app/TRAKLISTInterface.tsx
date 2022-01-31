import React, {useState, Component} from 'react';
import {View, StatusBar, Text, SafeAreaView} from 'react-native';
import {colors} from '../core';
import {TRXPlayer} from '../elements';
import {TRXModalContainer} from '../container';

export const TRXInterfaceHOC = (InnerComponent: any) => {
  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? colors.dark.primary : colors.light.primary,
  // };
  return class TRXInterfaceHOC extends Component {
    render() {
      return (
        <View style={[{flex: 1} /*backgroundStyle*/]}>
          <StatusBar /*barStyle={isDarkMode ? 'light-content' : 'dark-content'}*/
          />
          <SafeAreaView style={{flex: 1, justifyContent: 'space-between'}}>
            <View style={{flex: 1}}>
              <InnerComponent
              // {...this.props}
              // {...this.state}
              // onWorkoutSelect={this.handleWorkoutSelect}
              />
            </View>
            <TRXPlayer />
          </SafeAreaView>
          {/*  */}
          <TRXModalContainer />
        </View>
      );
    }
  };
};
