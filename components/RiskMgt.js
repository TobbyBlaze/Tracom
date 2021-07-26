import React, { Component } from 'react'

import { Image, Share, Alert, Modal, TouchableWithoutFeedback, Keyboard, TextInput, TouchableOpacity, TouchableHighlight, StyleSheet, View, ScrollView, Text } from 'react-native';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
  } from 'expo-ads-admob';
import * as Speech from 'expo-speech';
import * as Notifications from 'expo-notifications';

// import Icon from 'react-native-vector-icons/FontAwesome';
// import { Shadow } from 'react-native-neomorph-shadows';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
});

export default class RiskMgt extends Component{

    constructor(props){
        super(props);

        this.state = {
           
            RiskMgt: [],
            EP: null, //Entry Point
            SL: null, //Stop Loss
            TP: null, //Take Profit
            LS: null, //Lot Size
            AB: null, //Account Balance
            FM: null, //Free Margin
            PL: null, //Potential Loss
            PP: null, //Potential Profit
            ML: null, //Maximum Loss
            MP: null, //Maximum Profit
            E: null, //Equity
            MLP: null, //Margin Level Percentage
            TT: null, //Trade Type, Sell or Buy
            PLW: false, //Potential Loss Window
            PLB: true, //Potential Loss Button
            PPW: false, //Potential Profit Window
            PPB: true, //Potential Profit Button
            LSW: false, //Lot Size Window
            LSB: true, //Lot Size Button
            MV: false, //Modal Visible
            MM: null, //Modal message
            
        }
    }

    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    speak = () => {
        const thingToSay = '1';
        Speech.speak(thingToSay);
      };

    setMV = () => {
        this.setState({
            MV: false
        });
        console.log("Close modal")
    }

    PLHandler = e => {
        e.preventDefault();

        var countDecimals = function (value) {
            if(Math.floor(value) === value) return 0;
            return value.toString().split(".")[1].length || 0;
        }

        var StL = parseFloat(this.state.SL); //Stop Loss
        var Entry = parseFloat(this.state.EP); //Entry Point
        var decimalPoints = countDecimals(Entry);
        var Lots = parseFloat(this.state.LS); //Lot size

        var PLC; //Potential Loss Calculated

        if(StL > Entry){
            // PLC = parseFloat(Math.round(((Lots * (StL - Entry) * 100) + Number.EPSILON) * 100) / 100);
            var num = parseFloat((Lots * (StL - Entry)) * 100000);
            PLC = Math.round((num + Number.EPSILON) * 100) / 100;

            this.setState({
                PL: PLC
            });
            this.setState({
                MV: true
            });
            this.setState({
                MM: "Your potential loss is "+ PLC
            });
            // Alert.alert("Your potential loss is "+ PLC)
        }else if(Entry > StL){
            // PLC = parseFloat(Math.round(((Lots * (Entry - StL) * 100) + Number.EPSILON) * 100) / 100);
            var num = parseFloat((Lots * (Entry - StL)) * 100000);
            PLC = Math.round((num + Number.EPSILON) * 100) / 100;
            
            this.setState({
                PL: PLC
            });
            this.setState({
                MV: true
            });
            this.setState({
                MM: "Your potential loss is "+ PLC
            });
            //   Alert.alert("Your potential loss is "+ PLC)
        }else{
            this.setState({
                MV: true
            });
            this.setState({
                MM: "Invalid!"
            });
            // Alert.alert("Invalid!")
            console.log("Could not calculate potential loss")
        }
        console.log(this.state);
    }

    PPHandler = e => {
        e.preventDefault();

        var TaP = parseFloat(this.state.TP); //Take Profit
        var Entry = parseFloat(this.state.EP); //Entry Point
        var Lots = parseFloat(this.state.LS); //Lot size

        var PPC; //Potential Profit Calculated

        if(Entry >= TaP){
            // PPC = parseFloat(Math.round(((Lots * (Entry - TaP) * 100) + Number.EPSILON) * 100) / 100);
            var num = parseFloat((Lots * (Entry - TaP)) * 100000);
            PPC = Math.round((num + Number.EPSILON) * 100) / 100;

            this.setState({
                PP: PPC
              });
            Alert.alert("Your potential profit is "+ PPC)
        }else if(TaP >= Entry){
            // PPC = parseFloat(Math.round(((Lots * (TaP - Entry) * 100) + Number.EPSILON) * 100) / 100);
            var num = parseFloat((Lots * (TaP - Entry)) * 100000);
            PPC = Math.round((num + Number.EPSILON) * 100) / 100;

            this.setState({
                PP: PPC
              });
            Alert.alert("Your potential profit is "+ PPC)
        }else{
            Alert.alert("Invalid!")
            console.log("Could not calculate potential profit")
        }
        console.log(this.state);
    }

