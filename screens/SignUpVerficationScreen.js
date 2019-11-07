import React, { Component } from 'react';
import { View, Text, Dimensions, ImageBackground, Image, TouchableOpacity,AsyncStorage,I18nManager ,TextInput,Platform} from 'react-native';
import styles from '../css/styles';
import {
    Container,
    Header,
    Title,
    Content,
  Icon,
    Left,Button,Right,
    Body,
  StyleProvider
  } from "native-base";
  import getTheme from '../native-base-theme/components';
  import variables from '../native-base-theme/variables/variables';
  import { showMessage, hideMessage } from "react-native-flash-message";

import { Font, AppLoading, SplashScreen, Notifications } from 'expo';
import { Localization } from 'expo-localization';
import Expo from 'expo';

// import i18n from '../config/i18n';

import i18n from 'i18n-js';
import client from '../api/constant';

const en = {
    signup: 'SIGN UP',
    verificationCode:'Verification Code',
    verify: 'VERIFY',
    verfmessage:'Your verification code sent for your email address'
   
};
const ar = {
    signup: 'إنشاء حساب',
    verificationCode:'رمز التأكيد',
    verify: 'تأكيد',
    verfmessage:'تم ارسال رمز التأكيدالى بريدك الالكتروني'




};

const { passwordInputStyle, btnImage, visibilityBtn, mainLoginContainer, secondContainerInLogin, emailInputStyle, forgetPassCreateAccountContainer, logiSocailMediaContainer, orContainer, viewInsideOrStyle, loginTextStyleInLoginTab
    , orTextStyle, facebookContainer, loginTouchable, facebookTouchable, socailIconStyle, spaceBtweenSocailIcons, loginWithGoogleTouchable
,forgetPasswordText,creatAccountText ,facebookContairInLogin} = styles

export default class SignUpVerficationScreen extends Component {

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
            userID:'',
            userEmail:'',
            verfCode:0,
            isRTL:false,
            verfCodeBottomLine:'#F5F5F5',
            myLang: AsyncStorage.getItem("myLang").then((value) => {
                this.setState({ "myLang": value })
            }).done()
            ,
        }
    }


    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('userEmail');
          if (value !== null) {
            // We have data!!
            this.setState({userEmail:value})
          


           
          }
        } catch (error) {
          // Error retrieving data
          console.log('getstorageitemerrrror',error);
        }
        
      };
    async componentWillMount() {
        this._retrieveData()

    
    }
    async  componentDidMount() {
        this._retrieveData()

    //   SplashScreen.preventAutoHide();
    
    
    
   
    
    
    }
    _storeData = async (userID,userName,userPhone,userPassword,email) => {
        // save the lang in storage
        await AsyncStorage.setItem("userID", userID+'');
        await AsyncStorage.setItem("userName", userName+''); 
        await AsyncStorage.setItem("userPhone", userPhone+'');
        await AsyncStorage.setItem("userPassword", userPassword+'');
        await AsyncStorage.setItem("userEmail", email+'');

        

      
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
        this.props.navigation.navigate('ProfileScreen',{
            loginTab:2
        })
    }
    onSignupPreesd() {

        this.signupBG();
        this.props.navigation.navigate('ProfileScreen')

    }

    _handlePress = async () => {
        // save the lang in storage
// if(this.state.username==''|| this.state.password=='' || this.state.email==''|| this.state.confirmPass=='' || this.state.checked==false|| (this.state.confirmPass != this.state.password) ){
//     showMessage({
//         message: "something went wrong",
//         type: "danger",
//       });

        
// }else{
    if(this.state.verfCode.length>0){
        this.setState({verfCodeBottomLine:'#F5F5F5'})
       
    
        client.post(`/verifyemail?email=${this.state.userEmail}&code=${this.state.verfCode}`).then((res) => {
        
if(res.data.message==='Verified Done'){
    // this._storeData(res.data.data[0].customers_id,res.data.data[0].customers_firstname,
    //     res.data.data[0].customers_telephone,this.state.password, res.data.data[0].email
    //     )
    this.props.navigation.navigate('ProfileScreen',{
        loginTab:2
    })

    showMessage({
        message: res.data.message,
        type: "success",
      });


}else{
    showMessage({
        message: res.data.message,
        type: "danger",
      });
}
        })

  
     } else{
this.setState({verfCodeBottomLine:'red'})
    }
    }
    render() {
        i18n.fallbacks = true;
        i18n.translations = { ar, en };
     

        i18n.locale = I18nManager.isRTL?'ar':'en';

     

        return (
<StyleProvider style={getTheme(variables)}>
      <Container >
     
       <Header style={{height:99,backgroundColor:'#8FCFEB'}}>
         <Left style={{width:40}}>
            <Button style={{height:99,width:50}} transparent onPress={() => this.props.navigation.goBack()}>
            <Icon  style={{  transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],}}
             name={
        Platform.OS === 'ios'
          ? `ios-arrow-back`
          : 'arrow-back'
      }  />
                  </Button>
          </Left>
        <Body style={styles.header}>
              <Title style={[styles.header,{fontSize:25,width:Dimensions.get('window').width/2,fontFamily:'Acens',marginLeft:-10,color:'white'}]}>{i18n.t('signup')}</Title>
            </Body>
        </Header> 

            <View style={mainLoginContainer}>

            <View style={secondContainerInLogin}>
<View style={{height:20}}/>
<Text
                   
                   style={{ 
                    marginTop:7,
                    marginBottom:3,
                      width:Dimensions.get('window').width/1.05,
                      alignItems:'center',
                      borderBottomColor:'#F5F5F5',
                      fontSize: 15,fontFamily: "newFont",
                fontWeight: "normal",
                fontStyle: "normal",
              //   lineHeight: 11,
                letterSpacing: 0,
                color: "#191919"}} >{i18n.t('verfmessage')}</Text>
                {/* <View style={{height:10}}/> */}
                <TextInput 
                  onChangeText={(text) => this.setState({verfCode:text})}
                placeholderTextColor='#777777' placeholder={i18n.t('verificationCode')} style={[emailInputStyle,{marginTop:20,borderWidth:1,borderColor:this.state.verfCodeBottomLine}]}>

                </TextInput>
                <View style={{height:20}}/>

                <View style={{width:Dimensions.get('window').width,justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity
                       onPress={() =>{ this._handlePress()}}
                    style={loginTouchable}
                   >
                        <Text style={loginTextStyleInLoginTab}>{i18n.t('verify')}</Text>
                    </TouchableOpacity>
                    </View>
               

              </View>
        </View>
</Container>
</StyleProvider>

        );
    }



}
