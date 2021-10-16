import React, { Component } from "react";
import axios from 'axios';

import { NativeModules } from "react-native";

// import RNRestart from 'react-native-restart';

import styles from "./style";
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
// import { createAppContainer } from 'react-navigation'; 
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from 'react-navigation-stack'
import { Button } from 'react-native-elements';

import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

// import RegisterScreen from './register';

// const appId = ""

// const Stack = createStackNavigator();

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

export default class LoginScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
        id: '',
        email: '',
        password: '',
        loading: false
    }
  }

  changeHandler = e => {
    // this.setState({[e.target.name]: e.target.value})
    this.setState({ [e.target.name]: e.target.value })
  }

emailChange = (value)=>{
  value.persist();
  this.setState({email: value.nativeEvent.text})
}

passChange = (value)=>{
value.persist();
this.setState({password: value.nativeEvent.text})
}

  render() {
    const { id, email, password, loading } = this.state
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
          <Text style={styles.logoText}>Tracom</Text>
            <TextInput keyboardType="email-address" value={email} placeholder="Email" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChange={this.emailChange} />
            <TextInput value={password} placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} onChange={this.passChange}/>
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => this.loginHandler()}
              title="Login"
            />

            <Button
              buttonStyle={styles.otherButton}
              onPress={() => this.props.navigation.navigate('Register')}
              title="No account? Register"
            />
            
          </View>
        </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  onLoginPress() {

  }

  loginHandler = () => {
    
    // console.log(this.state)
    // console.log("All states above")
    this.setState({ loading: true })

    axios
        // .post('http://localhost/yummypizza/public/api/auth/login', this.state)
        .post('https://rmgtapi.herokuapp.com/api/auth/login', this.state)
        .then(response => {
            // console.log(response);
            var authe = response.data.token;
            var stat = response.data.status;
            // localStorage.setItem("authen",authe);

            storage.save({
              key: 'loginState', // Note: Do not use underscore("_") in key!
              data: {
                token: authe,
                status: stat
              },
            
              // if expires not specified, the defaultExpires will be applied instead.
              // if set to null, then it will never expire.
              expires: 1000 * 3600
            });
            // storage.save({
            //   key: 'loginStatus', // Note: Do not use underscore("_") in key!
            //   data: {
            //     token: stat
            //   },
            
            //   // if expires not specified, the defaultExpires will be applied instead.
            //   // if set to null, then it will never expire.
            //   expires: 1000 * 3600
            // });

            // console.log(authe);
            // console.log(stat);
            // RNRestart.Restart();
            // this.props.navigation.navigate('Settings')
            NativeModules.DevSettings.reload();
            // window.location.href = "https://neomall.herokuapp.com"
            // window.history.pushState({}, null, '/shop')
            // var sub = true;
        })
        .catch(error => {
            // console.log(error)
            this.setState({ loading: false })
        })
}

}

// const AppNavigator = createStackNavigator({
//   Register: {
//     screen: RegisterScreen,
//   },
// });

// const AppContainer = createAppContainer(AppNavigator);
