const React = require("react-native");

const { StyleSheet } = React;

export default {

containerView: {
  flex: 1,
},
loginScreenContainer: {
  flex: 1,
},
logoText: {
  fontSize: 40,
  fontWeight: "800",
  marginTop: 150,
  marginBottom: 30,
  textAlign: 'center',
},
loginFormView: {
  flex: 1
},
loginFormTextInput: {
  height: 43,
  fontSize: 14,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#eaeaea',
  backgroundColor: '#fafafa',
  color: '#3897f1',
  paddingLeft: 10,
  marginLeft: 15,
  marginRight: 15,
  marginTop: 5,
  marginBottom: 5,

},
journalFormTextInput: {
  height: 100,
  fontSize: 14,
  borderRadius: 15,
  borderWidth: 3,
  borderColor: 'grey',
  backgroundColor: '#fafafa',
  color: '#3897f1',
  paddingLeft: 10,
  marginLeft: 15,
  marginRight: 15,
  marginTop: 5,
  marginBottom: 5,

},
tradeFormTextInput: {
  height: 100,
  fontSize: 14,
  borderRadius: 15,
  borderWidth: 3,
  borderColor: 'grey',
  backgroundColor: '#fafafa',
  color: '#3897f1',
  paddingLeft: 10,
  marginLeft: 15,
  marginRight: 15,
  marginTop: 5,
  marginBottom: 5,

},
loginButton: {
  backgroundColor: '#3897f1',
  borderRadius: 20,
  height: 45,
  marginTop: 10,
},
journalButton: {
  backgroundColor: '#3897f1',
  // borderWidth: 3,
  // borderColor: 'grey',
  borderRadius: 15,
  height: 45,
  marginTop: 10,
},
tradeButton: {
  backgroundColor: '#3897f1',
  // borderWidth: 3,
  // borderColor: 'grey',
  borderRadius: 15,
  height: 45,
  marginTop: 10,
},
otherButton: {
  backgroundColor: 'grey',
  borderRadius: 20,
  height: 45,
  marginTop: 10,
},
logoutButton: {
  backgroundColor: 'red',
  borderRadius: 20,
  height: 45,
  margin: 10,
},
fbLoginButton: {
  height: 45,
  marginTop: 10,
  backgroundColor: 'transparent',
},
};
