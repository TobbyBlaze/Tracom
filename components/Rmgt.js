import React, { Component } from 'react'

import { Image, Share, Alert, Modal, TouchableWithoutFeedback, Keyboard, TextInput, TouchableOpacity, TouchableHighlight, StyleSheet, View, ScrollView, Text } from 'react-native';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
  } from 'expo-ads-admob';
// import * as Speech from 'expo-speech';
// import * as Notifications from 'expo-notifications';


export default class rmgt extends Component{

    constructor(props){
        super(props);

        this.state = {
           
            rmgt: [],
            LS: null, //Lot Size
            AB: null, //Account Balance
            FM: null, //Free Margin
            RPT: null, //Risk per trade
            RP: null, //Risk percentage
            PAR: null, //Pips at risk
            PL: null, //Potential Loss
            PP: null, //Potential Profit
            ML: null, //Maximum Loss
            MP: null, //Maximum Profit
            E: null, //Equity
            MLP: null, //Margin Level Percentage
            TT: null, //Trade Type, Sell or Buy
            RW: false, //Risk Window
            RB: true, //Risk Button
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

    // speak = () => {
    //     const thingToSay = '1';
    //     Speech.speak(thingToSay);
    //   };

    setMV = () => {
        this.setState({
            MV: false
        });
        // console.log("Close modal")
    }

    RPTHandler = e => {
        e.preventDefault();

        // var countDecimals = function (value) {
        //     if(Math.floor(value) === value) return 0;
        //     return value.toString().split(".")[1].length || 0;
        // }

        let lots = parseFloat(this.state.LS); //Lot size
        let pipsRisk = parseFloat(this.state.PAR); //Pips at risk
        let account = parseFloat(this.state.AB); //Account balance

        let risk; //Risk per trade
        risk = lots * pipsRisk * 10;
        let rp; //Risk percentage
        rp = (risk/account) * 100;


        if(risk > 0 && rp > 0){

            risk = parseFloat(Math.round((risk + Number.EPSILON) * 100) / 100);
            rp = parseFloat(Math.round((rp + Number.EPSILON) * 100) / 100);
            
            this.setState({
                RPT: risk
            });
            // this.setState({
            //     RP: rp
            // });
            this.setState({
                MV: true
            });
            this.setState({
                MM: "Your risk per trade is "+ risk +" which is "+ rp +"% of your account balance."
            });
            
        }else{
            this.setState({
                MV: true
            });
            this.setState({
                MM: "Invalid! PLease check your inputs."
            });
            
        }
    }



    LSHandler = e => { //Lot size handler
        e.preventDefault();

        let rp = parseFloat(this.state.RP); //Risk percentage
        let account = parseFloat(this.state.AB); //Account balance
        let pipsRisk = parseFloat(this.state.PAR); //Pips at risk

        let risk = (rp/100) * account;
        let lots = risk / (pipsRisk * 100)

        if(risk > 0 && lots > 0){
            if(lots >= 0.01){
                risk = parseFloat(Math.round((risk + Number.EPSILON) * 100) / 100);
                lots = parseFloat(Math.round((lots + Number.EPSILON) * 100) / 100);
                this.setState({
                    RPT: risk
                });
                // this.setState({
                //     LS: lots
                // });
                this.setState({
                    MV: true
                });
                this.setState({
                    MM: "You should use a lot size of "+ lots +" and it will cost you "+ risk +" out of your account balance"
                });
            }else{
                this.setState({
                    MV: true
                });
                this.setState({
                    MM: "Your lot size will be less than 0.01"
                });
            }
            
        }else{
            this.setState({
                MV: true
            });
            this.setState({
                MM: "Invalid! Please check your inputs"
            });
        }
    }

    // onShare = async () => {
    //     try {
    //       const result = await Share.share({
    //         message:
    //           'Entry point: '+ this.state.EP+', Take profit: '+ this.state.TP+', Stop loss: '+ this.state.SL+'. '
    //       });
    
    //       if (result.action === Share.sharedAction) {
    //         if (result.activityType) {
    //           // shared with activity type of result.activityType
    //         } else {
    //           // shared
    //         }
    //       } else if (result.action === Share.dismissedAction) {
    //         // dismissed
    //       }
    //     } catch (error) {
    //       alert(error.message);
    //     }
    //   };

    render(){
        const { LS, AB, FM, RPT, RP, RW, RB, PAR, LSW, LSB, MV, MM } = this.state

        return(
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{backgroundColor: "white"}}>
                <View style={{backgroundColor: "black"}}>
                    <Text style={{ height: 15, marginTop: 10}}></Text>
                </View>
                {/* <View style={{backgroundColor: "black", borderColor: "black", borderWidth: 1, shadowColor: 'black', shadowOffset: { width: 4, height: 4 }, shadowOpacity: 0.6, shadowRadius: 2, elevation: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
                    <Image style={{width: 100, height: 40, borderRadius: 30, marginTop: 10, paddingBottom: 10}} source={require('./MgtMkt1.png')} />
                </View> */}

                <Text>{"\n"}</Text>
                <Text>{"\n"}</Text>
                <Text>{"\n"}</Text>


                {RB?
                <View>
                    <TouchableOpacity
                    style={styles.mainButtons}
                    onPress={() => this.setState({ RW: RW ? false : true, LSB: RW ?true : false }) }
                    // onPress={() => this.setState({ PLW: PLW ? false : true }) }
                    >
                    <Text style={{ color:"black", textAlign: "center"}}>CHECK RISK PER TRADE</Text>
                    </TouchableOpacity>
                </View>
                :
                <View>
                    
                </View>
                }
                {RW?
                    <ScrollView style={{backgroundColor: "white"}}>
                        <View style={styles.divViews}>
                            <TextInput
                            style={styles.textIn}
                            onChangeText={LS => this.setState({ LS: LS })}
                            value={LS}
                            placeholder="Lot size"
                            placeholderTextColor="black"
                            textAlign="center"
                            keyboardType="numeric"
                            />
                            <TextInput
                            style={styles.textIn}
                            onChangeText={PAR => this.setState({ PAR: PAR })}
                            value={PAR}
                            placeholder="Pips at risk"
                            placeholderTextColor="black"
                            textAlign="center"
                            keyboardType="numeric"
                            />
                            <TextInput
                            style={styles.textIn}
                            onChangeText={AB => this.setState({ AB: AB })}
                            value={AB}
                            placeholder="Account balance"
                            placeholderTextColor="black"
                            textAlign="center"
                            keyboardType="numeric"
                            />
                        </View>
                        <View>
                            <TouchableOpacity
                            style={styles.confirmButtons}
                            onPress={this.RPTHandler}
                            >
                            <Text style={{ color:"black", textAlign: "center"}}>Show</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                :
                    <ScrollView style={{backgroundColor: "white"}}>
                        <View>
                            
                        </View>
                    </ScrollView>
                }

                <Text>{"\n"}</Text>
                <Text>{"\n"}</Text>

                {LSB?
                <View>
                    <TouchableOpacity
                    style={styles.mainButtons}
                    // style={{backgroundColor: "red"}}
                    onPress={() => this.setState({ LSW: LSW ? false : true, RB: LSW ?true : false }) }
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
                            onChangeText={RP => this.setState({ RP: RP })}
                            value={RP}
                            placeholder="Risk percentage"
                            placeholderTextColor="black"
                            textAlign="center"
                            keyboardType="numeric"
                            />
                            <TextInput
                            style={styles.textIn}
                            onChangeText={PAR => this.setState({ PAR: PAR })}
                            value={PAR}
                            placeholder="Pips at risk"
                            placeholderTextColor="black"
                            textAlign="center"
                            keyboardType="numeric"
                            />
                            <TextInput
                            style={styles.textIn}
                            onChangeText={AB => this.setState({ AB: AB })}
                            value={AB}
                            placeholder="Account balance"
                            placeholderTextColor="black"
                            textAlign="center"
                            keyboardType="numeric"
                            />
                        </View>
                        <View>
                            <TouchableOpacity
                            style={styles.confirmButtons}
                            onPress={this.LSHandler}
                            >
                            <Text style={{ color:"black", textAlign: "center"}}>Show</Text>
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

                {/* <View style={{ marginBottom: 0, position: 'fixed', width: '100%' }}>
                    <TouchableOpacity
                    style={styles.confirmButtons}
                    onPress={this.onShare}
                    >
                    <Text style={{ color:"black", textAlign: "center"}}>Share trade</Text>
                    </TouchableOpacity>
                </View> */}
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

                <Text>{"\n"}</Text>
                <Text>{"\n"}</Text>
                <Text>{"\n"}</Text>
                <Text>{"\n"}</Text>

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