    LSwlHandler = e => { //Lot size with loss handler
        e.preventDefault();

        var StL = parseFloat(this.state.SL); //Stop Loss
        var MaL = parseFloat(this.state.ML); //Maximum Loss
        var Entry = parseFloat(this.state.EP); //Entry Point
        var Lots = parseFloat(this.state.LS); //Lot size

        if(StL > Entry){
            Lots = parseFloat(Math.round(((MaL / (StL - Entry)) + Number.EPSILON) * 100) / 100);
            this.setState({
                LS: Lots
              });
              Alert.alert("The calculated lot size is "+ Lots)
        }else if(Entry > StL){
            Lots = parseFloat(Math.round(((MaL / (Entry - StL)) + Number.EPSILON) * 100) / 100);
            this.setState({
                LS: Lots
              });
              Alert.alert("The calculated lot size is "+ Lots)
        }else{
            Alert.alert("Invalid!")
            console.log("Could not calculate lot size")
        }
        console.log(this.state);
    }

    LSwpHandler = e => { //Lot size with profit handler
        e.preventDefault();

        var TaP = parseFloat(this.state.TP); //Take Profit
        var MaP = parseFloat(this.state.MP); //Maximum Profit
        var Entry = parseFloat(this.state.EP); //Entry Point
        var Lots = parseFloat(this.state.LS); //Lot size

        if(Entry > TaP){
            Lots = parseFloat(Math.round(((MaP / (Entry - TaP)) + Number.EPSILON) * 100) / 100);
            this.setState({
                LS: Lots
              });
            Alert.alert("The calculated lot size is "+ Lots)
        }else if(TaP > Entry){
            Lots = parseFloat(Math.round(((MaP / (TaP - Entry)) + Number.EPSILON) * 100) / 100);
            this.setState({
                LS: Lots
              });
            Alert.alert("The calculated lot size is "+ Lots)
        }else{
            Alert.alert("Invalid!")
            console.log("Could not calculate lot size")
        }
        console.log(this.state);
    }

