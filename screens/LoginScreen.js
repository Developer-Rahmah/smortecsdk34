
import React, { Component } from 'react';
import { Drawer, Container, Header, Left, Right, Icon, Body, Title, Content, Button, CheckBox, Segment,Card } from 'native-base';
import { Image, View, Dimensions, I18nManager, AsyncStorage, ScrollView, Platform, StyleSheet, Text, StatusBar, SafeAreaView, TextInput, TouchableOpacity,Modal,Alert } from 'react-native';
import styles from '../css/styles'
import client from '../api/constant';
import { Localization } from 'expo-localization';
// import Expo from 'expo';
import { Facebook } from 'expo';
import { Google } from 'expo';
import * as Expo from 'expo';
import {addItem} from '../actions/AddToOrder'
import { connect } from "react-redux";
import * as AddOrderAction from "../actions/AddToOrder";
import { withNavigationFocus } from 'react-navigation';
let BaseURL = 'https://smortec.com/';

let lang;
// import i18n from '../config/i18n';

import i18n from 'i18n-js';
const { width } = Dimensions.get('window');
const height = width * 0.8

import { showMessage, hideMessage } from "react-native-flash-message";
const en = {
    signup: 'SIGN UP',
    login: 'LOG IN',
    email:'EMAIL',
    password:'PASSWORD',
    forgetPassword:'Forget Your Password?',
    or:'OR',
    nameFB:'',
    idFB:'',
    key:'+962',
    userName:'USER NAME',
    password:'PASSWORD',
     phoneNumber:'PHONE NUMBER',
    forgetYourPass:'Forget Your Password?',
send:'SEND',
ifYouDontHavAccount:"If You Don't Have an Account,",
createNew:"Create New"

   
};
const ar = {
    userName:'اسم المستخدم',

    signup: 'إنشاء حساب',
    login: 'تسجيل الدخول',
    email:'البريد الالكتروني',
    password:'كلمة المرور',
    forgetPassword:'هل نسيت كلمة المرور؟',
    or:'او',
    // forgetYourPass:'هل نسيت كلمة المرور',
    send:'ارسال',
    phoneNumber:'رقم الهاتف', 
    key:'+٩٦٢',
    ifYouDontHavAccount:"لايوجد لديك حساب؟ ",
createNew:"انشاء حساب جديد"

       



};

const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 1;

const { passwordAndConfirmContainer, btnImage, visibilityBtn, mainLoginContainer, secondContainerInLogin, emailInputStyle, forgetPassCreateAccountContainer, logiSocailMediaContainer, orContainer, viewInsideOrStyle, loginTextStyleInLoginTab
    , orTextStyle, facebookContainer, loginTouchable, facebookTouchable, socailIconStyle, spaceBtweenSocailIcons, loginWithGoogleTouchable
,forgetPasswordText,creatAccountText ,facebookContairInLogin} = styles

class LoginScreen extends Component {

