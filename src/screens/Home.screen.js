import React from 'react';
import {Divider, Layout, Text} from '@ui-kitten/components';
import {AppBottomNav} from '../components/BottomTabNav.component';

export const HomeScreen = ({navigation}) => {
  return (
    <>
      <Layout style={{flex: 1}}>
        <Text>Home Screen</Text>
      </Layout>
      <Divider />
      <AppBottomNav navigation={navigation} />
    </>
  );
};
