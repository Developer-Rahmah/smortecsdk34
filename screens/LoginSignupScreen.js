import React, { Component } from 'react';
import { View, Text, Dimensions, ImageBackground, Image, TouchableOpacity,AsyncStorage,I18nManager,Platform,Alert,BackHandler,TouchableHighlight } from 'react-native';
import styles from '../css/styles';
import { Updates } from 'expo';

// import { AppLoading, Asset, Font, Icon,SplashScreen,Permissions, Notifications,Constants } from 'expo';
import * as Permissions from 'expo-permissions';


import { Font, AppLoading, SplashScreen, Notifications,Constants } from 'expo';
import { Localization } from 'expo-localization';
import Expo from 'expo';
import {
  Content, 
  Container,
  Header,
  Card,
  Right,
  Left,
  Button,
  CardItem,
  Icon,
  Body,
  Title,
  StyleProvider} from 'native-base';

import i18n from 'i18n-js';
// import Content from '../native-base-theme/components/Content';
const { width, height } = Dimensions.get('window')

const en = {
    signup: 'SIGN UP',
    login: 'LOG IN',
    chooselanguage:"Choose Lnaguage"

};
const ar = {
    signup: 'إنشاء حساب',
    login: 'تسجيل الدخول',
   




};

const { mainScreenMainContainer, mainScreenLoginSignupContainer,loginContainer ,loginTextStyle,signUpContainer,signUpTextStyle,logoContainer,mainView,imageLogo,logoStyle} = styles
export default class LoginSignupScreen extends Component {

    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            loginBg: 'white',
            signupBG: 'white',
            signupFontColor: '#8FCFEB',
            loginFontColor: '#8FCFEB',
            loading: true,
            isReady: false,
            isSplashReady: false,
            myLang: 'en',
            switchOn:true,
            isRTL:false
        }
    }
    async  registerForPushNotificationsAsync() {
        const { status: existingStatus } = await Permissions.getAsync(
          Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;
      
        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
          // Android remote notification permissions are granted during the app
          // install, so this will only ask on iOS
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          finalStatus = status;
        }
      
        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
          return;
        }
      
        // Get the token that uniquely identifies this device
        let token = await Notifications.getExpoPushTokenAsync();
        // let platform=Constants.platform
        await AsyncStorage.setItem("deviceToken", token+'');
       
      
        // POST the token to your backend server from where you can retrieve it to send push notifications.
        // this.setState({token:token})
       
        
      }
      handleBackButton = () => {
        if (this.props.isFocused) {
          Alert.alert(
            'Exit App',
            'Exiting the application?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
              },
              {
                text: 'OK',
                onPress: () => BackHandler.exitApp()
              }
            ],
            {
              cancelable: false
            }
          );
          return true;
        }
      };
      
      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
      }
      _onChangeDirection = async (lang) => {
        console.log("langgggggg",lang)
        // save the lang in storage
        await AsyncStorage.setItem("myLang", lang);
    
        this.setState({ "myLang": lang });
    
        I18nManager.forceRTL(lang === "ar");
    
        // this.setState({ isRTL: lang === "ar" });
    
        // i18n.locale = this.state.myLang;
        i18n.locale=I18nManager.isRTL?'ar':'en'
    
        // Updates.reloadFromCache();
        try {
        //   await AsyncStorage.setItem('@MySuperStore:key', JSON.stringify(this.props.Order)); 
            Updates.reloadFromCache();
  
        } catch (error) {
          // Error saving data
          console.log('errror in saving cart arrrrr',error)
        }
    }
    _retrieveData = async () => {
        try {
            const token = await AsyncStorage.getItem("deviceToken");
            const platform = await AsyncStorage.getItem("devicePlatform");

   
            if(Platform.OS === 'ios') {
                console.log(" ios") 
             } else {
                   console.log("android") 
            } 
          const value = await AsyncStorage.getItem('userID');
          const namevalue =  await AsyncStorage.getItem("userName"); 
          const phonevalue = await AsyncStorage.getItem("userPhone");
          const passwvalue = await AsyncStorage.getItem("userPassword");
          const myLang = await AsyncStorage.getItem("myLang")
          const switchOn= await AsyncStorage.getItem("switchOn");
          const myArray = await AsyncStorage.getItem('orderArr');
          if(switchOn !==null){
this.setState({switchOn:switchOn})
          }
          if(myLang !== null){
            this.setState({ myLang: myLang });

            I18nManager.forceRTL(myLang === "ar");
    
            this.setState({ isRTL: myLang === "ar" });
    
            i18n.locale = this.state.myLang;
          
          }else{
          
              await AsyncStorage.setItem("myLang", "en");
              I18nManager.forceRTL(false);
         
            }
          
  
          if (value !== null) {
        

             this.props.navigation.navigate('Home')
          }
        } catch (error) {
          // Error retrieving data
        }
    
      };
    async componentWillMount() {
        if(Platform.OS === 'ios') {
            console.log(" ios") 
            await AsyncStorage.setItem("devicePlatform",'ios');
         } else {
               console.log("android") 
               await AsyncStorage.setItem("devicePlatform",'android');
        } 
        
        this.registerForPushNotificationsAsync();
        if(this.state.myLang=="ar"){
            I18nManager.forceRTL(true);

           
    
            i18n.locale = this.state.myLang;
        }
    //    this._retrieveData()
        this.setState({ loading: false });
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    }
    async  componentDidMount() {
      SplashScreen.preventAutoHide();
    
    
    
      
    
    
    }
   
    loginBG() {
        this.setState({

            loginBg: '#8FCFEB',
            signupBG: 'white',
            loginFontColor: 'white',
            signupFontColor: '#8FCFEB'
        });
    }
    signupBG() {
        this.setState({
            signupBG: '#8FCFEB',
            loginBg: 'white',
            signupFontColor: 'white',
            loginFontColor: '#8FCFEB'
        });
    }
    onLoginPreesd() {
        this.loginBG();
        this.props.navigation.navigate('LoginScreen',{
            loginTab:2
        })
    }
    onSignupPreesd() {
        this.signupBG();
        this.props.navigation.navigate('SignUpScreen')

    }


    render() {
        i18n.fallbacks = true;
        i18n.translations = { ar, en };
        //i18n.locale =null;

        i18n.locale = this.state.myLang;

    //      if (!this.state.isReady) {


    //         return (
    //             <View style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width,backgroundColor:'white' }}>
      
    //                 <View style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width, justifyContent: 'center', alignItems: 'center', }}
    //                     >
    //                     <View style={{ height: Dimensions.get('window').height / 5,flexDirection:'column' }}>
    //                     </View>
      
    //                     <Image
    //                         source={require('../assets/images/smorteclogo.png')}
    //                         style={{
    //                             width: Dimensions.get('window').width/1.5,
    //                             height: Dimensions.get('window').width/2.5, paddingTop: 2,
    //                             // resizeMode: 'contain'
    //                         }}
    //                         onLoad={this._cacheResourcesAsync}
    //                     />
    //                     <View style={{ height: Dimensions.get('window').height / 2.5 ,flexDirection:'column'}}>
    //   <Text style={{fontSize:30,fontFamily:'Acens',color:'#8FCFEB',textAlign:'center'}}>SMORTEC</Text>
    //   <Text style={{fontSize:30,fontFamily:'Acens',color:'gray',textAlign:'center'}}>We are the future</Text>

    //                     </View>
    //                     <Text style={{fontFamily:'Acens',color:'gray',textAlign:'center'}} >©SMORTEC 2019</Text>
      
    //                 </View>
      
    //             </View>
    //         );
    //      }
      
      
       

        return (
            <Content style={{backgroundColor:'white'}}>

            <View style={[mainScreenMainContainer,{backgroundColor:'white'}]}
                // source={require('../assets/images/background.png')}
                >
                <View style={mainView}>

                    <View style={[logoContainer,{}]}>

                    <Image
                        source={require('../assets/images/logo.png')}
                        style={{
                            resizeMode:'contain'
                            // width: Dimensions.get('window').width/1.5,
                            // height: Dimensions.get('window').width/2.5, paddingTop: 2,
                            
                        }}
                       
                    />
                      <View style={{ height: Dimensions.get('window').height / 6 ,flexDirection:'column'}}/>
                    {/* <Image
                        source={require('../assets/images/smorteclogo.png')}
                        style={{
                            width: Dimensions.get('window').width/1.5,
                            height: Dimensions.get('window').width/2.5, paddingTop: 2,
                            
                        }}
                       
                    />
                    <View style={{ height: Dimensions.get('window').height / 2.5 ,flexDirection:'column'}}>
  <Text style={{fontSize:30,fontFamily:'Acens',color:'#8FCFEB',textAlign:'center'}}>SMORTEC</Text>
  <Text style={{fontSize:30,fontFamily:'Acens',color:'gray',textAlign:'center'}}>We are the future</Text>
  
                    </View> */}
  

                    {/* <Image
                            source={require('../assets/images/smorteclogo.png')}
                            style={{
                                width: Dimensions.get('window').width/1.5,
                                height: Dimensions.get('window').width/2.5, paddingTop: 2,
                                // resizeMode: 'contain'
                            }}
                        />
                       
                        </View>
                        <View style={{ height: Dimensions.get('window').height / 20 ,flexDirection:'column'}}>
<Text style={{fontSize:30,fontFamily:'Acens',color:'#8FCFEB',textAlign:'center'}}>SMORTEC</Text>
<Text style={{fontSize:30,fontFamily:'Acens',color:'gray',textAlign:'center'}}>We are the future</Text> */}
            

            </View>
            <View style={{        flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: Dimensions.get('window').width /6
}}>
                          {I18nManager.isRTL?
                  <Text style={{ fontFamily: "Acens",
                  fontSize: 20,
                  fontWeight: "normal",
                  fontStyle: "normal",
                  lineHeight: 30,
                  letterSpacing: 0,
                  color: "#8FCFEB"  }}>اختر لغة</Text>
                  :
                  <Text style={{ fontFamily: "Acens",
                  fontSize: 20,
                  fontWeight: "normal",
                  fontStyle: "normal",
                  lineHeight: 30,
                  letterSpacing: 0,
                  color: "#8FCFEB" }}>Choose Language</Text>

                          }
                        </View>
            <View style={{	width: width * 0.80,
	alignSelf: 'center',
	flexDirection: 'row',
	justifyContent: 'space-between'}}>
              <TouchableHighlight
                info
                style={{	borderWidth: 1,
                  borderColor: "#8FCFEB",
                  backgroundColor:'transparent',
                  alignSelf:'center',
                  marginTop:height * 0.03,
                  borderRadius:7,
                   width: width *0.35,
                  height: height * 0.09,
                  justifyContent: 'center'}}
                  onPress={() => this._onChangeDirection("ar")}
              >
                <Text autoCapitalize="words" style={{
    fontFamily:'helivet',
	alignContent: 'center',
	color:"#8FCFEB",
	alignSelf: 'center',
	fontSize: 20}}>
                  عربي
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                info
                style={{	borderWidth: 1,
                  borderColor: "#8FCFEB",
                  backgroundColor:'transparent',
                  alignSelf:'center',
                  marginTop:height * 0.03,
                  borderRadius:7,
                   width: width *0.35,
                  height: height * 0.09,
                  justifyContent: 'center'}}
                  onPress={() => this._onChangeDirection("en")}
              >
                <Text autoCapitalize="words" style={{ fontFamily:'helivet',
	alignContent: 'center',
	color:"#8FCFEB",
	alignSelf: 'center',
	fontSize: 20}}>
                  English
                </Text>
              </TouchableHighlight>
            </View>
                    <View style={{        flexDirection: 'column', height: Dimensions.get('window').height / 3, width: Dimensions.get('window').width, justifyContent: 'flex-end', alignItems: 'center'
}}>
                        <TouchableOpacity

                            onPress={this.onLoginPreesd.bind(this)}
                            style={[loginContainer,{
                                // backgroundColor: this.state.loginBg
                                backgroundColor:'#8FCFEB'
                                }]}>

                            <Text style={[
                              
                               loginTextStyle, {
                                //    color: this.state.loginFontColor
                                color:'white',
                                fontFamily:'Acens'
                                },
                            ]}> {I18nManager.isRTL==false?'LOG IN':'تسجيل دخول'} </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.onSignupPreesd.bind(this)}
                            style={[signUpContainer,
                            { backgroundColor:'#8FCFEB'
                                //backgroundColor: this.state.signupBG,
                            }]}>

                            <Text style={[signUpTextStyle,{
                                 color:'white',  fontFamily:'Acens'
                                // color: this.state.signupFontColor,
                                }]}> {I18nManager.isRTL==false?'SIGN UP':'إنشاء حساب'}</Text>
                        </TouchableOpacity>


                    </View>

                   
                </View>
            </View>
</Content>

        );
    }



}