    static navigationOptions = {
        header: null,
    };
    constructor (props) {
        super(props);
        this.state = {
            devicePlatform:'',
            deviceToken:'',
            pharmacyNmaeBottomLine:'#F5F5F5',
            userNameP:'',
            userNamePBottomLine:'#F5F5F5',
                        pharmcyNmae:'t',

            phoneBottomLine:'#F5F5F5',
            phone:'', 
           userNameBottomLine:'#F5F5F5',
           passwordBottomLine:'#F5F5F5',
           signedIn: false,
           name: "",
           photoUrl: "",

            hidePassword: true,
            username: '',
            password: '',
            emailForfet:'',
            forgetPasswordModalVisibal: false,
            myLang: AsyncStorage.getItem("myLang").then((value) => {
                this.setState({ "myLang": value })
            }).done()
            ,

        };
    }
    async componentWillMount(){
        const token = await AsyncStorage.getItem("deviceToken");
        const platform = await AsyncStorage.getItem("devicePlatform");
        if(token !=null){
            this.setState({deviceToken:token,devicePlatform:platform}).bind(this);
        }
    }
    returnPhone(){
        if( I18nManager.isRTL){
         return(
             <View style={{flexDirection:'row',alignItems:'center',paddingStart:7}}>
               <TextInput textAlign={I18nManager.isRTL?'right':'left'}
                 onChangeText={(text) => this.setState({phone:text})}
                 placeholderTextColor='#777777' keyboardType='phone-pad' placeholder={i18n.t('phoneNumber')}  style={{ fontFamily:'newFont', 
                 fontSize: 13,fontFamily:'Acens',
             fontWeight: "normal",
             fontStyle: "normal",
             paddingStart:0,
             letterSpacing: 0,
             width:Dimensions.get('window').width/1.4,
             color: "#777777"
             }} />
             <Text style={{width:40, fontSize: 13,fontFamily:'Acens',
             fontWeight: "normal",marginLeft:10,
             fontStyle: "normal",backgroundColor:'#F5F5F5',
             color: "#777777"}}>{i18n.t('key')} </Text>
                
 </View>
         )}
         else{
             return(
                 <View style={{flexDirection:'row',alignItems:'center',paddingStart:7}}>
                  
                 <Text style={{width:40, fontSize: 13,fontFamily:'Acens',
                 fontWeight: "normal",
                 fontStyle: "normal",
                 color: "#777777"}}>{i18n.t('key')} </Text>
                     <TextInput textAlign={I18nManager.isRTL?'right':'left'}
                     onChangeText={(text) => this.setState({phone:text})}
                     placeholderTextColor='#777777' keyboardType='phone-pad' placeholder={i18n.t('phoneNumber')}  style={{ fontFamily:'newFont', 
                     fontSize: 13,fontFamily:'Acens',
                 fontWeight: "normal",
                 fontStyle: "normal",
                 paddingEnd:45,
                 paddingStart:5,
                 letterSpacing: 0,
                 width:Dimensions.get('window').width/1.3,
                 color: "#777777"
                 }} />
     </View>
             )}
         
     }

    signIn = async () => {
        try {
          const result = await Expo.Google.logInAsync({
            androidClientId:
              "836226074101-bcoboiig1hd46sdgkov1glqcjeeas8no.apps.googleusercontent.com",
            iosClientId: "836226074101-hbnhojk167e9u3cmtu8e2hg5nqsd68ll.apps.googleusercontent.com", 
            scopes: ["profile", "email"]
          })
    
          if (result.type === "success") {
            this.setState({
              signedIn: true,
              name: result.user.name,
              photoUrl: result.user.photoUrl
            })
          } else {
            console.log("cancelled")
          }
        } catch (e) {
          console.log("error", e)
        }
      }
    

