import 'react-native-gesture-handler';

// import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AuthScreen from './components/auth';
import LoginScreen from './components/login';
import RegisterScreen from './components/register';
import Home from './components/Home';
import Trades from './components/Trades';
import About from './components/About';
import rmgt from './components/Rmgt';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={AuthScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Tracom" component={Home} />
      
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tracom" component={Home} />
      
      
    </Stack.Navigator>
  );
}

function TradeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Daily Trades" component={Trades} />
      
      
    </Stack.Navigator>
  );
}

function MgtStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Risk manager" component={rmgt} />
      
      
    </Stack.Navigator>
  );
}


export default function App() {
  return (

    <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Journals') {
            iconName = focused
              ? 'ios-journal'
              : 'ios-journal';
          } else if (route.name === 'Daily Trades') {
            iconName = focused ? 'md-checkmark-circle' : 'md-checkmark-circle-outline';
          } else if (route.name === 'Risk manager') {
            iconName = focused ? 'ios-analytics' : 'ios-analytics-outline';
          } else if (route.name === 'About') {
            iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-finger-print' : 'ios-finger-print';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Journals" component={HomeStack} />
      <Tab.Screen name="Daily Trades" component={TradeStack} />
      <Tab.Screen name="Risk manager" component={MgtStack} />
      <Tab.Screen name="Settings" component={AuthStack} />
     
    </Tab.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
  },
});
