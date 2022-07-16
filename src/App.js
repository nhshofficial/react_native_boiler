/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import {ThemeContext} from './themes/theme-context';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import Toast from 'react-native-toast-message';
import {default as newTheme} from './themes/theme.json';
import {AppNavigator} from './components/Navigation.component';
import 'react-native-gesture-handler';
import {db, createTable} from './components/DB';
import {InternetCheck} from './components/InternetCheck.component';

const App = () => {
  // Theme related
  // theme state
  const [theme, setTheme] = React.useState('light');
  // Setup user theme 1st time app is launched
  const themeSetup = () => {
    db.transaction(async trx => {
      await trx.executeSql('SELECT * FROM user', [], async (trx, result) => {
        let len = result.rows.length;
        if (len > 0) {
          setTheme(result.rows.item(0).theme);
        } else {
          await trx.executeSql('INSERT INTO user (theme) VALUES (?)', [
            'light',
          ]);
          setTheme('light');
        }
      });
    });
  };
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };
  // useEffect Auto Run 1st time
  React.useEffect(() => {
    createTable();
    themeSetup();
    InternetCheck();
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={{theme, toggleTheme}}>
        <ApplicationProvider {...eva} theme={{...eva[theme], ...newTheme}}>
          <AppNavigator />
          <Toast />
        </ApplicationProvider>
      </ThemeContext.Provider>
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