    onShare = async () => {
        try {
          const result = await Share.share({
            message:
              'Entry point: '+ this.state.EP+', Take profit: '+ this.state.TP+', Stop loss: '+ this.state.SL+'. '
          });
    
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };

    render(){
        const { EP, SL, TP, LS, AB, FM, PL, PP, ML, MP, E, MLP, TT, PLW, PLB, PPW, PPB, LSW, LSB, MV, MM } = this.state

        return(
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{backgroundColor: "white"}}>
                <View style={{backgroundColor: "black"}}>
                    <Text style={{ height: 15, marginTop: 10}}></Text>
                </View>
                {/* <View style={{backgroundColor: "black", borderColor: "black", borderWidth: 1, shadowColor: 'black', shadowOffset: { width: 4, height: 4 }, shadowOpacity: 0.6, shadowRadius: 2, elevation: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
                    <Image style={{width: 100, height: 40, borderRadius: 30, marginTop: 10, paddingBottom: 10}} source={require('./MgtMkt1.png')} />
                </View> */}
               
               {PLB?
                <View>
                    <TouchableOpacity
                    style={styles.mainButtons}
                    onPress={() => this.setState({ PLW: PLW ? false : true, PPB: PLW ?true : false, LSB: PLW ?true : false }) }
                    // onPress={() => this.setState({ PLW: PLW ? false : true }) }
                    >
                    <Text style={{ color:"red", textAlign: "center"}}>CHECK POTENTIAL LOSS</Text>
                    </TouchableOpacity>
                </View>
                :
                <View>
                    
                </View>
                }
                {PLW?
                    <ScrollView style={{backgroundColor: "white"}}>
                        <View style={styles.divViews}>
                            <TextInput
                            style={styles.textIn}
                            onChangeText={EP => this.setState({ EP: EP })}
                            value={EP}
                            placeholder="Entry point"
                            placeholderTextColor="blue"
                            textAlign="center"
                            keyboardType="numeric"
                            />
                            <TextInput
                            style={styles.textIn}
                            onChangeText={SL => this.setState({ SL: SL })}
                            value={SL}
                            placeholder="Stop Loss"
                            placeholderTextColor="red"
                            textAlign="center"
                            keyboardType="numeric"
                            />
                            <TextInput
                            style={styles.textIn}
                            onChangeText={LS => this.setState({ LS: LS })}
                            value={LS}
                            placeholder="Lot size"
                            placeholderTextColor="blue"
                            textAlign="center"
                            keyboardType="numeric"
                            />
                        </View>
                        <View>
                            <TouchableOpacity
                            style={styles.confirmButtons}
                            onPress={this.PLHandler}
                            >
                            <Text style={{ color:"red", textAlign: "center"}}>Potential Loss</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                :
                    <ScrollView style={{backgroundColor: "white"}}>
                        <View>
                            
                        </View>
                    </ScrollView>
                }

                {PPB?
                <View>
                    <TouchableOpacity
                    style={styles.mainButtons}
                    // style={{backgroundColor: "red"}}
                    onPress={() => this.setState({ PPW: PPW ? false : true, PLB: PPW ?true : false, LSB: PPW ?true : false }) }
                    // onPress={() => this.setState({ PPW: PPW ? false : true }) }
                    >
                    <Text style={{ color:"green", textAlign: "center"}}>CHECK POTENTIAL PROFIT</Text>
                    </TouchableOpacity>
                </View>
                :
                <View></View>
                }

                {PPW?
                    <ScrollView style={{backgroundColor: "white"}}>
                        <View style={styles.divViews}>
                            <TextInput
                            style={styles.textIn}
                            onChangeText={EP => this.setState({ EP: EP })}
                            value={EP}
                            placeholder="Entry point"
                            placeholderTextColor="blue"
                            textAlign="center"
                            keyboardType="numeric"
                            />
                            <TextInput
                            style={styles.textIn}
                            onChangeText={TP => this.setState({ TP: TP })}
                            value={TP}
                            placeholder="Take Profit"
                            placeholderTextColor="green"
                            textAlign="center"
                            keyboardType="numeric"
                            />
                            <TextInput
                            style={styles.textIn}
                            onChangeText={LS => this.setState({ LS: LS })}
                            value={LS}
                            placeholder="Lot size"
                            placeholderTextColor="blue"
                            textAlign="center"
                            keyboardType="numeric"
                            />
                        </View>
                        <View>
                            <TouchableOpacity
                            style={styles.confirmButtons}
                            onPress={this.PPHandler}
                            >
                            <Text style={{ color:"green", textAlign: "center"}}>Potential Profit</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                :
                    <ScrollView style={{backgroundColor: "white"}}>
                        <View>
                            
                        </View>
                    </ScrollView>
                }

                {LSB?
                <View>
                    <TouchableOpacity
                    style={styles.mainButtons}
                    // style={{backgroundColor: "red"}}
                    onPress={() => this.setState({ LSW: LSW ? false : true, PLB: LSW ?true : false, PPB: LSW ?true : false }) }
                    // onPress={() => this.setState({ PPW: PPW ? false : true }) }
                    >
                    <Text style={{ color:"black", textAlign: "center"}}>CHECK LOT SIZE</Text>
                    </TouchableOpacity>
                </View>
                :
                <View></View>
                }

                {LSW?
                <View>
                    <ScrollView style={{backgroundColor: "white"}}>
                        <View style={styles.divViews}>
                            <TextInput
                            style={styles.textIn}
                            onChangeText={EP => this.setState({ EP: EP })}
                            value={EP}
                            placeholder="Entry point"
                            placeholderTextColor="blue"
                            textAlign="center"
                            keyboardType="numeric"
                            />
                            <TextInput
                            style={styles.textIn}
                            onChangeText={ML => this.setState({ ML: ML })}
                            value={ML}
                            placeholder="Maximum Loss"
                            placeholderTextColor="red"
                            textAlign="center"
                            keyboardType="numeric"
                            />
                            <TextInput
                            style={styles.textIn}
                            onChangeText={SL => this.setState({ SL: SL })}
                            value={SL}
                            placeholder="Stop Loss"
                            placeholderTextColor="red"
                            textAlign="center"
                            keyboardType="numeric"
                            />
                        </View>
                        <View>
                            <TouchableOpacity
                            style={styles.confirmButtons}
                            onPress={this.LSwlHandler}
                            >
                            <Text style={{ color:"black", textAlign: "center"}}>Lot Size</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>

                    <Text style={{backgroundColor: "white", borderColor: "black", borderRadius: 300, width: '9%', elevation: 10, shadowColor: 'black', shadowOffset: { width: 4, height: 4 }, shadowOpacity: 0.6, shadowRadius: 2, height: 30, marginBottom: 5, marginTop: 5, marginLeft: '45%', padding: '1%', textAlign:'center', color: 'black'}}>or</Text>

                    <ScrollView style={{backgroundColor: "white"}}>
                        <View style={styles.divViews}>
                            <TextInput
                            style={styles.textIn}
                            onChangeText={EP => this.setState({ EP: EP })}
                            value={EP}
                            placeholder="Entry point"
                            placeholderTextColor="blue"
                            textAlign="center"
                            keyboardType="numeric"
                            />
                            <TextInput
                            style={styles.textIn}
                            onChangeText={MP => this.setState({ MP: MP })}
                            value={MP}
                            placeholder="Maximum Profit"
                            placeholderTextColor="green"
                            textAlign="center"
                            keyboardType="numeric"
                            />
                            <TextInput
                            style={styles.textIn}
                            onChangeText={TP => this.setState({ TP: TP })}
                            value={TP}
                            placeholder="Take Profit"
                            placeholderTextColor="green"
                            textAlign="center"
                            keyboardType="numeric"
                            />
                        </View>
                        <View>
                            <TouchableOpacity
                            style={styles.confirmButtons}
                            onPress={this.LSwpHandler}
                            >
                            <Text style={{ color:"black", textAlign: "center"}}>Lot Size</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
                :
                    <ScrollView style={{backgroundColor: "white"}}>
                        <View>
                            
                        </View>
                    </ScrollView>
                }

                <Text>{"\n"}</Text>
                <Text>{"\n"}</Text>
                <Text>{"\n"}</Text>
                <Text>{"\n"}</Text>

                <View style={{ marginBottom: 0, position: 'fixed', width: '100%' }}>
                    <TouchableOpacity
                    style={styles.confirmButtons}
                    onPress={this.onShare}
                    >
                    <Text style={{ color:"black", textAlign: "center"}}>Share trade</Text>
                    </TouchableOpacity>
                </View>
                {/* <View style={{ marginBottom: 0, position: 'fixed', width: '100%' }}>
                    <TouchableOpacity
                    style={styles.confirmButtons}
                    onPress={this.speak}
                    >
                    <Text style={{ color:"black", textAlign: "center"}}>Share trade</Text>
                    </TouchableOpacity>
                </View> */}

                <Text>{"\n"}</Text>
                <Text>{"\n"}</Text>
                <Text>{"\n"}</Text>
                <Text>{"\n"}</Text>

                <AdMobBanner
                bannerSize="fullBanner"
                adUnitID="ca-app-pub-6275312492939393/5489650110" // Test ID, Replace with your-admob-unit-id
                servePersonalizedAds // true or false
                onDidFailToReceiveAdWithError={this.bannerError} />

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={MV}
                    onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    }}>
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{MM}</Text>