    increase = (key, value) => {
        this.setState({
            [key]: this.state[key] + value,
        });
    }
    handlerButtonOnClick() {
        this.setState({
            onClicked: true
        });
    }
    setModalVisible(visible) {
        this.setState({ forgetPasswordModalVisibal: visible });
    }

    
    managePasswordVisibility = () => {
        this.setState({ hidePassword: !this.state.hidePassword });
    }
    _storeData = async (userID,firstName,lastName,userPhone,userPassword,email,pharmcyNmae) => {
        // save the lang in storage
        await AsyncStorage.setItem("userID", userID+'');
        await AsyncStorage.setItem("firstName", firstName+''); 
        await AsyncStorage.setItem("lastName", lastName+''); 

        await AsyncStorage.setItem("userPhone", userPhone+'');
        await AsyncStorage.setItem("userPassword", userPassword+'');
        await AsyncStorage.setItem("userEmail", email+'');
        await AsyncStorage.setItem("pharmcyNmae", pharmcyNmae+'');


        

      
    }
    _storeDataFB = async (userName,userID) => {
        // save the lang in storage
        await AsyncStorage.setItem("userID", userID+'');

        await AsyncStorage.setItem("userName", userName+''); 
       
        

      
    }
    async  logInFB() {
        try {
          const {
            type,
            token,
            expires,
            declinedPermissions,
          } = await Facebook.logInWithReadPermissionsAsync('646055425855631', {
            permissions: ['public_profile'],
          });
          if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,birthday,email,picture.type(large)`);
            Alert.alert('Logged in!', ` ${(await response.json()).name}!`);
            // this.setState({nameFB:`${(await response.json()).name}`,idFB:`${(await response.json()).id}`})
    
            const responseFB=JSON.parse(response._bodyInit)
         
            client.post(`/regfacebook?full_name=${ responseFB.name }&fb_id=${responseFB.id}`).then((res) => {
    if(res.data.status==='200'){
        this._storeDataFB(responseFB.name ,responseFB.id)
        this.props.navigation.navigate("Home") 

    
    }
    else if(res.data.status==='400'){
        showMessage({
            message: res.data.message,
            type: "danger",
          });
    }
    
    else
    {
    showMessage({
        message: res.data.message,
        type: "danger",
      })}  
       })
       


          } else {
            // type === 'cancel'
          }
        } catch ({ message }) {
          alert(`Facebook Login Error: ${message}`);
        }
      }

sendEmailForgetPass(){
  

this.setModalVisible(false)
}
    _handlePress = async () => {
        // save the lang in storage
if(this.state.pharmcyNmae.length>0&&this.state.password.length>0&&this.state.userNameP.length>0){
    this.setState({pharmacyNmaeBottomLine:'#F5F5F5'})
    this.setState({passwordBottomLine:'#F5F5F5'})
    this.setState({userNamePBottomLine:'#F5F5F5'})

// if(this.state.deviceToken !=null && this.state.deviceToken !=''){
    client.post(`/app/processlogin?password=${this.state.password}&user_name=${this.state.userNameP}&device_id=${this.state.deviceToken}&device_type=${this.state.devicePlatform}`).then((res) => {
        console.log("res of login",res)
if(res.data.status==='200'&& res.data.data.length>0){
    this._storeData(res.data.data[0].customers_id,res.data.data[0].customers_firstname,res.data.data[0].customers_lastname,
        res.data.data[0].customers_telephone,this.state.password, res.data.data[0].email,res.data.data[0].pharmacy_name
        )
const value=res.data.data[0].customers_id
const myLang =  AsyncStorage.getItem('myLang');
if (value !== null) {
  // We have data!!
  if(myLang=='ar')
  {
    lang=4;
  }else{
    lang=1;
  }
}
      //   client.post(`/app/getcart?customers_id=${value}`).then((res)=>{
      //       console.log("res of get cart in login ",res)
         
      //         this.setState({getCartData:res.data.data})
      //     //  for(var i=0;i<res.data.data.length;i++){
           
      //         if(res.data.data.length>0){
      //           let fArrCart=res.data.data;
      //           for(let i=0;i<=fArrCart.length;i++){
      //             if(fArrCart[i] !==undefined && fArrCart[i] !==null){
      //             client.post(`/app/getallproducts?products_id=${fArrCart[i].products_id}&language_id=${lang}`).then((res) => {
      //             console.log("res.data",res.data)
      //               // fArrCart[i]=res.data.product_data[0]
      // this.addToOrder(res.data.product_data[0])
      //             // this.props.addItemToOrder (fArrCart[i])
       
                
                  
      //             })
      //               }
      //           }
      //           console.log("fArrCart",fArrCart)
      //         }
      //         else{
      //           console.log("hereeeee")
      //         const myArray =  AsyncStorage.getItem('@MySuperStore:key');
      
      //         if (myArray !== null) {
      //   let fArr=JSON.parse(myArray);
      //           for(let i=0;i<=fArr.length;i++){
      //             if(fArr[i] !==undefined && fArr[i] !==null){
      //             client.post(`/app/getallproducts?products_id=${fArr[i].products_id}&language_id=${lang}`).then((res) => {
                  
      //    fArr[i].products_name=res.data.product_data[0].products_name
      
      //             this.props.addItemToOrder (fArr[i])
       
                
                  
      //             })
      //               }
      //           }
      //           console.log("fArr22",fArr)
      
      //           // We have data!!
      //         }
      //       }
     
            
            
      
      
      
      //     })
          this.props.navigation.navigate("Home") 

        //   setTimeout(()=>     this.props.navigation.navigate("Home") 
        //   ,2000);




}
else if(res.data.status==='400'){
    showMessage({
        message: res.data.message,
        type: "danger",
      });
}if(res.data.status==='200'&& res.data.data.length==0){
    if(res.data.message='Your pharmacy not Approved yet.'){
        // this.props.navigation.navigate("SignUpVerficationScreen") 
        showMessage({
            message: res.data.message,
            type: "danger",
          });

    }else
    {
    showMessage({
        message: res.data.message,
        type: "danger",
      });
    }} 
 })}
// }
       

// else{
//     showMessage({
//         message: "something went wrong",
//         type: "danger",
//       });
// }
    
  
   else if(this.state.pharmcyNmae.length==0){
       if(this.state.password.length>0){
        this.setState({passwordBottomLine:'#F5F5F5'})

       }
this.setState({pharmacyNmaeBottomLine:'red'})
   }else if(this.state.password.length==0){
    if(this.state.pharmcyNmae.length>0){
        this.setState({pharmacyNmaeBottomLine:'#F5F5F5'})

       }
    this.setState({passwordBottomLine:'red'})
       }

       else if(this.state.userNameP.length==0){
        if(this.state.password.length>0){
         this.setState({passwordBottomLine:'#F5F5F5'})
 
        }
        if(this.state.pharmcyNmae.length>0){
            this.setState({pharmacyNmaeBottomLine:'#F5F5F5'})
    
           }
 this.setState({userNamePBottomLine:'red'})
    }else if(this.state.password.length==0){
     if(this.state.pharmcyNmae.length>0){
         this.setState({pharmacyNmaeBottomLine:'#F5F5F5'})
 
        }
        if(this.state.userNameP.length>0){
            this.setState({userNamePBottomLine:'#F5F5F5'})
    
           }
     this.setState({userNamePBottomLine:'red'})
        }
 
    }
    // async addToOrder(singleItem){

    //     console.log("singleItem11 in login ",singleItem)
    //     var price=singleItem.new_price!=null?singleItem.new_price:singleItem.cost_price
    //           let item={
    //             drug_store:singleItem.drug_store,
    //             sub_agent:singleItem.sub_agent,

    //             products_id:singleItem.products_id,
    //             products_name : singleItem.products_name,
                
    //             final_price:parseFloat(price),
        
    //             price: parseFloat(price),
                
    //             customers_basket_quantity: 1,
    //             image: BaseURL + '/' + singleItem.products_image,
    //             bounsArr:singleItem.bounces,
    //             test:0,
    //             isCustom:false,
    //             unit:singleItem.units,
    //             tax:singleItem.tax_description,
    //             profit_margin: parseFloat(singleItem.profit_margin),
    //             profit_margin_ratio:(singleItem.profitmarginratio),
    //             testTaxF:0,
    //             testTaxE:0,
    //             testTaxS:0,
    //             f:price*1,
    //             publicPrice:singleItem.products_price,
                
    //             redeem:0,
    //             bounsNum:0,
    //             testTaxF: singleItem.tax_description*parseFloat(singleItem.products_price),
            
    //           }
    //           this.props.addItemToOrder(item)
    //           AsyncStorage.setItem('@MySuperStore:key', JSON.stringify((this.props.Order)));

    //         //   showMessage({
    //         //     message: i18n.t('addedSuccessfully'),
    //         //     type: "success",
    //         //   });
    //         }
    render () {
        console.log("this.props,order in login",this.props.Order)
      console.log("this.state.hidepassword",this.state.hidePassword)
        //  AsyncStorage.setItem('@MySuperStore:key', JSON.stringify((this.props.Order)));
    
   
        i18n.fallbacks = true;
        i18n.translations = { ar, en };
        //i18n.locale =null;

        i18n.locale = this.state.myLang;

        return(
            <Content disableKBDismissScroll={true}>
            <View style={mainLoginContainer}>
<View style={{height:Dimensions.get('window').height/5}}/>
<Text style={{color:'#484848',fontSize:25,fontFamily:'Acens'}}>{i18n.t('login')}</Text>
<View style={{height:15}}/>
            <View style={secondContainerInLogin}>

            {/* <View style={[passwordAndConfirmContainer,{ marginBottom:10.5, width:Dimensions.get('window').width/1.2,height:50,borderColor:this.state.phoneBottomLine,borderWidth:1,marginTop:5,alignItems:'center',textAlig:I18nManager.isRTL?'right':'left',backgroundColor:'#F5F5F5',borderRadius:5,}]}> */}
                       
            {/* <TextInput textAlign={I18nManager.isRTL?'right':'left'}
                     onChangeText={(text) => this.setState({email:text})}
                    placeholderTextColor='#777777' keyboardType='email-address' placeholder={i18n.t('email')}  style={[emailInputStyle,{borderColor:this.state.emailBottomLine,borderWidth:1}]}/> */}

{/* <TextInput textAlign={I18nManager.isRTL?'right':'left'}
                     onChangeText={(text) => this.setState({pharmcyNmae:text})}
                    placeholderTextColor='#777777'  placeholder='PHARMACY NAME'  style={[emailInputStyle,{borderColor:this.state.pharmacyNmaeBottomLine,borderWidth:1}]}/> */}

                       {/* {this.returnPhone()} */}

                       
                        {/* </View> */}

                        {/* <View style={[passwordAndConfirmContainer,{  width:Dimensions.get('window').width/1.2,borderColor:this.state.phoneBottomLine,borderWidth:1,marginTop:5,alignItems:'center',textAlig:I18nManager.isRTL?'right':'left',backgroundColor:'#F5F5F5',borderRadius:5,}]}> */}
                       
                       {/* <TextInput textAlign={I18nManager.isRTL?'right':'left'}
                                onChangeText={(text) => this.setState({email:text})}
                               placeholderTextColor='#777777' keyboardType='email-address' placeholder={i18n.t('email')}  style={[emailInputStyle,{borderColor:this.state.emailBottomLine,borderWidth:1}]}/> */}
           
           <TextInput textAlign={I18nManager.isRTL?'right':'left'}
                                onChangeText={(text) => this.setState({userNameP:text})}
                               placeholderTextColor='#777777'  placeholder={i18n.t('userName')}  style={[emailInputStyle,{borderColor:this.state.userNamePBottomLine,borderWidth:1}]}/>
           
                                  {/* {this.returnPhone()} */}
           
                                  
                                   {/* </View> */}
{Platform.OS=="ios"||(Platform.OS=="android"&&I18nManager.isRTL==false)?
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>

                  <TextInput placeholder={i18n.t('password')} textAlign={I18nManager.isRTL?'right':'left'}
                     onChangeText={(text) => this.setState({password:text})}
                    underlineColorAndroid="transparent" placeholderTextColor='#777777' placeholder={i18n.t('password')} secureTextEntry={this.state.hidePassword} style={[emailInputStyle,{marginTop:20,borderWidth:1,borderColor:this.state.passwordBottomLine}]} /> 
                    <TouchableOpacity activeOpacity={0.8} style={visibilityBtn} onPress={this.managePasswordVisibility}>
                        <Image source={(this.state.hidePassword) ? require('../assets/images/hideeye.png') : require('../assets/images/eye.png')} style={btnImage} />
                    </TouchableOpacity></View>
:
<View style={{ flexDirection: 'row', alignItems: 'center', }}>
<TextInput textAlign={I18nManager.isRTL?'right':'left'}
                                 onChangeText={(text) => this.setState({password:text})} secureTextEntry={this.state.hidePassword} 
                               placeholderTextColor='#777777'  placeholder={i18n.t('password')} style={[emailInputStyle,{borderColor:this.state.userNamePBottomLine,borderWidth:1}]}/>
           
{/* <TextInput placeholder={i18n.t('password')} 
 onChangeText={(text) => this.setState({password:text})}
underlineColorAndroid="transparent" placeholderTextColor='#777777' secureTextEntry={this.state.hidePassword} style={[emailInputStyle,{marginTop:20,borderWidth:1,borderColor:this.state.passwordBottomLine,paddingEnd:I18nManager.isRTL?Dimensions.get('window').width/1.55:20}]} /> */}
<TouchableOpacity activeOpacity={0.8} style={visibilityBtn} onPress={this.managePasswordVisibility}>
    <Image source={(this.state.hidePassword) ? require('../assets/images/hideeye.png') : require('../assets/images/eye.png')} style={btnImage} />
</TouchableOpacity></View>

                            }
                
                <View style={[logiSocailMediaContainer,{marginTop:20}]}>
                <View style={{width:Dimensions.get('window').width,justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity style={loginTouchable}
                    onPress={() => this._handlePress()}
                    
                   >
                        <Text style={loginTextStyleInLoginTab}>{i18n.t('login')}</Text>
                    </TouchableOpacity>
                    </View>
                   
<View style={{height:20}}/>
                    <View style={facebookContairInLogin}>
                    <View style={{width:Dimensions.get('window').width/1.3,justifyContent:'center'}}>
                    <Text>
                            <Text style={{
                                fontFamily: 'newFont', fontSize: 14,
                                fontWeight: "300",
                                fontStyle: "normal",
                                lineHeight: 17,
                                letterSpacing: 0,
                                color: "#777777",
                            }}>{i18n.t('ifYouDontHavAccount')}</Text>
                            <Text  onPress={() => this.props.navigation.navigate('SignUpScreen')}  style={{
                                color: '#8FCFEB', textDecorationLine: 'underline', fontFamily: 'newFont', fontSize: 14,
                                fontWeight: "300",
                                fontStyle: "normal",
                                lineHeight: 17,
                                letterSpacing: 0,
                            }}>{i18n.t('createNew')}</Text>
                             
                        </Text>
                        <View style={{height:10}}/>
                    <TouchableOpacity
                    style={{width:'100%',justifyContent:'center',alignItems:'center'}}
                    onPress={() => {
                        this.props.navigation.navigate('ForgetPasswordEmailScreen',{phone:this.state.phone})
                                            // this.setModalVisible(!this.state.forgetPasswordModalVisibal);
                                        }}>
                        <Text style={[forgetPasswordText,{fontSize:14}]}>{i18n.t('forgetPassword')}</Text>
                    </TouchableOpacity>
                   
                        </View>
                    </View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.forgetPasswordModalVisibal}
                        onRequestClose={() => {
                            this.setModalVisible(false);
                        }}>
                        <View style={{ marginTop: 90, marginEnd: 20, marginStart: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Card style={{ borderRadius: 10 }}>
                                {/* <View style={{ paddingEnd: 10, paddingStart: 10, paddingTop: 5, paddingBottom: 10 }}>


                                    <TouchableOpacity
                                    style={{alignItems:'flex-start'}}
                                        onPress={() => {
                                            this.setModalVisible(!this.state.forgetPasswordModalVisibal);
                                        }}>
                                        <Text style={{ fontSize: 25, color: 'rgba(161, 161, 161, 1)', fontFamily: 'newFont',}}>x</Text>

                                    </TouchableOpacity> */}

                                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', }}>
                                    <View style={{width:Dimensions.get('window').width/1.3,backgroundColor:'#8FCFEB',height:50,alignItems:'center',justifyContent:'center'}}>
                                      
                                    <View style={{flexDirection:'row',width:'100%'}}>

                                    <View  style={{width:10, justifyContent:'flex-end'}}  />
                                    <TouchableOpacity onPress={()=>{this.setModalVisible(false)}}>

 <Icon style={{color:'white',}} name={
        Platform.OS === 'ios'
          ? `md-close`
          : 'md-close'
      }/>
                                    {/* <Text style={{width:30,height:30,fontSize: 23, color: 'white', marginEnd:-20,marginStart:10,marginTop:-5}}>x</Text> */}
                                    </TouchableOpacity>


                                    {/* <Text style={{width:30,height:30,fontSize: 23, color: 'white', marginEnd:-20,marginStart:10,marginTop:-5}}>x</Text> */}
                                        <Text style={{ fontSize: 20, color: 'white', fontFamily: 'Acens',width:Dimensions.get('window').width/1.5,textAlign:'center' ,marginTop:5}}>{i18n.t('forgetYourPass')}</Text>
                                       </View>
                                      
                                       </View>
                                       <View style={{height:Dimensions.get('window').height/3,justifyContent:'center',alignItems:'center'}}>
                                       <TextInput 
                 onChangeText={(text) => this.setState({emailForfet:text})}
                placeholderTextColor='#777777' placeholder={i18n.t('email')} style={[emailInputStyle,{width:Dimensions.get('window').width/1.5}]}>

                </TextInput>
<View style={{width:Dimensions.get('window').width/1.37,alignItems:'flex-end',justifyContent:'flex-end',paddingTop:30}}>
<TouchableOpacity
onPress={()=>{this.sendEmailForgetPass()}}
style={{width:70,height:37,backgroundColor:'#8FCFEB',justifyContent:'center',alignItems:'center'}}><Text style={{fontSize: 12, color: 'white', fontFamily: 'Acens', }} >{i18n.t('send')}</Text></TouchableOpacity>
</View>
</View>
                                    </View>
                                {/* </View> */}
                            </Card>
                        </View>

                    </Modal>
                </View>
            </View>
        </View>


</Content>
    );
}
}
const LoginPage = props => {
    return (
      <View>
        {/* <Text style={{fontSize: 25}}>Sign In With Google</Text> */}
        <TouchableOpacity 
                        //  onPress={() => this.signIn()}
                        onPress={() => props.signIn()}
                        style={loginWithGoogleTouchable}>
                            <Image
                                source={require('../assets/images/googleicon.png')}
                                style={socailIconStyle}
                            />
                        </TouchableOpacity>
        {/* <Button style={{width:40,height:30}}title="Sign in with Google" 
         onPress={() => props.signIn()} /> */}
      </View>
    )
  }
  const LoggedInPage = props => {
    return (
      <View 
    //   style={{ flex: 1,
    //     backgroundColor: "#fff",
    //     alignItems: "center",
    //     justifyContent: "center"}}
        >
        { Alert.alert('Logged in!', `Hi ${props.name}!`)}
        
        {/* <Text style={{}}>Welcome:{props.name}</Text>
        <Image style={{ marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150}} source={{ uri: props.photoUrl }}/> */}
      </View>
    )
  }
  const mapStateToActions = {
    addItemToOrder: addItem
  }
  
  const mapStateToProps = state => ({
    Order: state.AddToOrderReducer.Order
  
  });
  
  export default connect(mapStateToProps, {...mapStateToActions,...AddOrderAction})(withNavigationFocus(LoginScreen));