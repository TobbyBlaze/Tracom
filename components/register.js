import React, { Component } from "react";
import axios from 'axios';

import styles from "./style";
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
// import { createAppContainer } from 'react-navigation'; 
// import { createStackNavigator } from 'react-navigation-stack'
import { Button } from 'react-native-elements';

const appId = ""

export default class RegisterScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
        id: '',
        email: '',
        password: '',
        confirm_password: '',
        loading: false
    }
  }

  changeHandler = e => {
    e.persist();
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

conpassChange = (value)=>{
  value.persist();
  this.setState({confirm_password: value.nativeEvent.text})
}

  render() {
    const { id, email, password, confirm_password, loading } = this.state
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
          <Text style={styles.logoText}>Tracom</Text>
            <TextInput name="email" keyboardType="email-address" value={email} placeholder="Email" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChange={this.emailChange}/>
            <TextInput name="password" value={password} placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} onChange={this.passChange}/>
            <TextInput name="confirm_password" value={confirm_password} placeholder="Confirm Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} onChange={this.conpassChange}/>
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => this.signupHandler()}
              title="Register"
            />

            <Button
              buttonStyle={styles.otherButton}
              onPress={() => this.props.navigation.navigate('Login')}
              title="Already registered? Login now"
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

  onRegisterPress() {

  }

 

  signupHandler = () => {
    
    console.log(this.state)
    console.log("States above")
    this.setState({ loading: true })

    axios
        
        .post('http://riskmgtapi.herokuapp.com/api/auth/signup', this.state
        , {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            // this.loginHandler();
            console.log(response)
            this.props.navigation.navigate('Login')
        })
        .catch(error => {
            console.log(error)
            this.setState({ loading: false })
        })
}

}
