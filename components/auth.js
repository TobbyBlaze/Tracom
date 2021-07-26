import React, { Component } from "react";
import axios from 'axios';

import styles from "./style";
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';

// import { createAppContainer } from 'react-navigation'; 
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from 'react-navigation-stack'
import { Button } from 'react-native-elements';

import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

// import RegisterScreen from './register';

// const appId = ""

// const Stack = createStackNavigator();
var auth;

const storage = new Storage({
  // maximum capacity, default 1000 key-ids
  size: 1000,

  // Use AsyncStorage for RN apps, or window.localStorage for web apps.
  // If storageBackend is not set, data will be lost after reload.
  storageBackend: AsyncStorage, // for web: window.localStorage

  // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  defaultExpires: 1000 * 3600 * 24,

  // cache data in the memory. default is true.
  enableCache: true,

  // if data was not found in storage or expired data was found,
  // the corresponding sync method will be invoked returning
  // the latest data.
  sync: {
    // we'll talk about the details later.
  }
});

export default class AuthScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
        auth: null,
        loading: false
    }
  }

  render() {
    const { auth, loading } = this.state
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
          <Text style={styles.logoText}>Tracom</Text>
            
            {auth == null?(
            <Button
              buttonStyle={styles.otherButton}
              onPress={() => this.props.navigation.navigate('Login')}
              title="Login/Register"
            />

            ):(

            <Button
              buttonStyle={styles.logoutButton}
              onPress={() => this.logoutHandler()}
              title="Logout"
            />)}
            
          </View>
        </View>
      </TouchableWithoutFeedback>
      <AdMobBanner
                bannerSize="fullBanner"
                adUnitID="ca-app-pub-6275312492939393/5489650110" // Test ID, Replace with your-admob-unit-id
                servePersonalizedAds // true or false
                onDidFailToReceiveAdWithError={this.bannerError} />
                
      </KeyboardAvoidingView>
    );
  }

  componentDidMount() {
    storage
  .load({
    key: 'loginState',

    // autoSync (default: true) means if data is not found or has expired,
    // then invoke the corresponding sync method
    autoSync: true,

    // syncInBackground (default: true) means if data expired,
    // return the outdated data first while invoking the sync method.
    // If syncInBackground is set to false, and there is expired data,
    // it will wait for the new data and return only after the sync completed.
    // (This, of course, is slower)
    syncInBackground: true,

    // you can pass extra params to the sync method
    // see sync example below
    syncParams: {
      extraFetchOptions: {
        // blahblah
      },
      someFlag: true
    }
  })
  .then(ret => {
    // found data go to then()
    console.log(ret.token);
    this.setState({ auth: ret.token })
  })
  .catch(err => {
    // any exception including data not found
    // goes to catch()
    console.warn(err.message);
    switch (err.name) {
      case 'NotFoundError':
        // TODO;
        break;
      case 'ExpiredError':
        // TODO
        break;
    }
  });
  }

  componentWillUnmount() {
  }

  logoutHandler =() => {
    
    console.log("All states")
    console.log(this.state)
    // var a=localStorage.getItem("authen");
    // this.setState({ loading: true })

    axios
        .get('https://riskmgtapi.herokuapp.com/api/auth/logout',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+this.state.auth,
            }
        })
        .then(response => {
            console.log("All responses from logout")
            console.log(response);
            this.setState({ auth: null })
            console.log(this.state.auth);
            
            this.props.navigation.navigate('Login')
        })
        .catch(error => {
            console.log("Error from logout")
            console.log(error)
            // this.setState({ loading: false })
        })

    storage.remove({
      key: 'loginState'
    });
}

}

// const AppNavigator = createStackNavigator({
//   Register: {
//     screen: RegisterScreen,
//   },
// });

// const AppContainer = createAppContainer(AppNavigator);
