import React, { Component } from 'react'

import { View, ScrollView, Text, Image } from 'react-native';

export default class About extends Component{

    render(){
        return(
            <View style={{backgroundColor: "white"}}>
                <View style={{backgroundColor: "white"}}>
                    <Text style={{ height: 15, marginTop: 10}}></Text>
                </View>
                <View style={{backgroundColor: "black", borderColor: "white", borderWidth: 1, shadowColor: 'black', shadowOffset: { width: 4, height: 4 }, shadowOpacity: 0.6, shadowRadius: 2, elevation: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
                    <Image style={{width: 100, height: 40, borderRadius: 30, marginTop: 10, paddingBottom: 10}} source={require('./MgtMkt1.png')} />
                </View>
                <ScrollView>

                    <View style={{backgroundColor: "smoke", color: "black"}}>
                        <Text style={{backgroundColor: "smoke", color: "black", margin: 10, fontSize: 20, fontWeight: 500, textAlign: "center", fontFamily: ''}}>About</Text>
                        <Text style={{backgroundColor: "smoke", color: "black", margin: 10, fontFamily: ''}}>
                            Tracom is a market risk management app intended to help manage the risks involved in trading.
                        </Text>
                        <Text style={{backgroundColor: "smoke", color: "black", margin: 10, fontFamily: ''}}>
                            Do you trade stocks, cryptocurrencies, forex, spot metals? Then Tracom is an app for you. You would want to know the potential loss or profit before placing a trade. This app can also help you achieve your target profit and give you all the risks involved.
                        </Text>
                    </View>

                    <ScrollView style={{margin: 10}}>
                        <Image style={{width: 150, height: 150, borderRadius: 30, marginLeft: 100}} source={require('./pic1.jpg')} />
                        <Text style={{textAlign: "center", fontWeight: 1000, fontFamily: ''}}>Muritala Tobi</Text>
                        <Text style={{textAlign: "center", fontFamily: ''}}>Full stack developer</Text>
                        <Text style={{textAlign: "center", fontFamily: ''}}>Data science enthusiast</Text>
                    </ScrollView>

            </ScrollView>
            </View>
        )
    }
}