                        <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: 'black' }}
                        onPress={
                            this.setMV}>
                        <Text style={styles.textStyle}>Close</Text>
                        </TouchableHighlight>
                    </View>
                    </View>
                </Modal>

            </View>
        </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    
    mainButtons: {
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 1,
        color: "black",
        borderRadius: 300,
        // borderTopLeftRadius: 60,
        // paddingLeft: 30,
        paddingTop: 13,
        marginTop: 10,
        marginBottom: 5,
        marginLeft: '10%',
        width: '80%',
        height: 50,
        shadowColor: 'black',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 2,  
        elevation: 10,
    },

    mainButtonsShadow: {
        shadowColor: 'black',
        shadowOffset: { width: 4, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 20,
    },

    confirmButtons: {
        backgroundColor: "white",
        borderColor: "black",
        borderRadius: 300,
        borderWidth: 1,
        // borderTopLeftRadius: 60,
        // paddingLeft: 30,
        paddingTop: 10,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: '25%',
        width: '50%',
        height: 40,
        shadowColor: 'black',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 2,  
        elevation: 10,
    },

    divViews: {
        flexDirection:'row',
        alignItems:'center',
        width: '100%',
        // alignContent: 'center',
        // alignItems: 'center',
        // alignSelf: 'center'
    },

    textIn: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '25%',
        flex:1,
        flexDirection:'row',
        borderRadius: 10,
        marginLeft: '0.2%',
        marginRight: '0.2%',
        marginTop: 10,
        marginBottom: 5,
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },

});