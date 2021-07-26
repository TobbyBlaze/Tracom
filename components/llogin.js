import React, { Component } from "react";

import styles from "./style";
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
// import { createAppContainer } from 'react-navigation'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from 'react-navigation-stack'
import { Button } from 'react-native-elements';

import RegisterScreen from './register';

const appId = ""

function LoginScreen({ navigation }) {

    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
          <Text style={styles.logoText}>Tracom</Text>
            <TextInput keyboardType="email-address" value="" placeholder="Email" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} />
            <TextInput value="" placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true}/>
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => this.onLoginPress()}
              title="Login"
            />

            <Button
              buttonStyle={styles.otherButton}
              onPress={() => navigation.navigate('Register')}
              title="No account? Register"
            />
            
          </View>
        </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }


  const Stack = createStackNavigator();

function AppL() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppL;

// const AppNavigator = createStackNavigator({
//   Register: {
//     screen: RegisterScreen,
//   },
// });

// const AppContainer = createAppContainer(AppNavigator);
