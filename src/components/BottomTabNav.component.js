import React from 'react';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import {ThemeContext} from '../themes/theme-context';

// Icons for the bottom navigation bar
const MenuIcon = props => <Icon {...props} name="menu-2" />;
const PersonIcon = props => <Icon {...props} name="person-outline" />;
const BellIcon = props => <Icon {...props} name="bell-outline" />;
const EmailIcon = props => <Icon {...props} name="email-outline" />;

export const AppBottomNav = ({navigation}) => {
  const themeContext = React.useContext(ThemeContext);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <BottomNavigation
      appearance="noIndicator"
      selectedIndex={selectedIndex}
      onSelect={index => {
        setSelectedIndex(index);
        if (index === 3) {
          themeContext.toggleTheme();
        }

        if (index === 0) {
          navigation.openDrawer();
        }
      }}>
      <BottomNavigationTab icon={MenuIcon} title="Menu" />
      <BottomNavigationTab icon={PersonIcon} title="USERS" />
      <BottomNavigationTab icon={BellIcon} title="ORDERS" />
      <BottomNavigationTab icon={EmailIcon} title="Theme" />
    </BottomNavigation>
  );
};
