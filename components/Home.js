import React, { Component } from 'react'
import axios from 'axios'

import moment from "moment";

import styles from "./style";

import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';


import { ActivityIndicator, Image, Button, View, SafeAreaView, FlatList, StatusBar, ScrollView, StyleSheet, Text, Keyboard, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView } from 'react-native';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
  } from 'expo-ads-admob';
import { ThemeConsumer } from 'react-native-elements';

// import { Tile } from 'react-native-elements';
// import AnimatedLoader from 'react-native-animated-loader';
// import LottieView from "lottie-react-native";
// import { Table, TableWrapper, Row, Rows, Cell } from 'react-native-table-component';

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

export default class Home extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
            id: '',
            journal: '',
            newjournal: '',
            journals: [],
            auth: null,
            user_id: '',
            user_name: '',
            loading: true,
            loadingMore: false,
            refreshing: false,
            page: 1
        }
      }
    
      changeHandler = e => {
        // this.setState({[e.target.name]: e.target.value})
        this.setState({ [e.target.name]: e.target.value })
      }
    
      handleChange = (value)=>{
        value.persist();
        this.setState({journal: value.nativeEvent.text})
    }

    fetchData = () => {
        axios
            .get('https://riskmgtapi.herokuapp.com/api/auth?page='+this.state.page, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+this.state.auth,
                }
            })
            .then(response => {
                console.log(this.state)
                console.log("All responses from journals data")
                console.log(response)
                console.log("All journals")
                console.log(response.data.journals.data)
                console.log(response.data.user)
                // this.setState({ journals: response.data.journals.data })
                this.setState({ journals: [...this.state.journals, ...response.data.journals.data] })
                this.setState({ loadingMore: false })
                this.setState({ refreshing: false })
                // this.setState({ user: response.data.user })
                // this.setState({ user_id: response.data.user.id })
                // this.setState({ user_name: response.data.user.name })
            })
            .catch(error => {
                console.log("Error from journals data")
                console.log(error)
                this.setState({ loadingMore: false })
                this.setState({ refreshing: false })
                Alert.alert('Please login to view your journals');
                this.setState({errorMsg: 'Error retrieving data'})
            })
    }

    handleLoadMore = () => {
        this.setState(
          (prevState, nextProps) => ({
            page: prevState.page + 1,
            loadingMore: true
          }),
          () => {
            this.fetchData();
            this.setState({ loadingMore: false })
          }
        );
      };

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
        
        axios
            .get('https://riskmgtapi.herokuapp.com/api/auth', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+this.state.auth,
                }
            })
            .then(response => {
                console.log(this.state)
                console.log("All responses from journals data")
                console.log(response)
                console.log("All journals")
                console.log(response.data.journals.data)
                console.log(response.data.user)
                this.setState({ journals: response.data.journals.data })
                // this.setState({ user: response.data.user })
                this.setState({ loading: false })
                Alert.alert('Your data is kept private and encrypted. Only you can see your journals');
                // this.setState({ user_name: response.data.user.name })
            })
            .catch(error => {
                console.log("Error from journals data")
                console.log(error)
                Alert.alert('Please login to view your journals');
                this.setState({errorMsg: 'Error retrieving data'})
            })
        
      })
      .catch(err => {
        // any exception including data not found
        // goes to catch()
        console.warn(err.message);
        switch (err.name) {
          case 'NotFoundError':
            Alert.alert('Please login');
            break;
          case 'ExpiredError':
            Alert.alert('Your session has expired, please login again');
            break;
        }
        this.props.navigation.navigate('Auth')
      });

    //   axios
    //         .get('https://riskmgtapi.herokuapp.com/api/auth', {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': 'Bearer '+this.state.auth,
    //             }
    //         })
    //         .then(response => {
    //             console.log(this.state)
    //             console.log("All responses from journals data")
    //             console.log(response)
    //             console.log("All journals")
    //             // console.log(response.data.journals.data)
    //             // console.log(response.data.user)
    //             // this.setState({ journals: response.data.journals.data })
    //             // this.setState({ user: response.data.user })
    //             this.setState({ loading: false })
    //             // this.setState({ user_name: response.data.user.name })
    //         })
    //         .catch(error => {
    //             console.log("Error from journals data")
    //             console.log(error)
    //             this.setState({errorMsg: 'Error retrieving data'})
    //         })
      }

      componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

      addJournal = () => {
        
        this.setState({ loading: true })
        console.log("All states");
        console.log(this.state);
        if(this.state.auth){
        axios
            .post('https://riskmgtapi.herokuapp.com/api/auth/storejournal', this.state,
            {
               
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+this.state.auth,
                }
            })
            .then(response => {
                console.log("All responses from add journal")
                console.log(response)
                console.log("Journal data");
                console.log(response.data);
                // this.setState({ newjournal: response.data })
                this.setState({ journal: '' })
                this.setState({ journals: [response.data, ...this.state.journals] })
                Alert.alert('Journal added successfully');
            })
            .catch(error => {
                console.log("Error from add journal")
                console.log(error)
                this.setState({errorMsg: 'Error retrieving data'})
                this.setState({ loading: false })
                Alert.alert('Error adding journal, please try again');
            })
        }else{
          Alert.alert('You need to login to add your journal');
        }
    }

    _renderFooter = () => {
        if (!this.state.loadingMore) return null;
    
        return (
          <View
            style={{
              position: 'relative',
              width: 10,
              left: 40,
              alignContent: 'center',
              height: 10,
              padding: 20,
              margin: 10,
              borderColor: 'grey'
            }}
          >
            <ActivityIndicator animating size="small" />
          </View>
        );
      };

      _handleRefresh = () => {
        this.setState(
          {
            page: 1,
            refreshing: true,
            journals: ''
          },
          () => {
            this.fetchData();
          }
        );
      };
    
      render() {
        const { id, journal, journals, newjournal, user_id, user_name, loading } = this.state

        //Comparer Function  
        function GetSortOrder(prop) {  
            return function(a, b) {  
                if (a[prop] > b[prop]) {  
                    return 1;  
                } else if (a[prop] < b[prop]) {  
                    return -1;  
                }  
                return 0;  
            }  
        }

        const Item = ({ title, time }) => (
            <View style={{padding: 10, margin: 10, backgroundColor: "white", borderRadius: 15, borderWidth: 2, borderColor: "grey", borderStyle: "dotted", opacity: 0.5}}>
              <Text style={{color: "#3897f1", textAlign: "left", margin: 10}}>{title}</Text>
              <Text style={{color: "black", textAlign: "right", fontSize: 8,}}>
                    {moment(time).fromNow()}
                </Text>
            </View>
          );

          const renderItem = ({ item, time }) => (
            <Item title={item.journal} time={item.created_at} />
          );

        return(
            
          
                <View style={{backgroundColor: "white"}}>
                    <View style={{backgroundColor: "black"}}>
                        <Text style={{ height: 15, marginTop: 10}}></Text>
                    </View>
                    {/* <View style={{backgroundColor: "black", borderColor: "black", borderWidth: 1, shadowColor: 'black', shadowOffset: { width: 4, height: 4 }, shadowOpacity: 0.6, shadowRadius: 2, elevation: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
                        <Image style={{width: 100, height: 40, borderRadius: 30, marginTop: 10, paddingBottom: 10}} source={require('./MgtMkt1.png')} />
                    </View> */}

                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                      <View>

                    <TextInput keyboardType="default" value={journal} placeholder="Type your journal" placeholderColor="#c4c3cb" style={styles.journalFormTextInput} onChange={this.handleChange} multiline={true} numberOfLines={5} returnKeyType="done" maxLength={300} />
            
                    <Button
                    buttonStyle={styles.journalButton}
                    onPress={() => this.addJournal()}
                    title="Post now"
                    />

                    <Text> {"\n"} </Text>
                    </View>
                    </TouchableWithoutFeedback>

                    <View style={{padding: 5, backgroundColor: "white"}}>
                        <Text style={{color: "#3897f1", textAlign: "center"}}>My journals</Text>
                    </View>
                    {journal?(
                    <View style={{padding: 10, margin: 10, backgroundColor: "white", borderRadius: 15, borderWidth: 2, borderColor: "grey", borderStyle: "dotted", opacity: 0.5}}>
                        <Text style={{color: "#3897f1", textAlign: "left"}}>
                            {journal}
                        </Text>
                        <Text style={{color: "black", textAlign: "right", fontSize: 8,}}>
                            now
                        </Text>   
                    </View>
                    ):(
                    <View>

                    </View>
                    )}

                    {/* <View> */}
                        <FlatList
                            data={journals}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            onEndReached={this.handleLoadMore}
                            onEndReachedThreshold={0.1}
                            initialNumToRender={10}
                            ListFooterComponent={this._renderFooter}
                            onRefresh={this._handleRefresh}
                            refreshing={this.state.refreshing}
                        />
                    {/* </View> */}

			    {/* <ScrollView>
                   
                <Text> {"\n"} </Text>
                    <View style={{padding: 5, backgroundColor: "white"}}>
                        <Text style={{color: "#3897f1", textAlign: "center"}}>JOURNALS</Text>
                    </View>
                    {journal?(
                    <View style={{padding: 10, margin: 10, backgroundColor: "white", borderRadius: 15, borderWidth: 2, borderColor: "grey", borderStyle: "dotted", opacity: 0.5}}>
                        <Text style={{color: "#3897f1", textAlign: "left"}}>
                            {journal}
                        </Text>
                        <Text style={{color: "black", textAlign: "right", fontSize: 8,}}>
                            now
                        </Text>   
                    </View>
                    ):(
                        <View>

                        </View>
                    )}
                    {journals.map(journal=>
                        <View key={journal.id} style={{padding: 10, margin: 10, backgroundColor: "white", borderRadius: 15, borderWidth: 2, borderColor: "grey", borderStyle: "dotted", opacity: 0.5}}>
                            <Text style={{color: "#3897f1", textAlign: "left", margin: 10}}>
                                {journal.journal}
                            </Text>
                            <Text style={{color: "black", textAlign: "right", fontSize: 8,}}>
                                {moment(journal.created_at).fromNow()}
                            </Text>   
                        </View>
                        
                    )}
                        <Text> {"\n"} {"\n"} {"\n"} {"\n"} {"\n"} {"\n"} {"\n"} {"\n"} </Text>
					</ScrollView> */}
                    <AdMobBanner
                bannerSize="fullBanner"
                adUnitID="ca-app-pub-6275312492939393/5489650110" // Test ID, Replace with your-admob-unit-id
                servePersonalizedAds // true or false
                onDidFailToReceiveAdWithError={this.bannerError} />

                <Text> {"\n"} {"\n"} {"\n"} {"\n"} {"\n"} {"\n"} {"\n"} {"\n"} </Text>
                    
                </View>
              
               
        )
    }
}
