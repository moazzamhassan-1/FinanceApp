// Navigation/RootStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigation from './AuthNavigation';
import MainStack from './MainStack';

const Stack = createStackNavigator();

const RootStack = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn ? (
        <Stack.Screen name="Auth" component={AuthNavigation} />
      ) : (
        <Stack.Screen name="Main" component={MainStack} />
      )}
    </Stack.Navigator>
  );
};

export default RootStack;
