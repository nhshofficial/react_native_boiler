import React from 'react';
import {HomeScreen} from '../screens/Home.screen';
import {SettingsScreen} from '../screens/Settings.screen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Divider,
  Drawer,
  DrawerItem,
  Icon,
  Layout,
  Text,
  Toggle,
} from '@ui-kitten/components';
import {ThemeContext} from '../themes/theme-context';
import {NavigationContainer} from '@react-navigation/native';
import {db} from './DB';

// Drawer Navigation Options
const DrawerNav = createDrawerNavigator();

export const MainNavigation = () => {
  return (
    <DrawerNav.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home"
      drawerContent={props => <DrawerContent {...props} />}>
      <DrawerNav.Screen
        name="Home"
        component={StackNavigator}
        options={{title: 'Drawer Heading'}}
      />
    </DrawerNav.Navigator>
  );
};

// Stack Navigation Options
const Stack = createNativeStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
    {/*<Stack.Screen name="BottomNav" component={AppBottomNav} />*/}
  </Stack.Navigator>
);

// Drawer Contents. Header, Footer, Menus, etc.
const DrawerContent = ({navigation, state}) => {
  const Header = props => (
    <Layout>
      <Text>Hello Header</Text>
      <Divider />
    </Layout>
  );
  const Footer = props => {
    const infoToggleState = useToggleState();
    return (
      <Layout>
        <Divider />
        <Toggle
          style={{
            marginBottom: 30,
            paddingTop: 10,
            paddingStart: 10,
            justifyContent: 'flex-start',
          }}
          status="success"
          {...infoToggleState}>
          Dark Mode
        </Toggle>
      </Layout>
    );
  };
  // State for Selected Menu items
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  return (
    <Layout style={{flex: 1}}>
      <Drawer
        header={Header}
        footer={Footer}
        // selectedIndex={new IndexPath(state.index)}
        selectedIndex={selectedIndex}
        // onSelect={index => navigation.navigate(state.routeNames[index.row])}>
        onSelect={index => {
          setSelectedIndex(index);
          if (String(index) === '3') {
            navigation.navigate('SettingsScreen');
          } else if (String(index) === '1') {
            navigation.navigate('HomeScreen');
            // navigation.navigate('UserSettings');
          } else if (String(index) === '2') {
            // navigation.navigate('Favorites');
            // navigation.navigate('UserSettings');
          } else {
            // Alert.alert(`You selected ${index}`);
            // navigation.navigate('UserSettings');
          }
          // Alert.alert(`You selected ${index}`);
        }}>
        <DrawerItem title="Home" accessoryLeft={<Icon name="home" />} />
        <DrawerItem title="Favourites" accessoryLeft={<Icon name="heart" />} />
        <DrawerItem title="Settings" accessoryLeft={<Icon name="heart" />} />
      </Drawer>
    </Layout>
  );
};

// Theme toggle functions and update into sqlite db
const useToggleState = () => {
  const themeContext = React.useContext(ThemeContext);
  const [checked, setChecked] = React.useState(false);
  React.useEffect(() => {
    db.transaction(async trx => {
      await trx.executeSql(
        'SELECT * FROM user WHERE id = ?',
        [1],
        (trx, res) => {
          // ThemeChange(updatedTheme);
          res.rows.item(0).theme === 'dark'
            ? setChecked(true)
            : setChecked(false);
          // console.log('FOUND : ', updatedTheme);
        },
        null,
      );
    });
  }, []);

  const onCheckedChange = isChecked => {
    // temp toggle
    // themeContext.toggleTheme();
    // set
    setChecked(isChecked);
    if (isChecked) {
      db.transaction(async trx => {
        await trx.executeSql(
          'SELECT * FROM user WHERE id = ?',
          [1],
          (trx, res) => {
            const updatedTheme =
              res.rows.item(0).theme === 'dark' ? 'light' : 'dark';
            ThemeChange(updatedTheme);
            themeContext.toggleTheme();
            // setChecked(true);
            console.log('FOUND : ', updatedTheme);
          },
          null,
        );
      });
      console.log(isChecked);
    } else {
      db.transaction(async trx => {
        await trx.executeSql(
          'SELECT * FROM user WHERE id = ?',
          [1],
          (trx, res) => {
            const updatedTheme =
              res.rows.item(0).theme === 'dark' ? 'light' : 'dark';
            ThemeChange(updatedTheme);
            themeContext.toggleTheme();
            // setChecked(true);
            console.log('FOUND : ', updatedTheme);
          },
          null,
        );
      });
    }
  };

  const ThemeChange = themeName => {
    // Update the theme in the DB
    db.transaction(async tx => {
      await tx.executeSql(
        'UPDATE user SET theme = ? WHERE id = ?',
        [themeName, 1],
        (tx, results) => {
          console.log('Results', results);
        },
      );
    });
  };

  return {
    checked,
    onChange: onCheckedChange,
  };
  // console.log(checked);
};

export const AppNavigator = () => (
  <NavigationContainer>
    <MainNavigation />
  </NavigationContainer>
);
