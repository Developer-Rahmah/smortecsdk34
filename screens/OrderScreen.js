
import React from 'react';
import { ScrollView, StyleSheet,View , ActivityIndicator,Dimensions,Platform,TouchableOpacity,Image,ImageBackground,AsyncStorage,I18nManager,Modal,TextInput,TouchableWithoutFeedback,Animated} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Thumbnail,
  Left,
  Body,
  Right,
  StyleProvider,Picker,Card
} from "native-base";
import * as AddOrderAction from "../actions/AddToOrder";
import { CLEAR_CART } from "../actions/types";

import client from '../api/constant'
import { showMessage, hideMessage } from "react-native-flash-message";

import {connect} from "react-redux";
import getTheme from '../native-base-theme/components';
import variables from '../native-base-theme/variables/variables';

import NumericInput from 'react-native-numeric-input'
import { Localization } from 'expo-localization';
import Expo from 'expo';
import {addItem} from '../actions/AddToOrder'

import DatePicker from "react-native-datepicker";

import MyAddressStyle from '../css/MyAddressStyle';

import i18n from 'i18n-js';
var grmsArr=['50 gm','100 gm','150 gm','200 gm','250 gm','300 gm','350 gm','400 gm','450 gm','500 gm','550 gm','600 gm','650 gm','700 gm','750 gm','800 gm','850 gm','900gm ','950 gm','1000 gm'];
let a = [];
let aa=[]
let p= 0

let  testF = 0.0;
let testE = 0.0;
let testS = 0.0;
let lang;
var ACTION_TIMER = 3000;
   var listenerActive = true
   let BaseURL = 'https://smortec.com/';

const en = {
  select:'- Select -',
  availablebonuses:"Available Bonuses",
    home: 'Home',
    wishlist: 'Favorite',
    settings:'Settings',
    orders:'Orders',
        total:'Total after tax : ',
    jod:'JOD',
    cart:'Cart',
    checkOut:'CHECK OUT',
    explore:'EXPLORE',
    cartTitle:' MY CART',
    callNow:'CALL NOW',
    qty:'QTY : ',
    bonus:'Bonus : ',
    drugStore:'Drug Store : ',
    profitMargin:'Profit Value : ',
    cost:'Cost:',
    public:'Public :',
    profitMarginRatio:'Profit Margin Ratio : ',
    price:'Price : ',
    YourCartisEmpty:'Your Cart is Empty',
    typeOfOrder:'Type Of Order',
    cancel:'Cancel',
    latterBooking:'Later Booking',
    urgent:'Urgent',
    deffult:'Default',
    check_out:'Check Out',
    cod:'COD',
    name:'Name',
    email:'Email',
    pharmacyName:'Pharmacy Name',
    country:'Country',
    jordan:'Jordan',
    makePurchase:'MAKE PURCHASE',
    paymentAmount:'PAYMENT AMOUNT',
    Unit:'Unit : ',
    tax:'Tax : ',
    grandTotal:'Total before tax : ',
    tax4:'Tax 4% : ',
    tax8:'Tax 8% : ',
    tax16:'Tax 16% : ',
    taxtotal:'Taxes Total : ',
    enterYourBonus:'Enter Your Bonus',
    customizeYourBonus:'Customize Your Bonus',
    per:' per ',
    to:' to ',
    bonusavailable:' Bonus ',
    done:'Done',
 
    greaterthan:' greater than ',
    savecart:'SAVE CART',
    getcart:'GET CART'




    
   
};
const ar = {
  greaterthan:' أكثر من ',

  select:'- اختر -',
  availablebonuses:"البوانص المتاحة",


       bonusavailable:'البونص',
       done:'تم',

  home: 'الرئيسية',
  wishlist: 'المفضلة',
  settings:'الاعدادات',
  orders:'الطلبات',
    total:'السعر بعد الضريبة ',
  jod:' دينار ',
  cart:'السلة',
  checkOut:'الدفع',
  explore:'أضف الى السلة',
  cartTitle:'السلة',
  callNow:'اتصل الآن',
  qty:'الكمية : ',
    bonus:'بونص : ',
    drugStore:'اسم المستودع : ',

    profitMargin:'الربح : ',
    cost:'التكلفة : ',
    public:'العام : ',
    profitMarginRatio:'نسبة الربح : ',
    price:'السعر : ',
    YourCartisEmpty:'سلة التسوق فارغة',
    typeOfOrder:'نوع الطلب',
    cancel:'الغاء',
    latterBooking:'الحجز الاخير',
    urgent:'Urgent',
    deffult:'اساسي',
    check_out:'الدفع',
    cod:'الدفع عند التسليم',
    name:'الاسم',
    email:'الايميل',
    pharmacyName:'اسم الصيدلية',
    country:'البلد',
    jordan:'الاردن',
    makePurchase:'شراء',
    paymentAmount:'المجموع',
    Unit:'الوحدة : ',
    tax:'ضريبة المبيعات : ',
    grandTotal:'السعر قبل الضريبة : ',
    
    tax4:'ضريبة مبيعات 4٪ : ',
    tax8:'ضريبة مبيعات 8٪ :',
    tax16:'ضريبة مبيعات 16٪ : ',
    taxtotal:'مجموع الضرائب : ',
    enterYourBonus:' البونص',
    customizeYourBonus:'ادخال بونص معين',
    per:' لكل ',
    to:' الى ',
    done:'تم',
    savecart:'حفظ السلة',
    getcart:'استرجاع السلة'













};
var dat=new Date();
var date= new Date();
class OrderScreen extends React.Component {
  static navigationOptions = {
    title: null,
  };
  constructor(props){
    super(props)
    this.state = {
      selectedGramsCustom:1,
      fArrTest:true,
      counter:0,
      pressAction: new Animated.Value(0),
      value: 0,
      selectedItem:{},
      custmizeBonusNum:0,
      isBounasModalVisible:false,
      taxFourArr:[],
      taxEightArr:[],
      taxsixteenArr:[],
      profitmargintest:0,

      taxFour:0.0,
      taxEight:0.0,
      taxSixteen:0.0,

      bounsArr:this.props.Order.bounsArr,
      custmizeBonusNum:0,
      isBounasModalVisible:false,
      bounsNum:0,
      chosenDate: date,
      type:1,
      firstNmae:'',
      lastName:'',
      userEmail:'',
      pharmcyNmae:'',

      userID:'',
      products: this.props.Order,
      addressNameBorder:'#E8E8E8',
      streetBorder:'#E8E8E8',
      name:'',
      email:'',
      phone:'',
      deffultSeclcted:true,
      urgentSelected:false,
      latterBookingSelected:false,

      defaultBackgroundColor:'#8FCFEB',
      defultTextColor:'gray',
      defultTextWeight:"bold",

      urgentBackgroundColor:'white',
      urgentTextColor:'#A9A9A9',
      urgentTextWeight:'normal',

      latterBookingBackgroundColor:'white',
      latterBookingTextColor:'#A9A9A9',
      latteerBookingTextWeight:'normal',
      
      popUpModal: false,
      popUpModalCalender: false,
      getCartData:[],
      textComplete:"",
      selectedGrams:1,

      Price: parseFloat(100),
      count:0,
      value: 1,
      phonCall:'07999999',

      popUpModal: false,

      val: 1,
      minColor: 'white',
      ExperienceArr:this.props.Order,
      final_price:parseFloat (0),
      myLang: AsyncStorage.getItem("myLang").then((value) => {
        this.setState({ "myLang": value })
    }).done()
    ,
    }
}


deffultPressed(){
  this.setState({deffultSeclcted:true,type:1,
      latterBookingSelected:false,
      urgentSelected:false,
      orderType:'Deffult',

      defaultBackgroundColor:'#8FCFEB',
      defultTextColor:'gray',
      defultTextWeight:"bold",

      urgentBackgroundColor:'white',
      urgentTextColor:'#A9A9A9',
      urgentTextWeight:'normal',

      latterBookingBackgroundColor:'white',
      latterBookingTextColor:'#A9A9A9',
      latteerBookingTextWeight:'normal'
  })

}

urgentPressed(){
  this.setState({deffultSeclcted:false,type:2,
      orderType:'Urgent',
  
urgentSelected:true,
latterBookingSelected:false,

urgentBackgroundColor:'#8FCFEB',
urgentTextColor:'gray',
urgentTextWeight:"bold",

latterBookingBackgroundColor:'white',
latterBookingTextColor:'#A9A9A9',
latteerBookingTextWeight:'normal',

defaultBackgroundColor:'white',
defultTextColor:'#A9A9A9',
defultTextWeight:"normal",
})
}
latterBookingPressed(){
  this.setState({deffultSeclcted:false,type:3,
      orderType:'office',
 
      urgentSelected:false,
latterBookingSelected:true,

latterBookingBackgroundColor:'#8FCFEB',
latterBookingTextColor:'gray',
latteerBookingTextWeight:"bold",

urgentBackgroundColor:'white',
urgentTextColor:'#A9A9A9',
urgentTextWeight:'normal',

defaultBackgroundColor:'white',
defultTextColor:'#A9A9A9',
defultTextWeight:"normal",


})
// this.setPopUpModalVisibleCalender(true)


}
// _cartDataUnSaved=async()=>{
//   console.log("6555567")
//          try {
//                   const myArray = await AsyncStorage.getItem('@MySuperStore:key');
//                   console.log('arrrrr is',myArray)
//                   if (myArray !== null) {
//             let fArr=JSON.parse(myArray);
//             console.log("fArr",fArr)
//                     for(let i=0;i<=fArr.length;i++){
//                       if(fArr[i] !==undefined && fArr[i] !==null){
//                       client.post(`/app/getallproducts?products_id=${fArr[i].products_id}&language_id=${lang}`).then((res) => {
                      
//              fArr[i].products_name=res.data.product_data[0].products_name
//             //  console.log(' this.props.addItemToOrder (fArr[i])', this.props.addItemToOrder (fArr[i]))
//                       this.props.addItemToOrder (fArr[i])
//                        console.log('single product arr is',res.data)
            
//                       console.log('each item in assssyyyync aaaar',(fArr[i]))
                    
                      
//                       })
//                         }
//                     }
//                     // We have data!!
//                     console.log('cart async arr is',JSON.parse(myArray));
//                   }
//                  } 
//                  catch (error) {
//                   // Error retrieving data
//                   console.log('cart async arr is error',error)
//                 }
// }
onConfiremPressed(date){
  
  this.setState({ chosenDate: date, })
this.latterBookingPressed();
}

setModalVisible(visible) {
  this.setState({ modalVisible: visible });
}

  onChange(number) {
    let price = parseFloat (100);
    price = parseFloat(price);
    this.setState({
      Price : parseFloat(price * number),
      count: number
    })
  }
  
  static navigationOptions = {
   header:null
};
animationActionComplete=(data)=> {
  var message = '';

// this.setState({counter:this.state.counter+1})
this.onPlusPressed(data)
}
animationActionCompleteMin=(data)=> {
  var message = '';

// this.setState({counter:this.state.counter+1})
this.onMainusPressed(data)
}
async ttttest(){

// async ttttest(){
// console.log("in ttttest",data)
if(this.props.Order !=undefined){

  for(let data=0;data<=this.props.Order.length;data++)
  {
    if(this.props.Order[data] !=undefined){

  let arr=[];
  if(this.props.Order[data].isCustom){
    this.props.Order[data].test=parseInt(this.props.Order[data].test)

  }else{
if(this.props.Order[data].bounsArr !=undefined){

    for(let r=0;r<=this.props.Order[data].bounsArr.length;r++){
      if(this.props.Order[data].bounsArr[r]!=undefined){
  
    arr.push (this.props.Order[data].bounsArr[r].type)
    
    }
    }}
  if(arr.includes('piece')&&arr.includes('percent')){
    if(this.props.Order[data].bounsArr !=undefined){
    for(let i=0;i<=this.props.Order[data].bounsArr.length;i++){
     
      if(this.props.Order[data].bounsArr[i]!=undefined){
      if(this.props.Order[data].customers_basket_quantity>=this.props.Order[data].bounsArr[i].qty_from-1){
   
  
        if(this.props.Order[data].bounsArr[i].type=='percent'){
          // test=this.state.bounsArr[i].bounces;
          this.props.Order[data].test=(this.props.Order[data].bounsArr[i].bounces)/100*this.props.Order[data].customers_basket_quantity
  
        }else{
      
  
          this.props.Order[data].test=parseInt(this.props.Order[data].bounsArr[i].bounces)*1
     
          if(this.props.Order[data].customers_basket_quantity>this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].qty_to){

        
            // this.props.Order[data].test=0 

    if(this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].greater_than!=0){
      if(this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].type=='percent'){
      parseInt((this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].bounces)/100*this.props.Order[data].customers_basket_quantity)
      }else{
        this.props.Order[data].test=parseInt(this.props.Order[data].bounsArr[this.state.bounsArr.length-1].bounces)

      }
    }else{
      this.props.Order[data].test=0 

    }
          }
        }
      
  
      }
    }
  }
if(this.props.Order[data].customers_basket_quantity>this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].qty_to){


    // this.props.Order[data].test=0 

    if(this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].greater_than!=0){
      if(this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].type=='percent'){
      parseInt((this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].bounces)/100*this.props.Order[data].customers_basket_quantity)
      }else{
        this.props.Order[data].test=parseInt(this.props.Order[data].bounsArr[this.state.bounsArr.length-1].bounces)

      }
    }else{
      this.props.Order[data].test=0 

    }
  }

}}else{
    let test=0;
    if(this.props.Order[data].bounsArr !=undefined){
    for(let i=0;i<=this.props.Order[data].bounsArr.length;i++){
     
      if(this.props.Order[data].bounsArr[i]!=undefined){
      if(this.props.Order[data].customers_basket_quantity>=this.props.Order[data].bounsArr[i].qty_from-1){
  
  
        if(this.props.Order[data].bounsArr[i].type=='percent'){
          // test=this.state.bounsArr[i].bounces;
          this.props.Order[data].test=(this.props.Order[data].bounsArr[i].bounces)/100*this.props.Order[data].customers_basket_quantity
  
        }else{
      
  
          this.props.Order[data].test=parseInt(this.props.Order[data].bounsArr[i].bounces)*1
  
          if(this.props.Order[data].customers_basket_quantity>this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].qty_to){
   
        
            // this.props.Order[data].test=0 

    if(this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].greater_than!=0){
      if(this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].type=='percent'){
      parseInt((this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].bounces)/100*this.props.Order[data].customers_basket_quantity)
      }else{
        this.props.Order[data].test=parseInt(this.props.Order[data].bounsArr[this.state.bounsArr.length-1].bounces)

      }
    }else{
      this.props.Order[data].test=0 

    }
          }
        }
    
  
      }}
    }}}
  }}
  }
  }
{/*
  if(this.props.Order !=undefined){
  
    for(let data=0;data<=this.props.Order.length;data++)
    {
      if(this.props.Order[data] !=undefined){
  
    let arr=[];
    if(this.props.Order[data].isCustom){
      this.props.Order[data].test=parseInt(this.props.Order[data].test)
  
    }else{
  if(this.props.Order[data].bounsArr !=undefined){
      for(let r=0;r<=this.props.Order[data].bounsArr.length;r++){
        if(this.props.Order[data].bounsArr[r]!=undefined){
    
      arr.push (this.props.Order[data].bounsArr[r].type)
      
      }
      }}
    if(arr.includes('piece')&&arr.includes('percent')){
      if(this.props.Order[data].bounsArr !=undefined){
      for(let i=0;i<=this.props.Order[data].bounsArr.length;i++){
       
        if(this.props.Order[data].bounsArr[i]!=undefined){
        if(this.props.Order[data].customers_basket_quantity>=this.props.Order[data].bounsArr[i].qty_from-1){
     
    
          if(this.props.Order[data].bounsArr[i].type=='percent'){
            this.props.Order[data].test=(this.props.Order[data].bounsArr[i].bounces)/100*this.props.Order[data].customers_basket_quantity
    
          }else{
        
    
            this.props.Order[data].test=parseInt(this.props.Order[data].bounsArr[i].bounces)*1

            if(this.props.Order[data].customers_basket_quantity>this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].qty_to){
            
              

              if(this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].greater_than!=0){
                if(this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].type=='percent'){
                parseInt((this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].bounces)/100*this.props.Order[data].customers_basket_quantity)
                }else{
                  this.props.Order[data].test=parseInt(this.props.Order[data].bounsArr[this.state.bounsArr.length-1].bounces)
          
                }
              }else{
                // this.props.Order[data].test=0 
                
          
              }

              
          
              // this.props.Order[data].test=0
            }
          }

    
        }
      }
    }


  if(this.props.Order[data].customers_basket_quantity>this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].qty_to){


    // this.props.Order[data].test=0

    if(this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].greater_than!=0){
      if(this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].type=='percent'){
      parseInt((this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].bounces)/100*this.props.Order[data].customers_basket_quantity)
      }else{
        this.props.Order[data].test=parseInt(this.props.Order[data].bounsArr[this.state.bounsArr.length-1].bounces)

      }
    }else{
      this.props.Order[data].test=0 

    }
  }
  }}else{
      let test=0;
      if(this.props.Order[data].bounsArr !=undefined){
      for(let i=0;i<=this.props.Order[data].bounsArr.length;i++){
       
        if(this.props.Order[data].bounsArr[i]!=undefined){
        if(this.props.Order[data].customers_basket_quantity>=this.props.Order[data].bounsArr[i].qty_from-1){
     
    
          if(this.props.Order[data].bounsArr[i].type=='percent'){
            // test=this.state.bounsArr[i].bounces;
            this.props.Order[data].test=(this.props.Order[data].bounsArr[i].bounces)/100*this.props.Order[data].customers_basket_quantity
    
          }else{
     
    
            this.props.Order[data].test=parseInt(this.props.Order[data].bounsArr[i].bounces)*1
  
            if(this.props.Order[data].customers_basket_quantity>this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].qty_to){
    
          
              // this.props.Order[data].test=0

    if(this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].greater_than!=0){
      if(this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].type=='percent'){
      parseInt((this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].bounces)/100*this.props.Order[data].customers_basket_quantity)
      }else{
        this.props.Order[data].test=parseInt(this.props.Order[data].bounsArr[this.state.bounsArr.length-1].bounces)

      }
    }else{
      this.props.Order[data].test=0 

    }
            }
          }
      
    
        }}
      }
    
     
    
    }}
    }}
    }
    
    }
  */}

    try {
      await AsyncStorage.setItem('@MySuperStore:key', JSON.stringify(this.props.Order));
  
    } 
    catch (error) {
      // Error saving data
      console.log('errror when saving async arrray',error)
    }

}




async ttttest2(){

  if(this.props.Order !=undefined){
  
    for(let data=0;data<=this.props.Order.length;data++)
    {
      if(this.props.Order[data] !=undefined){
  
    let arr=[];
    if(this.props.Order[data].isCustom){
      this.props.Order[data].test=parseInt(this.props.Order[data].test)
  
    }else{
  if(this.props.Order[data].bounsArr !=undefined){
  
      for(let r=0;r<=this.props.Order[data].bounsArr.length;r++){
        if(this.props.Order[data].bounsArr[r]!=undefined){
    
      arr.push (this.props.Order[data].bounsArr[r].type)
      
      }
      }}
    if(arr.includes('piece')&&arr.includes('percent')){
      if(this.props.Order[data].bounsArr !=undefined){
      for(let i=0;i<=this.props.Order[data].bounsArr.length;i++){
       
        if(this.props.Order[data].bounsArr[i]!=undefined){
        if(this.props.Order[data].customers_basket_quantity>=this.props.Order[data].bounsArr[i].qty_from+2){
 
    
          if(this.props.Order[data].bounsArr[i].type=='percent'){
            // test=this.state.bounsArr[i].bounces;
            this.props.Order[data].test=(this.props.Order[data].bounsArr[i].bounces)/100*this.props.Order[data].customers_basket_quantity
    
          }else{
   
    
            this.props.Order[data].test=parseInt(this.props.Order[data].bounsArr[i].bounces)*1
       
            if(this.props.Order[data].customers_basket_quantity>this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].qty_to){

          
              // this.props.Order[data].test=0 

    if(this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].greater_than!=0){
      if(this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].type=='percent'){
      parseInt((this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].bounces)/100*this.props.Order[data].customers_basket_quantity)
      }else{
        this.props.Order[data].test=parseInt(this.props.Order[data].bounsArr[this.state.bounsArr.length-1].bounces)

      }
    }else{
      this.props.Order[data].test=0 

    }
            }
          }
   
    
        }
      }
    }
  

  if(this.props.Order[data].customers_basket_quantity>this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].qty_to){
   
    // this.props.Order[data].test=0 

    if(this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].greater_than!=0){
      if(this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].type=='percent'){
      parseInt((this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].bounces)/100*this.props.Order[data].customers_basket_quantity)
      }else{
        this.props.Order[data].test=parseInt(this.props.Order[data].bounsArr[this.state.bounsArr.length-1].bounces)

      }
    }else{
      this.props.Order[data].test=0 

    }
  }
  
  
  }}else{
      let test=0;
      if(this.props.Order[data].bounsArr !=undefined){
      for(let i=0;i<=this.props.Order[data].bounsArr.length;i++){
       
        if(this.props.Order[data].bounsArr[i]!=undefined){
        if(this.props.Order[data].customers_basket_quantity>=this.props.Order[data].bounsArr[i].qty_from-1){

    
          if(this.props.Order[data].bounsArr[i].type=='percent'){
            // test=this.state.bounsArr[i].bounces;
            this.props.Order[data].test=(this.props.Order[data].bounsArr[i].bounces)/100*this.props.Order[data].customers_basket_quantity
    
          }else{
       
    
            this.props.Order[data].test=parseInt(this.props.Order[data].bounsArr[i].bounces)*1
 
            if(this.props.Order[data].customers_basket_quantity>this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].qty_to){
      
          
              // this.props.Order[data].test=0 

    if(this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].greater_than!=0){
      if(this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].type=='percent'){
      parseInt((this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].bounces)/100*this.props.Order[data].customers_basket_quantity)
      }else{
        this.props.Order[data].test=parseInt(this.props.Order[data].bounsArr[this.state.bounsArr.length-1].bounces)

      }
    }else{
      this.props.Order[data].test=0 

    }
            }
          }
        
    
        }}
      }}}
    }}
    }
    
    }
  
    try {
      await AsyncStorage.setItem('@MySuperStore:key', JSON.stringify(this.props.Order));
  
    } 
    catch (error) {
      // Error saving data
      console.log('errror when saving async arrray',error)
    }
}



componentDidMount() {
  // if (I18nManager.isRTL)
  // {
  //   lang=4;
  // }
  // else{
  //   lang=1;
  // }
      this._retrieveData()
      if(this.props.Order.length>0){
        
    
      }
      
  testF=0.0;
  testE=0.0;
  testS=0.0;
  dat= dat.setDate(dat.getDate() + 30);
  dat=new Date(dat);
  date=date.setDate(date.getDate() + 2);
  date=new Date(date);
  this._retrieveData()
  for(let i=0;i<=this.props.Order.length;i++){

    if(this.props.Order[i] !=undefined){
    if(this.props.Order[i].tax=='4%'){
      testF+=(this.props.Order[i].f*(0.04));

   
     }
    else if(this.props.Order[i].tax=='16%'){

      testS+=(this.props.Order[i].f*(0.16));

 

    }
    else if(this.props.Order[i].tax=='8%'){
      testE+=(this.props.Order[i].f*(0.08));

  
  }}}
}

async onPlusPressed(data){

 

  data.customers_basket_quantity =data.customers_basket_quantity+1
  data.f=parseFloat(data.final_price*data.customers_basket_quantity)

    
    if(data.tax=='4%'){
      testF=0.0;
  
      testF+=(data.f*(0.04));

      
     }
    else if(data.tax=='16%'){
     
      testS=0.0;
      testS+=(data.f*(0.16));

     
    }
    else if(data.tax=='8%'){
     
  testE=0.0;
      testE+=(data.f*(0.08));
    }
     
//   }

// }
data.isCustom=false
  this.setState({
    count:data.customers_basket_quantity
  })
  // let test=0;
  let arr=[];
  let profitmarginratio=0;

  let profitmargion=0;
  console.log("this.state.count",this.state.count)
  if(this.state.count==''||this.state.count==""){
console.log("this.props.Order",this.props.Order)
      let totalSell=parseFloat(data.publicPrice)*(1+parseInt(data.test))
      profitmargion= totalSell-(data.final_price*1)
      let margin=data.final_price*(1+parseInt(data.test)) 
           profitmarginratio=(parseFloat(profitmargion / margin)*100).toFixed(3)

  }else{
    console.log("this.props.Order2",this.props.Order)

    let totalSell=parseFloat(data.publicPrice)*(this.state.count+data.test)
    console.log("totalsell33",parseInt(data.test))
    profitmargion= totalSell-(data.final_price*this.state.count)
    let margin=data.final_price*(this.state.count+data.test) 
         profitmarginratio=(parseFloat(profitmargion / margin)*100).toFixed(3)

  }
  console.log("profitmargion1111",profitmargion)
  data.profit_margin=profitmargion
  data.profit_margin_ratio=profitmarginratio





this.ttttest()



}
setBounsModalVisibleRef(visible){
  this.setState({ isBounasModalVisible: visible,selectedGrams:0 });
  

}
setModalVisible(visible) {
  this.setState({ popUpModal: visible });
}
async onMainusPressed(data){
  
if(data.customers_basket_quantity>1){
  data.customers_basket_quantity =data.customers_basket_quantity-1
  // data.final_price=parseFloat(data.final_price)-parseFloat(data.price)
  data.f=parseFloat(data.final_price*data.customers_basket_quantity)
  if(data.tax=='4%'){
    testF=0.0;

    testF+=(data.f*(0.04));

    
   }
  else if(data.tax=='16%'){
   
    testS=0.0;
    testS+=(data.f*(0.16));

   
  }
  else if(data.tax=='8%'){
   
testE=0.0;
    testE+=(data.f*(0.08));
  }

}
  this.setState({
    count:data.customers_basket_quantity

  })
  let profitmarginratio=0;

  let profitmargion=0;
  console.log("this.state.count",this.state.count)
  if(this.state.count==''||this.state.count==""){
console.log("this.props.Order",this.props.Order)
      let totalSell=parseFloat(data.publicPrice)*(1+parseInt(data.test))
      profitmargion= totalSell-(data.final_price*1)
      let margin=data.final_price*(1+parseInt(data.test)) 
           profitmarginratio=(parseFloat(profitmargion / margin)*100).toFixed(3)

  }else{
    console.log("this.props.Order2",this.props.Order)

    let totalSell=parseFloat(data.publicPrice)*(this.state.count+data.test)
    console.log("totalsell33",parseInt(data.test))
    profitmargion= totalSell-(data.final_price*this.state.count)
    let margin=data.final_price*(this.state.count+data.test) 
         profitmarginratio=(parseFloat(profitmargion / margin)*100).toFixed(3)

  }
  console.log("profitmargion1111",profitmargion)
  data.profit_margin=profitmargion
  data.profit_margin_ratio=profitmarginratio

  // let test=0;
  let arr=[];
  data.isCustom=false

this.ttttest2()

}

setPopUpModalVisibleCalender(visible) {
  this.setState({ popUpModalCalender: visible });
}
setPopUpModalVisible(visible) {
  this.setState({ popUpModal: visible });
}
onValueChangeGrams(value,data) {
  
  this.setState({
      selectedGrams: value,

  });
  if(value=='bounses'){
    this.editPressed(data)
    this.setBounsModalVisibleRef(true)
  }

  if(data.isCustom){
data.isCustom=false
this.ttttest()
}
if(value=='bounses'&&data.isCustom){
  data.isCustom=false
this.ttttest()
}

}

onValueChangeGramsCustom(value,data) {
  
  this.setState({
      selectedGramsCustom: value,

  });
  if(value=='bounses'){
    this.editPressed(data)
    this.setBounsModalVisibleRef(true)
  }

  
  
  
  // this.setState({singleItem})

  // this.setState({finalPrice:(parseFloat(value+1)*this.state.singleItem.products_price),price:(parseFloat(this.state.singleItem.products_price))})
  
  // this.setState({singleItem})
}

async onDelete(data,i){
  testF=0.0;
  testE=0.0;
  testS=0.0;
 
  let newItem = this.props.Order;
  newItem.splice(i, 1)
  this.setState({ ExperienceArr: newItem })
  for(let i=0;i<=this.props.Order.length;i++){

    if(this.props.Order[i] !=undefined){
    if(this.props.Order[i].tax=='4%'){
      testF+=(this.props.Order[i].price*(0.04));

   
     }
    else if(this.props.Order[i].tax=='16%'){

      testS+=(this.props.Order[i].price*(0.16));


    }
    else if(this.props.Order[i].tax=='8%'){
      testE+=(this.props.Order[i].price*(0.08));


  }}}

  try {
    await AsyncStorage.setItem('@MySuperStore:key', JSON.stringify(this.props.Order));
    console.log("this.props.order888",this.props.Order)
    if(this.props.Order.length==0){
      this.onsaveCartPressed(this.state.ExperienceArr)
    }
  } catch (error) {
    // Error saving data
    console.log('errror in saving cart arrrrr',error)
  }

}
updateState = (index,value) => {
  const ExperienceArr = [...this.state.ExperienceArr]; //make a copy of array
  ExperienceArr[index].customers_basket_quantity =0;
  ExperienceArr[index].customers_basket_quantity =parseInt (value);

  ExperienceArr[index].final_price =parseInt (value)*ExperienceArr[index].final_price;

  this.setState({ ExperienceArr: ExperienceArr });
}

_retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('userID');
    const phonevalue = await AsyncStorage.getItem("userPhone");

    const lastName = await AsyncStorage.getItem('lastName');

    const namevalue =  await AsyncStorage.getItem("firstName"); 
    const userEmail = await AsyncStorage.getItem("userEmail");
   const pharmcyNmae = await AsyncStorage.getItem("pharmcyNmae");
    if (value !== null) {
      // We have data!!
      this.setState({userID:value,phone:phonevalue,
        firstNmae:namevalue,
        
        userEmail:userEmail,
        lastName:lastName,
        pharmcyNmae:pharmcyNmae})
    }
  } catch (error) {
    // Error retrieving data
    console.log('getstorageitemerrrror',error);
  }
  
};
editPressed(data){
  this.setBounsModalVisibleRef(true)
  this.setState({selectedItem:data})
}
doneBtn(){


  this.state.selectedItem.isCustom=true
  this.state.selectedItem.test=parseInt(this.state.custmizeBonusNum)
  let totalSell=this.state.selectedItem.publicPrice*(this.state.selectedItem.customers_basket_quantity+this.state.selectedItem.test)
  this.state.selectedItem.profit_margin= totalSell-this.state.selectedItem.f
let margin=this.state.selectedItem.final_price*(this.state.selectedItem.customers_basket_quantity+this.state.selectedItem.test)
this.state.selectedItem.profit_margin_ratio=(parseFloat(this.state.selectedItem.profit_margin/margin)*100).toFixed(3)

  this.setBounsModalVisibleRef(false)
}
onsaveCartPressed=(data)=>{
  console.log("data22",data)
  var productsId=[]
  for(var i=0;i<data.length;i++){
    // productsId.push(data[i].products_id)
    productsId.push(
      `products[${i}][products_id]=${
        data[i].products_id
      }
     `,
     `products[${i}][qty]=${
      data[i].customers_basket_quantity
    }
   `

     );
  }
console.log("productsId",productsId)
console.log("this.state.userId",this.state.userID)
let bApproved = productsId.toString();
// bApproved.replace(",", "&");

let arrApp=bApproved.replace(",", "&")
console.log("arrApp of save cart",arrApp)

arrApp=arrApp
     .split(",")
     .join("&")
console.log("arrApp of save cart22",arrApp)
// for(var i=0;i<arrApp.length;i++){
//   arrApp[i]=arrApp[i].replace(",", "&")
// }
console.log("arrApp of save cart33",arrApp)

client.post(`/app/savecart?${arrApp}&products[}&customers_id=${this.state.userID}`).then((res) => {
console.log("res",res)
showMessage({
  message: res.data.message,
  type: "success",
});
})
}
onGetCartPressed=()=>{
  this.props.clearCart();

  client.post(`/app/getcart?customers_id=${this.state.userID}`).then((res)=>{
    console.log(" orderrr000",res)
 var lang;
 if(I18nManager.isRTL){
   lang=4
 }
 else{
   lang=1
 }
      this.setState({getCartData:res.data.data})
  //  for(var i=0;i<res.data.data.length;i++){
   
      if(res.data.data.length>0){
        let fArrCart=res.data.data;
        console.log("hay kam",fArrCart)
        for(let i=0;i<=fArrCart.length;i++){
          if(fArrCart[i] !==undefined && fArrCart[i] !==null){
            console.log("fArrCart[i]",fArrCart[i])
          client.post(`/app/getallproducts?products_id=${fArrCart[i].products_id}&language_id=${lang}`).then((res) => {
          console.log("res.data",res.data)
            // fArrCart[i]=res.data.product_data[0]
            if(res.data.product_data!=undefined){
this.addToOrder(res.data.product_data[0],fArrCart[i].qty)
            }
          // this.props.addItemToOrder (fArrCart[i])

        
          
          })
            }
        }
        console.log("this.props.order5",this.props.Order)
        AsyncStorage.setItem('@MySuperStore:key', JSON.stringify((this.state.ExperienceArr)));
        console.log("fArrCart",fArrCart)
      }
      else{
        console.log("hereeeeeeeeeeeee")
      // const myArray =  AsyncStorage.getItem('@MySuperStore:key');
      AsyncStorage.getItem('@MySuperStore:key').then(
        res => {
          console.log("myArray9",JSON.parse(res))
const myArray=JSON.parse(res)
          if (myArray !== null) {
    let fArr=(myArray);
            for(let i=0;i<=fArr.length;i++){
              if(fArr[i] !==undefined && fArr[i] !==null){
              client.post(`/app/getallproducts?products_id=${fArr[i].products_id}&language_id=${lang}`).then((res) => {
              
     fArr[i].products_name=res.data.product_data[0].products_name
    
              this.props.addItemToOrder (fArr[i])
    
            
              
              })
                }
            }
            console.log("fArr22",fArr)
            if(fArr.length==0){
    this.setState({fArrTest:false})
    showMessage({
      message: I18nManager.isRTL?"سلة التسوق فارغة":"Your Cart is Empty",
      type: "danger",
    });
            }
            // We have data!!
          }
       
        }
       
      );

    }

    



  })
}
async addToOrder(singleItem,qty){
  



  console.log("singleItem11",singleItem)
  console.log("qty11",qty)

  
  
  let test=0;
  if(singleItem.bounces.length>0){
    for(let i=0;i<=singleItem.bounces.length;i++){
  
      if(singleItem.bounces[i]!=undefined){ 
  
  if(qty==''||qty==""){
      if(1>=singleItem.bounces[i].qty_from){
        if(singleItem.bounces[i].type=='percent'){

  
          test=singleItem.bounces[i].bounces;
  test=(singleItem.bounces[i].bounces)/100
        }else{
                test=singleItem.bounces[i].bounces;
  
  
        }
        this.setState({bounsNum:singleItem.bounces[i].bounces})
      }
    }else{
      console.log("1")
      if(parseInt(qty)>=singleItem.bounces[i].qty_from){
        console.log("10")
        if(singleItem.bounces[i].type=='percent'){
          console.log("2")

  
          test=singleItem.bounces[i].bounces;
  test=(singleItem.bounces[i].bounces)/100*parseInt(qty)
        }else{
          console.log("3")

                test=singleItem.bounces[i].bounces;
  
  
        }
        this.setState({bounsNum:singleItem.bounces[i].bounces})
      }
    }
    }
  }
}
  // if(this.state.custmizeBonusNum>0){
  //   test=this.state.custmizeBonusNum
  // }
    
    let{ isModalVisible} = this.props;
    let BaseURL = 'https://smortec.com';
    let testTaxF=0;
    let testTaxS=0;
    let testTaxE=0;
    let ppp=0;
    if(singleItem.tax_description=='4%'){
  
    
     testTaxF= 0.04*parseFloat(singleItem.products_price);
  }else  if(singleItem.tax_description=='8%'){
  
    
     testTaxE= 0.08*parseFloat(singleItem.products_price);
  } else  if(singleItem.tax_description=='16%'){
  
    
     testTaxS= 0.16*parseFloat(singleItem.products_price);
  }
      if(singleItem.new_price !=null && singleItem.new_price !=''){
        ppp= parseFloat(singleItem.new_price)
        
      }else{
        ppp=parseFloat(singleItem.cost_price)
      }
  
      
     
  
  let profitmarginratio=0;
  let profitmargion=0;
  if(qty==''||qty==""){

      let totalSell=parseFloat(singleItem.products_price)*(1+parseInt(test))
      profitmargion= totalSell-(ppp*1)
      let margin=ppp*(1+parseInt(test)) 
           profitmarginratio=(parseFloat(profitmargion / margin)*100).toFixed(3)

  }else{
    console.log("test",test)
console.log("ppp",ppp)
console.log("parseFloat(this.state.singleItem.products_price)",(parseInt(qty)+parseInt(test)))
    let totalSell=parseFloat(singleItem.products_price)*(parseInt(qty)+parseInt(test))
    console.log("totalsell",totalSell)
    profitmargion= totalSell-(ppp*qty)
    let margin=ppp*(qty+parseInt(test)) 
         profitmarginratio=(parseFloat(profitmargion / margin)*100).toFixed(3)

  }
  let test1=1
  if(qty!=""&&qty!=''){
    test1=parseInt(qty)
  }
  else{
    test1=1
  }
  var price=singleItem.new_price!=null?singleItem.new_price:singleItem.cost_price
        let item={
          drug_store:singleItem.drug_store,
          sub_agent:singleItem.sub_agent,
  
          products_id:singleItem.products_id,
          products_name : singleItem.products_name,
          
          final_price:ppp,
  
          price: singleItem.new_price !=null &&singleItem.new_price !=''?parseFloat(singleItem.new_price): parseFloat(singleItem.cost_price),
          
          customers_basket_quantity: parseInt(qty),
          image: BaseURL + '/' + singleItem.products_image,
          bounsArr:singleItem.bounces,
          test:parseInt(test),
          isCustom:false,
          unit:singleItem.units,
          // tax:singleItem.tax_description,
          // profit_margin: parseFloat(singleItem.profit_margin),
          // profit_margin_ratio:(singleItem.profitmarginratio),
          // testTaxF:0,
          // testTaxE:0,
          // testTaxS:0,
          tax:singleItem.tax_description,
          profit_margin: parseFloat(profitmargion),
          profit_margin_ratio:(profitmarginratio),
          testTaxF:testTaxF,
          testTaxE:testTaxE,
          testTaxS:testTaxS,
          f:ppp*test1,
          publicPrice:singleItem.products_price,
          
          redeem:0,
          bounsNum:this.state.bounsNum,
          testTaxF: singleItem.tax_description*parseFloat(singleItem.products_price),
      
        }
        this.props.addItemToOrder(item)

        showMessage({
          message: I18nManager.isRTL?'تمت اضافة العنصر بنجاح':'Added Successfully',
          type: "success",
        });
        this.setState({ExperienceArr:this.props.Order})
        console.log("this.props.Order89",this.props.Order)
  

      }
onOrderNOwPressed(){
  let taxes=parseFloat(testF)+parseFloat(testE)+parseFloat(testS).toFixed(3);
  let tota=(p).toFixed(3);
  // let b=this.state.custmizeBonusNum;
  // if(b>0){
  //     b=this.state.custmizeBonusNum
  // }else{
  //     b= this.state.selectedItem.products_quantity
  // }
  this.setState({popUpModal:false})
  a=[]
  for (let i = 0; i < this.state.products.length; i++) {
    a.push(
   `products[${i}][products_id]=${
     this.state.products[i].products_id
   }&products[${i}][customers_basket_quantity]=${
     this.state.products[i].customers_basket_quantity
   }
   &products[${i}][bounces]=${
    this.state.products[i].test
  }`
 );

}
//}

let b = a.toString();
b.replace(",", "&");

let arr=b
     .split(",")
     .join("&")
     
this.props.navigation.navigate("CheckoutScreen",{tota:tota,
  taxes: taxes,
screen:'cart',

orderArr:arr,
totalAfterTax:((p+parseFloat(testF)+parseFloat(testE)+parseFloat(testS)).toFixed(3))
});




  
}


async componentWillMount(){
  // const myArray = await AsyncStorage.getItem('@MySuperStore:key');
  // console.log("myarrayy",JSON.parse(await AsyncStorage.getItem('@MySuperStore:key')))
this.state.pressAction.addListener((v) => this.setState({value: v.value}));


if(this.props.Order !=undefined){

  for(let data=0;data<=this.props.Order.length;data++)
  {
    if(this.props.Order[data] !=undefined){

  let arr=[];
  if(this.props.Order[data].isCustom){
    this.props.Order[data].test=parseInt(this.props.Order[data].test)

  }else{
if(this.props.Order[data].bounsArr !=undefined){

    for(let r=0;r<=this.props.Order[data].bounsArr.length;r++){
      if(this.props.Order[data].bounsArr[r]!=undefined){
  
    arr.push (this.props.Order[data].bounsArr[r].type)
    
    }
    }}
  if(arr.includes('piece')&&arr.includes('percent')){
    if(this.props.Order[data].bounsArr !=undefined){
    for(let i=0;i<=this.props.Order[data].bounsArr.length;i++){
     
      if(this.props.Order[data].bounsArr[i]!=undefined){
      if(this.props.Order[data].customers_basket_quantity>=this.props.Order[data].bounsArr[i].qty_from-1){
   
  
        if(this.props.Order[data].bounsArr[i].type=='percent'){
          // test=this.state.bounsArr[i].bounces;
          this.props.Order[data].test=(this.props.Order[data].bounsArr[i].bounces)/100*this.props.Order[data].customers_basket_quantity
  
        }else{
      
  
          this.props.Order[data].test=parseInt(this.props.Order[data].bounsArr[i].bounces)*1
     
          if(this.props.Order[data].customers_basket_quantity>this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].qty_to){

        
            // this.props.Order[data].test=0 

    if(this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].greater_than!=0){
      if(this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].type=='percent'){
      parseInt((this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].bounces)/100*this.props.Order[data].customers_basket_quantity)
      }else{
        this.props.Order[data].test=parseInt(this.props.Order[data].bounsArr[this.state.bounsArr.length-1].bounces)

      }
    }else{
      this.props.Order[data].test=0 

    }
          }
        }
      
  
      }
    }
  }
if(this.props.Order[data].customers_basket_quantity>this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].qty_to){


    // this.props.Order[data].test=0 

    if(this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].greater_than!=0){
      if(this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].type=='percent'){
      parseInt((this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].bounces)/100*this.props.Order[data].customers_basket_quantity)
      }else{
        this.props.Order[data].test=parseInt(this.props.Order[data].bounsArr[this.state.bounsArr.length-1].bounces)

      }
    }else{
      this.props.Order[data].test=0 

    }
  }

}}else{
    let test=0;
    if(this.props.Order[data].bounsArr !=undefined){
    for(let i=0;i<=this.props.Order[data].bounsArr.length;i++){
     
      if(this.props.Order[data].bounsArr[i]!=undefined){
      if(this.props.Order[data].customers_basket_quantity>=this.props.Order[data].bounsArr[i].qty_from-1){
  
  
        if(this.props.Order[data].bounsArr[i].type=='percent'){
          // test=this.state.bounsArr[i].bounces;
          this.props.Order[data].test=(this.props.Order[data].bounsArr[i].bounces)/100*this.props.Order[data].customers_basket_quantity
  
        }else{
      
  
          this.props.Order[data].test=parseInt(this.props.Order[data].bounsArr[i].bounces)*1
  
          if(this.props.Order[data].customers_basket_quantity>this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].qty_to){
   
        
            // this.props.Order[data].test=0 

    if(this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].greater_than!=0){
      if(this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].type=='percent'){
      parseInt((this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].bounces)/100*this.props.Order[data].customers_basket_quantity)
      }else{
        this.props.Order[data].test=parseInt(this.props.Order[data].bounsArr[this.state.bounsArr.length-1].bounces)

      }
    }else{
      this.props.Order[data].test=0 

    }
          }
        }
    
  
      }}
    }}}
  }}
  }
  }

  try {
    await AsyncStorage.setItem('@MySuperStore:key', JSON.stringify(this.props.Order));

  } 
  catch (error) {
    // Error saving data
    console.log('errror when saving async arrray',error)
  }
}

handlePressIn=(data)=> {
  if(!listenerActive) {
    this.state.pressAction.addListener((v) => this.animationActionComplete(data));
    listenerActive = true;
  }
  Animated.timing(this.state.pressAction, {
      duration: ACTION_TIMER,
      toValue: 67,
  }).start();
}
handlePressOut() {
  this.state.pressAction.removeAllListeners();
  this.setState({pressAction: new Animated.Value(Math.ceil(this.state.value))});
  listenerActive = false;
}
handlePressInMin=(data)=> {
  if(!listenerActive) {
    this.state.pressAction.addListener((v) => this.animationActionCompleteMin(data));
    listenerActive = true;
  }
  Animated.timing(this.state.pressAction, {
      duration: ACTION_TIMER,
      toValue: 67,
  }).start();
}
handlePressOutMin() {
  this.state.pressAction.removeAllListeners();
  this.setState({pressAction: new Animated.Value(Math.ceil(this.state.value))});
  listenerActive = false;
}
  render() {
    AsyncStorage.setItem('@MySuperStore:key', JSON.stringify((this.props.Order)));
    console.log("this.state.ExperienceArr",this.state.ExperienceArr)

    i18n.fallbacks = true;
    i18n.translations = { ar, en };
       
    i18n.locale = this.state.myLang;
    console.log("this.props.order3333",this.props.Order)
   p= 0
    for(let i=0;i<this.props.Order.length;i++){
      this.props.Order[i].test=parseInt(this.props.Order[i].test)
    p=p+parseFloat( this.props.Order[i].f)
    }

if(this.props.Order.length==0){
  return(
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
            <Title style={[styles.header,{fontSize:25,width:Dimensions.get('window').width/2,fontFamily:'Acens',marginLeft:-10,color:'white'}]}>{i18n.t('cartTitle')}</Title>
          </Body>
      </Header> 

      <Content>
       
        <View style={{width:Dimensions.get('window').width,justifyContent:'center',alignItems:'center',flexDirection:'column',height:Dimensions.get('window').height/1.5,paddingBottom:30,flexDirection:'column'}}>
        <View style={{justifyContent:'center',alignItems:'center',width:'100%'}}>
          <Text style={{fontFamily: "Acens",
  fontSize: 15,marginTop:100,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0,
  textAlign: "left",
  color: "#777777"}} >{i18n.t('YourCartisEmpty')}</Text>
        </View>
        <View style={{ height:30}}/>
        <TouchableOpacity  style={{ width:Dimensions.get('window').width/1.15,height:44,backgroundColor:'#8FCFEB',flexDirection:'row',justifyContent:'center',alignItems:'center'
,marginBottom:30,}} onPress={() => this.props.navigation.navigate('Home')}>
          <Text style={{fontSize: 15,
  fontWeight: "normal",
  fontStyle: "normal",
  fontFamily:'Acens',
  lineHeight: 19,
  letterSpacing: 0.1,
  textAlign: "center",
  color: "#ffffff",}}>{i18n.t('explore')}</Text>
        </TouchableOpacity>
        {this.state.fArrTest?
        <TouchableOpacity 
            onPress={() => {
              this.onGetCartPressed()
          }}
          style={{ width:Dimensions.get('window').width/1.15,height:44,backgroundColor:'#8FCFEB',flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop: 5,marginBottom:30 }} 
 >
            <Text style={{fontSize: 15,
    fontWeight: "normal",
    fontStyle: "normal",
    fontFamily:'Acens',
    lineHeight: 19,
    letterSpacing: 0.1,
    textAlign: "center",
    color: "#ffffff"}}>{i18n.t('getcart')}</Text>
          </TouchableOpacity>
          :null}
   
        </View>
      </Content>

     
      <View style={{
  justifyContent: 'center',
  alignItems: 'center',}}>

<View >
      <View style={{ width: Dimensions.get('window').width,justifyContent:'space-between',alignItems:'center',paddingEnd:15,paddingStart:15,
  height: 60,flexDirection:'row',
  backgroundColor: 'white',borderTopColor:'gray',borderTopWidth:0.3
  
  }} >
  <TouchableOpacity
  onPress={() =>
    this.props.navigation.navigate('Home')

}
  style={{ width: Dimensions.get('window').width/6,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
   <Icon style={{color:'#c1c0c9',}} name={
      Platform.OS === 'ios'
        ? `md-home`
        : 'md-home'
    }/> 
    <Text style={{ fontFamily: "newFont",
fontSize: 10,
fontWeight: "normal",
fontStyle: "normal",
letterSpacing: 0,
color: "#c1c0c9"}}>{i18n.t('home')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{width: Dimensions.get('window').width/6, flexDirection:'column',justifyContent:'center',alignItems:'center'}}
       onPress={() =>
        this.props.navigation.navigate('WishListScreen')
  
    }
      >

  <Icon style={{color:'#c1c0c9',}} name={
      Platform.OS === 'ios'
        ? `md-heart`
        : 'md-heart'
    }/>
     <Text style={{ fontFamily: "newFont",
fontSize: 10,
fontWeight: "normal",
fontStyle: "normal",
letterSpacing: 0,
color: "#c1c0c9"}}>{i18n.t('wishlist')}</Text>
    </TouchableOpacity>
     
      {/* <View style={{width: Dimensions.get('window').width/4,
  height: 130,
  backgroundColor: 'white',
  borderTopEndRadius:80,borderTopStartRadius:80,justifyContent:'center',alignItems:'center'
  
  }} >
    <TouchableOpacity
   onPress={() => {
    this.setModalVisible(!this.state.popUpModal);
}}
   style={{ borderRadius:35,height:70,width:70,borderColor:'#8FCFEB',borderWidth:5,backgroundColor:'white',justifyContent:'center',alignItems:'center',marginTop:-35}}>
          <Image style={{width:50,height:50,resizeMode:'contain'}} source={require('../assets/images/logo.png')}/></TouchableOpacity>



  </View> */}


<TouchableOpacity 

onPress={() =>
  this.props.navigation.navigate('OrdersScreenOfTabs')

}
 style={{width: Dimensions.get('window').width/6,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>

   <Icon style={{color:'#c1c0c9',}} name={
        Platform.OS === 'ios'
          ? `md-paper`
          : 'md-paper'
      }/>
      <Text style={{ fontFamily: "newFont",
  fontSize: 10,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0,textAlign:'center',
  color: "#c1c0c9"}}>{i18n.t('orders')}</Text>
      </TouchableOpacity>
     

  <TouchableOpacity 
   onPress={() =>
    this.props.navigation.navigate('SettingsScreen')

}
  style={{width: Dimensions.get('window').width/6,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>

  <Icon style={{color:'#c1c0c9',}}  name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}/>
         <Text style={{ fontFamily: "newFont",
fontSize: 10,
fontWeight: "normal",
fontStyle: "normal",
letterSpacing: 0,
color: "#c1c0c9"}}>{i18n.t('settings')}</Text>
</TouchableOpacity>

</View>

    </View>   
  </View>
    </Container>
    </StyleProvider>
  )
}
    if(!this.props.Order){
      return (
        <View style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height,justifyContent:'center',alignItems:'center'}}>
     
        <ActivityIndicator  size="large" color="#8FCFEB" /> 
        </View>
        )
    }
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
              <Title style={[styles.header,{fontSize:25,width:Dimensions.get('window').width/2,fontFamily:'Acens',marginLeft:-10,color:'white'}]}>{i18n.t('cartTitle')}</Title>
            </Body>
        </Header> 

        <Content disableKBDismissScroll={true}>
          <List>
            {this.state.ExperienceArr.map((data, i) => (
// this.setState({profitmargintest:parseFloat(data.profit_margin.toFixed(3))})

              <ListItem  >

<View style={{flexDirection:'column',width:Dimensions.get('window').width,justifyContent:'center',paddingTop:10}}>
<View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingEnd:30,paddingStart:0}}>
<View style={{flexDirection:'row',alignItems:'center',}}>

<View style={{borderRadius:30,width:60,height:60,}}>
<Image style={{borderRadius:30,width:60,height:60}} source={{uri:data.image}}/>

</View>
<View style={{width:5}}/>
<View style={{flexDirection:'column',alignItems:'center',justifyContent:'center',width:"75%"}}>
<Text style={[styles.itemORGPrice,{fontSize:14,fontFamily: "newFont",textAlign:"left"}]} >
                    {data.products_name}
                  </Text>
{/* <Text style={[styles.itemORGPrice,{fontSize:11,color: "#8e8e8e",fontWeight:'normal',fontFamily: "numFont",}]} numberOfLines={1} note>
{parseFloat(data.f).toFixed(3)+`${i18n.t('jod')}`}
                  </Text> */}
</View>
</View>
<TouchableOpacity
                onPress={() => this.onDelete(data,i) }
                style={{justifyContent:'flex-start',alignItems:'flex-start'}}>
<Icon name='ios-close-circle-outline'  color='#b23536' style={{color:'#b23536',}} />
                            </TouchableOpacity>

</View>
{/* <View style={{width:Dimensions.get('window').width,paddingEnd:20,paddingStart:30,justifyContent:'flex-start'}}>
<View style={{flexDirection:'row',alignItems:'center',height:30}}><TouchableOpacity
               
                style={{justifyContent:'flex-start',alignItems:'flex-start',}}>
<Icon name='ios-checkmark-circle'  color='#8FCFEB' height={10} width={10} style={{color:'#8FCFEB',}} />
                            </TouchableOpacity>
                            <View style={{width:5}}/>
                            <Text style={[styles.itemORGPrice,{fontSize: 12,
  fontWeight: "500",
  fontStyle: "normal", fontFamily: "newFont",
}]} numberOfLines={1} note>
                    {parseFloat(data.final_price).toFixed(2)+`${i18n.t('jod')}`}
                  </Text>
                            </View>
</View> */}

                            {/* <View style={{width:'100%',height:1,opacity:0.1,paddingEnd:20,paddingStart:20,backgroundColor:'gray'}} /> */}
<View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center',}}>
{/* 
{data.bounsArr.length>0?
  (

<View style={{width:'42%',flexDirection:'row',}}>
        

      
           <Picker
                    mode="dialog"
                    iosIcon={<Icon name="md-arrow-dropdown" style={{color: "#7e7e7e", height:'100%',
                  }} />}
                    style={{width:Dimensions.get('window').width/4,height:35}}
                    selectedValue={this.state.selectedGrams}
                    onValueChange={this.onValueChangeGrams.bind(this)}
                  
                    itemTextStyle={{fontSize: 13,
                      fontWeight: "normal",
                      fontStyle: "normal", 
                      fontFamily: "Acens",color: '#8FCFEB'}}
                      textStyle={{fontSize: 13,
                        fontWeight: "normal",
                        fontStyle: "normal", 
                        fontFamily: "Acens",color: '#8FCFEB'}}
                >
                 {data.bounsArr.map((item, index) => {
return (<Picker.Item label={item.qty+'to'+item.bounces}  value={index} key={index} style={{fontSize: 13,
  fontWeight: "normal",
  fontStyle: "normal", 
  fontFamily: "Acens",color: '#8FCFEB'}}/>) 
})}

                   
                </Picker>
    
         
          </View>
  ):
  <View style={{width:'1%'}}/>
  
                  } */}
          </View>
          <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center',height:30,paddingStart:5}}>

<View style={{width:'47%',flexDirection:'row',alignItems:'center'}}>
<Text style={[styles.productPrice,{fontSize:13,fontFamily:'newFont',color:'#a3d8ec'}]} >{i18n.t('qty')}</Text>

 <TouchableOpacity 
  // onPress={()=>{this.onPlusPressed(data)}} 
  onPressIn={()=>this.handlePressInMin(data)} 
  onPressOut={()=>this.handlePressOutMin()}
  style={{width:25,height:25,backgroundColor:'white',justifyContent:'center',alignItems:'center',borderEndColor:'#E8E8E8',borderWidth:0,borderRadius:12.5,borderColor:'#E8E8E8'}}>
    <View style={{marginStart:5}}>
                        <Animated.View  />

                        <Image style={{width:25,height:25,resizeMode:'contain'}} source={ require('../assets/images/mmmminu.png')}/> 
 </View>
</TouchableOpacity>
<View style={{paddingEnd:17,paddingStart:17}}> 
 <Text style={{fontFamily:"numFont"}} >{data.customers_basket_quantity}</Text>
 
</View>
<TouchableOpacity 
  // onPress={()=>{this.onPlusPressed(data)}} 
  onPressIn={()=>this.handlePressIn(data)} 
  onPressOut={()=>this.handlePressOut()}
  style={{width:25,height:25,backgroundColor:'white',justifyContent:'center',alignItems:'center',borderEndColor:'#E8E8E8',borderWidth:0,borderRadius:12.5,borderColor:'#E8E8E8'}}>
    <View>
                        <Animated.View  />

 <Image style={{width:25,height:25,resizeMode:'contain'}} source={ require('../assets/images/ppplus.png')}/> 
 </View>
</TouchableOpacity> 
     

<View style={{width:'47%',flexDirection:'row',alignItems:'center'}}>
{/* <Text style={[styles.productPrice,{fontSize:13,fontFamily:'Poppins',color:'#a3d8ec'}]} >{i18n.t('qty')}</Text> */}
{/* <TouchableOpacity   onPress={()=>{this.onMainusPressed(data)}} style={{width:25,height:25,backgroundColor:'white',justifyContent:'center',alignItems:'center',borderEndColor:'#E8E8E8',borderWidth:0,borderRadius:12.5,borderColor:'#E8E8E8'}}>
<Image style={{width:20,height:20,resizeMode:'contain'}} source={ require('../assets/images/mmmminu.png')}/> 


</TouchableOpacity>
<View style={{paddingEnd:5,paddingStart:5}}> 
 <Text >{data.customers_basket_quantity}</Text>
 
</View>
<TouchableOpacity   onPress={()=>{this.onPlusPressed(data)}} style={{width:25,height:25,backgroundColor:'white',justifyContent:'center',alignItems:'center',borderEndColor:'#E8E8E8',borderWidth:0,borderRadius:12.5,borderColor:'#E8E8E8'}}>
 <Image style={{width:20,height:20,resizeMode:'contain'}} source={ require('../assets/images/ppplus.png')}/> 

</TouchableOpacity> */}
</View>
</View>

<View style={{width:'47%',flexDirection:'row',alignItems:'center'}}>
<Text style={[styles.productPrice,{fontSize:13,fontFamily:'numFont',color:'#a3d8ec'}]} >{i18n.t('price')}</Text>
<Text style={{ fontFamily: "numFont",fontSize:13,}}> {parseFloat(data.f).toFixed(3)+`${i18n.t('jod')}`}</Text>
</View>
</View>


          <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center',height:30,paddingStart:5}}>

<View style={{width:'47%',flexDirection:'row',alignItems:'center'}}>
<Text style={[styles.productPrice,{fontSize:13,fontFamily:'newFont',color:'#a3d8ec'}]} >{i18n.t('profitMargin')}</Text>
<Text style={{ fontFamily: "numFont",fontSize:13,}}>{parseFloat(data.profit_margin.toFixed(3))}{i18n.t('jod')}</Text>
</View>

<View style={{width:'47%',flexDirection:'row',alignItems:'center'}}>
<Text style={[styles.productPrice,{fontSize:11.5,fontFamily:'newFont',color:'#a3d8ec'}]} >{i18n.t('profitMarginRatio')}</Text>
<Text style={{ fontFamily: "numFont",fontSize:11,}}>{data.profit_margin_ratio}%</Text>
</View>
</View>




<View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center',height:30,paddingStart:5}}>

<View style={{width:'47%',flexDirection:'row',alignItems:'center'}}>
<Text style={[styles.productPrice,{fontSize:13,fontFamily:'newFont',color:'#a3d8ec'}]} >{i18n.t('Unit')}</Text>
<Text style={{ fontFamily: "newFont",fontSize:13,}}>{data.unit}</Text>
</View>

<View style={{width:'47%',flexDirection:'row',alignItems:'center'}}>
<Text style={[styles.productPrice,{fontSize:13,fontFamily:'newFont',color:'#a3d8ec'}]} >{i18n.t('tax')}</Text>
<Text style={{ fontFamily: "numFont",fontSize:13,}}>{data.tax}</Text>
</View>
</View>


<View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center',height:30,paddingStart:5}}>

<View style={{width:'47%',flexDirection:'row',alignItems:'center'}}>
<Text style={[styles.productPrice,{fontSize:13,fontFamily:'newFont',color:'#a3d8ec'}]}>{i18n.t('bonus')}</Text>
              
      <Text style={{ fontFamily: "numFont",fontSize:13,}}>{parseInt(data.test)}</Text>
</View>

<View style={{width:'47%',flexDirection:'row',alignItems:'center'}}>



{data.bounsArr!=null&&data.bounsArr!=undefined?
  data.bounsArr.length>0?
  (

      
      <View style={{flexDirection:'row',alignItems:'center',width:Dimensions.get('window').width/2.5,backgroundColor:'#E8E8E8',height:39}}>
    <TouchableOpacity style={{height:35,width:Dimensions.get('window').width/2.7,justifyContent:'flex-start',alignItems:'center',backgroundColor:'#E8E8E8',borderRadius:3,marginBottom:3}}>
            
    {data.bounsArr[data.bounsArr.length-1].greater_than==0?(
  
         <Picker
    //    onPress={() => {
    //     this.editPressed(data);
    // }}
                  mode="dialog"
                  // iosHeader={this.state.selected}
                  iosIcon={<Icon name="md-arrow-dropdown" style={{ color: "#7e7e7e", height:'100%',marginTop:-5,}} />}
                  style={{width:Dimensions.get('window').width/2.7,height:35,backgroundColor:'#E8E8E8',}}
                  selectedValue={this.state.selectedGrams}
                  onValueChange={value => { this.onValueChangeGrams(value,data) }}
                  // onValueChange={this.onValueChangeGrams(data).bind(this)}
                  // itemTextStyle={itemTextStyleICheckoutPicker}
                  // textStyle={textStyleInCheckoutPicker}
                  itemTextStyle={{fontSize: 13,
                    fontWeight: "normal",
                    fontStyle: "normal", 
                    fontFamily: "newFont",color: '#8FCFEB',width:'100%'}}
                    textStyle={{fontSize: 13,
                      fontWeight: "normal",
                      fontStyle: "normal", 
                      fontFamily: "newFont",color: '#8FCFEB'}}

                      iosHeader={(i18n.t('bonusavailable'))}
                      headerStyle={{ backgroundColor: "#8FCFEB" }}

              >
                <Picker.Item label={i18n.t('select')} value={0} /> 

               {data.bounsArr.map((item, index) => {

return (<Picker.Item label={item.type=='percent'? item.bounces+'%'+i18n.t('per') +item.qty_from+i18n.t('to')+item.qty_to:item.bounces+i18n.t('per') +item.qty_from+i18n.t('to')+item.qty_to}  value={index+1} key={index+1} style={{fontSize: 13,
  fontWeight: "normal",
fontStyle: "normal", 
fontFamily: "newFont",color: '#8FCFEB'}}/>) 

})}

<Picker.Item label={i18n.t('customizeYourBonus')} value='bounses' /> 
                
              </Picker>
    ):

    <Picker
    //    onPress={() => {
    //     this.editPressed(data);
    // }}
                  mode="dialog"
                  // iosHeader={this.state.selected}
                  iosIcon={<Icon name="md-arrow-dropdown" style={{ color: "#7e7e7e", height:'100%',marginTop:-5,}} />}
                  style={{width:Dimensions.get('window').width/2.7,height:35,backgroundColor:'#E8E8E8',}}
                  selectedValue={this.state.selectedGrams}
                  onValueChange={value => { this.onValueChangeGrams(value,data) }}
                  // onValueChange={this.onValueChangeGrams(data).bind(this)}
                  // itemTextStyle={itemTextStyleICheckoutPicker}
                  // textStyle={textStyleInCheckoutPicker}
                  itemTextStyle={{fontSize: 13,
                    fontWeight: "normal",
                    fontStyle: "normal", 
                    fontFamily: "newFont",color: '#8FCFEB',width:'100%'}}
                    textStyle={{fontSize: 13,
                      fontWeight: "normal",
                      fontStyle: "normal", 
                      fontFamily: "newFont",color: '#8FCFEB'}}

                      iosHeader={(i18n.t('bonusavailable'))}
                      headerStyle={{ backgroundColor: "#8FCFEB" }}

              >
                <Picker.Item label={i18n.t('select')} value={0} /> 

               {data.bounsArr.map((item, index) => {

return (<Picker.Item label={item.type=='percent'? item.bounces+'%'+i18n.t('per') +item.qty_from+i18n.t('to')+item.qty_to:item.bounces+i18n.t('per') +item.qty_from+i18n.t('to')+item.qty_to}  value={index+1} key={index+1} style={{fontSize: 13,
  fontWeight: "normal",
fontStyle: "normal", 
fontFamily: "newFont",color: '#8FCFEB'}}/>) 

})}
<Picker.Item label={data.bounsArr[data.bounsArr.length-1].type=='percent'? data.bounsArr[data.bounsArr.length-1].bounces+'% '+i18n.t('greaterthan') +data.bounsArr[data.bounsArr.length-1].qty_to:data.bounsArr[data.bounsArr.length-1].bounces+i18n.t('greaterthan')+ data.bounsArr[data.bounsArr.length-1].qty_to}  value={data.bounsArr.length+1} key={data.bounsArr.length+1} style={{fontSize: 13,
    // fontWeight: "normal",
fontStyle: "normal", width:100,
fontFamily: "numFont",color: '#8FCFEB'}}/>
<Picker.Item label={i18n.t('customizeYourBonus')} value='bounses' /> 
                
              </Picker>
    }


  </TouchableOpacity>
  {   Platform.OS=='android'?
    (
    <View style={{height:39,backgroundColor:'#E8E8E8',alignItems:'center',justifyContent:'center'}}>
    <Icon style={{  color:'gray',backgroundColor:'#E8E8E8',height:'100%'}} color='gray'
               name={
        Platform.OS === 'ios'
          ? `md-arrow-dropdown`
          : 'md-arrow-dropdown'
      }  />
      </View>
    ):
    null
    }
  </View>
       
  ):
  // <View style={{width:'1%'}}/>
  <View style={{flexDirection:'row',alignItems:'center',width:Dimensions.get('window').width/2.5,backgroundColor:'#E8E8E8',height:39}}>
  <TouchableOpacity style={{height:35,width:Dimensions.get('window').width/2.7,justifyContent:'flex-start',alignItems:'center',backgroundColor:'#E8E8E8',borderRadius:3,marginBottom:3}}>
          
  

       <Picker
  //    onPress={() => {
  //     this.editPressed(data);
  // }}
                mode="dialog"
                // iosHeader={this.state.selected}
                iosIcon={<Icon name="md-arrow-dropdown" style={{ color: "#7e7e7e", height:'100%',marginTop:-5,}} />}
                style={{width:Dimensions.get('window').width/2.7,height:35,backgroundColor:'#E8E8E8',}}
                selectedValue={this.state.selectedGramsCustom}
                onValueChange={value => { this.onValueChangeGramsCustom(value,data) }}

                // onValueChange={this.onValueChangeGrams(data).bind(this)}
                // itemTextStyle={itemTextStyleICheckoutPicker}
                // textStyle={textStyleInCheckoutPicker}
                itemTextStyle={{fontSize: 13,
                  fontWeight: "normal",
                  fontStyle: "normal", 
                  fontFamily: "newFont",color: '#8FCFEB',width:'100%'}}
                  textStyle={{fontSize: 13,
                    fontWeight: "normal",
                    fontStyle: "normal", 
                    fontFamily: "newFont",color: '#8FCFEB'}}

                    iosHeader={(i18n.t('bonusavailable'))}
                    headerStyle={{ backgroundColor: "#8FCFEB" }}

            >
              <Picker.Item label={i18n.t('availablebonuses')} value={1} /> 

             {/* {data.bounsArr.map((item, index) => {

return (<Picker.Item label={item.type=='percent'? item.bounces+'%'+i18n.t('per') +item.qty_from+i18n.t('to')+item.qty_to:item.bounces+i18n.t('per') +item.qty_from+i18n.t('to')+item.qty_to}  value={index} key={index} style={{fontSize: 13,
fontWeight: "normal",
fontStyle: "normal", 
fontFamily: "newFont",color: '#8FCFEB'}}/>) 

})} */}

<Picker.Item label={i18n.t('customizeYourBonus')} value='bounses' /> 

            </Picker>
</TouchableOpacity>
{   Platform.OS=='android'?
  (
  <View style={{height:39,backgroundColor:'#E8E8E8',alignItems:'center',justifyContent:'center'}}>
  <Icon style={{  color:'gray',backgroundColor:'#E8E8E8',height:'100%'}} color='gray'
             name={
      Platform.OS === 'ios'
        ? `md-arrow-dropdown`
        : 'md-arrow-dropdown'
    }  />
    </View>
  ):
  null
  }
</View>
:null}


{/* <TouchableOpacity style={{backgroundColor:'#8FCFEB',height:25,justifyContent:'center',alignItems:'center',borderRadius:3}}>
  <Text style={{ fontFamily: "newFont",fontSize:9, fontWeight: "normal",
    fontStyle: "normal",
    
    
    letterSpacing: 0.1,
    textAlign: "center",
    color: "#ffffff"}}> Customize Your Bonus </Text>
</TouchableOpacity> */}
</View>
</View>


<View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center',height:30,paddingStart:5}}>

<View style={{width:'47%',flexDirection:'row',alignItems:'center'}}>
<Text style={[styles.productPrice,{fontSize:13,fontFamily:'newFont',color:'#a3d8ec'}]}>{i18n.t('drugStore')}</Text>
              
      <Text style={{ fontFamily: "numFont",fontSize:13,}}>{data.drug_store}{data.sub_agent}</Text>
</View>

<View style={{width:'47%',flexDirection:'row',alignItems:'center'}}></View>
</View>

</View>



 


{/* 
              <View style={{width:'90%',flexDirection:'row'}}>
              
                                <View style={{borderBottomColor:'white',borderBottomWidth:0,flexDirection:'row'}} >

                <Left>
                  <Thumbnail square style={styles.image} size={55} source={{uri:data.image}} />
                </Left>

                <Body style={{width:200}}>
                  <View style={{width:200}}>
                  <Text style={[styles.itemORGPrice,{width:'100%',fontSize:14}]} numberOfLines={1} note>
                    {data.products_name}
                  </Text>
                  </View>
                  <Text style={[styles.itemORGPrice,{fontSize:14,marginTop:17}]} numberOfLines={1} note>
                    {parseFloat(data.final_price).toFixed(2)+`${i18n.t('jod')}`}
                  </Text>
                </Body>
                <Right style={{justifyContent:'flex-end',marginEnd:-20}}>
                  <View style={{width:100,flexDirection:'row',borderWidth:1,borderRadius:2,borderColor:'#8FCFEB',justifyContent:'space-between',marginTop:30}}>
                  

                
                 
                   <TouchableOpacity  disabled={data.redeem?true:false}
                    onPress={()=>{this.onMainusPressed(data)}}
                  style={{width:25,height:25,backgroundColor:data.redeem?'gray':'#8FCFEB',justifyContent:'center',alignItems:'center',}}><Text style={{color:'white'}}>-</Text></TouchableOpacity>
                   <Text>{data.customers_basket_quantity}</Text>
 <TouchableOpacity disabled={data.redeem?true:false} style={{width:25,height:25,backgroundColor:data.redeem?'gray':'#8FCFEB',justifyContent:'center',alignItems:'center',}}
                  onPress={()=>{this.onPlusPressed(data)}}
                  ><Text style={{color:'white'}}>+</Text></TouchableOpacity>
                  </View>
                  
                </Right>

                </View>
                <TouchableOpacity
                onPress={() => this.onDelete(data,i) }
                style={{justifyContent:'flex-start',alignItems:'flex-start'}}>
<Icon name='ios-close-circle-outline'  color='#b23536' style={{color:'#b23536',}} />
                            </TouchableOpacity>
                </View>
               */}

              </ListItem>
            ))}
          </List>
          <View style={{width:Dimensions.get('window').width,justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
         <View style={{flexDirection:'row',marginTop: 50, justifyContent:'space-between',width:'90%'}}>
         
<Text style={{fontFamily: "Acens",
  fontSize: 15,
  fontWeight: "500",
  fontStyle: "normal",
  letterSpacing: 0,
  textAlign: "left",
  color: "#777777"}}>{i18n.t('grandTotal')}</Text>
<Text style={{fontFamily: "numFont",
  fontSize: 15,
  fontWeight: "500",
  fontStyle: "normal",
  letterSpacing: 0,
  textAlign: "left",
  color: "#4d4d4d"}}>{(p).toFixed(3)}{i18n.t('jod')}</Text>
         </View>

         <View style={{flexDirection:'row',marginTop: 10, justifyContent:'space-between',width:'90%'}}>
         
         <Text style={{fontFamily: "numFont",
           fontSize: 15,
           fontWeight: "500",
           fontStyle: "normal",
           letterSpacing: 0,
           textAlign: "left",
           color: "#777777"}}>{i18n.t('tax4')}</Text>
         <Text style={{fontFamily: "numFont",
           fontSize: 15,
           fontWeight: "500",
           fontStyle: "normal",
           letterSpacing: 0,
           textAlign: "left",
           color: "#4d4d4d"}}>{testF.toFixed(3)}{i18n.t('jod')}</Text>
                  </View>

                  <View style={{flexDirection:'row',marginTop: 10, justifyContent:'space-between',width:'90%'}}>
         
         <Text style={{fontFamily: "numFont",
           fontSize: 15,
           fontWeight: "500",
           fontStyle: "normal",
           letterSpacing: 0,
           textAlign: "left",
           color: "#777777"}}>{i18n.t('tax8')}</Text>
         <Text style={{fontFamily: "numFont",
           fontSize: 15,
           fontWeight: "500",
           fontStyle: "normal",
           letterSpacing: 0,
           textAlign: "left",
           color: "#4d4d4d"}}>{testE.toFixed(3)}{i18n.t('jod')}</Text>
                  </View>

                  <View style={{flexDirection:'row',marginTop: 10, justifyContent:'space-between',width:'90%'}}>
         
         <Text style={{fontFamily: "numFont",
           fontSize: 15,
           fontWeight: "500",
           fontStyle: "normal",
           letterSpacing: 0,
           textAlign: "left",
           color: "#777777"}}>{i18n.t('tax16')}</Text>
         <Text style={{fontFamily: "numFont",
           fontSize: 15,
           fontWeight: "500",
           fontStyle: "normal",
           letterSpacing: 0,
           textAlign: "left",
           color: "#4d4d4d"}}>{testS.toFixed(3)}{i18n.t('jod')}</Text>
</View>
<View style={{flexDirection:'row',marginTop: 17, justifyContent:'space-between',width:'90%'}}>
         
         <Text style={{fontFamily: "Acens",
           fontSize: 15,
           fontWeight: "500",
           fontStyle: "normal",
           letterSpacing: 0,
           textAlign: "left",
           color: "#777777"}}>{i18n.t('taxtotal')}</Text>
<Text style={{fontFamily: "numFont",
           fontSize: 15,
           fontWeight: "500",
           fontStyle: "normal",
           letterSpacing: 0,
           textAlign: "left",
           color: "#4d4d4d"}}>{(parseFloat(testF)+parseFloat(testE)+parseFloat(testS)).toFixed(3)}{i18n.t('jod')}</Text>
                  </View>
       
         <View style={{flexDirection:'row',marginTop: 50, justifyContent:'space-between',width:'90%'}}>
         
         <Text style={{fontFamily: "Acens",
           fontSize: 19,
           fontWeight: "500",
           fontStyle: "normal",
           letterSpacing: 0,
           textAlign: "left",
           color: "#777777"}}>{i18n.t('total')}</Text>
         <Text style={{fontFamily: "numFont",
           fontSize: 19,
           fontWeight: "500",
           fontStyle: "normal",
           letterSpacing: 0,
           textAlign: "left",
           color: "#4d4d4d"}}>{((p+parseFloat(testF)+parseFloat(testE)+parseFloat(testS)).toFixed(3))}{i18n.t('jod')}</Text>
                  </View>
                 
          <TouchableOpacity 
            onPress={() => {
              // this.setPopUpModalVisible(!this.state.popUpModal);
              this.onOrderNOwPressed()
          }}
          style={{ width:Dimensions.get('window').width/1.15,height:44,backgroundColor:'#8FCFEB',flexDirection:'row',justifyContent:'center',alignItems:'center'
 ,marginTop: 5 ,marginBottom:10,}} 
//  onPress={() => this.props.navigation.navigate('GetCurrentLocation',{finalPrice:p})}
 >
            <Text style={{fontSize: 15,
    fontWeight: "normal",
    fontStyle: "normal",
    fontFamily:'Acens',
    lineHeight: 19,
    letterSpacing: 0.1,
    textAlign: "center",
    color: "#ffffff"}}>{i18n.t('checkOut')}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => {
              this.onsaveCartPressed(this.state.ExperienceArr)
          }}
          style={{ width:Dimensions.get('window').width/1.15,height:44,backgroundColor:'#8FCFEB',flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop: 5,marginBottom:30 }} 
 >
            <Text style={{fontSize: 15,
    fontWeight: "normal",
    fontStyle: "normal",
    fontFamily:'Acens',
    lineHeight: 19,
    letterSpacing: 0.1,
    textAlign: "center",
    color: "#ffffff"}}>{i18n.t('savecart')}</Text>
          </TouchableOpacity>
          {this.state.fArrTest?

          <TouchableOpacity 
            onPress={() => {
              this.onGetCartPressed()
          }}
          style={{ width:Dimensions.get('window').width/1.15,height:44,backgroundColor:'#8FCFEB',flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:-13 }} 
 >
            <Text style={{fontSize: 15,
    fontWeight: "normal",
    fontStyle: "normal",
    fontFamily:'Acens',
    lineHeight: 19,
    letterSpacing: 0.1,
    textAlign: "center",
    color: "#ffffff"}}>{i18n.t('getcart')}</Text>
          </TouchableOpacity>
          :null}
          </View>
        </Content>

        <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.popUpModalCalender}
                        onRequestClose={() => {
                            this.setPopUpModalVisibleCalender(false);
                        }}>
                        <View style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height/2.2,justifyContent:'center',alignItems:'center'}}>
                        <View style={{ backgroundColor: 'transparent', margin: 5 }}>
<DatePicker

style={{
  backgroundColor: "#E8E8E8",
  borderRadius: 0,
  borderRadius: 0,
  alignItems: "center",
  justifyContent: "center",
  width: '90%',
  borderRadius: 0,
  borderBottomWidth: 0,
  borderLeftWidth: 0,
  ...Platform.select({
    ios: {
      paddingLeft: 45
    },
    android: {
      paddingLeft: 20
    }
  }),
  height: 50
}}
customStyles={{
  dateInput: {
    borderWidth: 0,
    color: "black",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    fontWeight: "normal",
    fontStyle: "normal",
    fontFamily: "helivet",
    color: "#86764f",
    textAlign: "center",
    fontSize: 13
  },
  placeholderText: {
    fontSize: 13,
    fontWeight: "normal",
    fontStyle: "normal",
    fontFamily: "helivet",
    color: "#86764f"
  },
  dateText: {
    fontSize: 13,
    fontWeight: "normal",
    fontStyle: "normal",
    fontFamily: "helivet",
    color: "#86764f",
    justifyContent: "flex-start"
    // fontFamily: 'newFont',
  }
}}
iconSource={null}
date={this.state.chosenDate}
mode="date"
minDate={date}
maxDate={dat}
duration={0}
placeholder="YYYY-MM-DD"
format="YYYY-MM-DD"
confirmBtnText="Confirme"
ref={ref => (this.datePicker = ref)}
cancelBtnText="Cancle"
onDateChange={date => {
 this.onConfiremPressed(date);
}}
/>
</View>
</View>
                       </Modal>








                       <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.isBounasModalVisible}
                        onRequestClose={() => {
                            this.setBounsModalVisibleRef(false);
                        }}>
                        <View style={{ marginTop: 90, marginEnd: 20, marginStart: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Card style={{ borderRadius: 0 }}>
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
                                    <View style={{flexDirection:'row',width:'100%',}}>
                                    <View  style={{width:10, justifyContent:'flex-end',alignItems:'center'}}  />
                                  <TouchableOpacity 
                                 onPress={()=>{this.setBounsModalVisibleRef(false)}}
>  
 <Icon style={{color:'white',}} name={
        Platform.OS === 'ios'
          ? `md-close`
          : 'md-close'
      }/>
                                    {/* <Text style={{width:30,height:30,fontSize: 23, color: 'white', marginEnd:-20,marginStart:10,marginTop:-5}}>x</Text> */}
                                    </TouchableOpacity>
                                        <Text style={{ fontSize: 13, color: 'white', fontFamily: 'Acens',width:Dimensions.get('window').width/1.67,textAlign:'center',marginBottom:-7 }}>{i18n.t('customizeYourBonus')}</Text>
                                      
                                       </View>
                                       </View>
                                       <View style={{height:Dimensions.get('window').height/3.7,paddingTop:20}}>

                                       {/* <TextInput 
                 onChangeText={(text) => this.setState({emailForfet:text})}
                placeholderTextColor='#777777' placeholder='EMAIL' style={[emailInputStyle,{width:Dimensions.get('window').width/1.5}]}>

                </TextInput> */}
              
               
              <Text
                   
                   style={{ 
                    marginTop:7,
                    marginBottom:3,
                      width:Dimensions.get('window').width/1.7,
                      alignItems:'center',
                      borderBottomColor:'#c1c0c9',
                      fontSize: 16,fontFamily: "newFont",
                fontWeight: "normal",
                fontStyle: "normal",
              //   lineHeight: 11,
                letterSpacing: 0,
                color: "#777777"}} >{i18n.t('enterYourBonus')}</Text>
                            <TextInput 
                            returnKeyType='done'
                            keyboardType='numeric'
                            placeholder='0'
                            // editable={false}
                             onChangeText={(text)=>this.setState({custmizeBonusNum:text,
                                rowData: Object.assign({}, this.state.rowData, { id: 30,address_name:text, })
}) }
                                            //  onChangeText={(text) => this.setState({street:text})}

                            style={{height:40,borderWidth:1,borderColor:this.state.addressNameBorder,textAlign:'center',justifyContent:'center',alignItems:'center',borderRadius:3,marginTop:0}} />




                                {/* </View> */}

                </View>
                
                <TouchableOpacity 
            onPress={() => {
             this.doneBtn();
          }}
          style={{ width:Dimensions.get('window').width/1.7,height:44,backgroundColor:'#8FCFEB',flexDirection:'row',justifyContent:'center',alignItems:'center'
 ,marginTop: 10 ,marginBottom:30,}} 
//  onPress={() => this.props.navigation.navigate('GetCurrentLocation',{finalPrice:p})}
 >
            <Text style={{fontSize: 15,
    fontWeight: "normal",
    fontStyle: "normal",
    fontFamily:'Acens',
    lineHeight: 19,
    letterSpacing: 0.1,
    textAlign: "center",
    color: "#ffffff"}}>{i18n.t('done')}</Text>
          </TouchableOpacity>


                                    </View>
                                    
                                {/* </View> */}
                            </Card>
                            
                        </View>

                    </Modal>





        <Modal
        
                        animationType="slide"
                        transparent={true}
                        visible={this.state.popUpModal}
                        onRequestClose={() => {
                            this.setPopUpModalVisible(false);
                        }}>
                        <View style={[MyAddressStyle.model,{borderRadius:10,height:Dimensions.get('window').height-150,marginTop:99}]}>
						<View style={[MyAddressStyle.modell,{borderRadius:0}]}>
							<View style={MyAddressStyle.modalHeader}>
								<TouchableOpacity
									onPress={() => {
										this.setState({ popUpModal: false });
									}}>
									<Text style={[MyAddressStyle.cancelApplyTxt,{color:'#8FCFEB',fontFamily: "newFont",}]}>{i18n.t('cancel')}</Text>
								</TouchableOpacity>

								<Text style={[MyAddressStyle.cancelApplyTxttt,{color:'#8FCFEB',fontFamily: "newFont",	paddingLeft: Dimensions.get('window').width/8}]}>{i18n.t('checkOut')}</Text>

								<View
                                style={{flexDirection:'row',marginLeft: Dimensions.get('window').width/5}}
									// onPress={() => {
                  //                       this.onSavePressed()
									// }}
                  >
									{/* <Text style={[MyAddressStyle.cancelApplyTxtt,{color:'#8FCFEB',fontFamily: "newFont",paddingLeft: Dimensions.get('window').width/8}]}>Save  </Text> */}
								</View>
							</View>
                            <ScrollView>
                            <View style={MyAddressStyle.floatingView}>
                
                            <View style={{ height: 10 }} />
                            <Text
                   
                   style={{ 
                    marginTop:7,
                    marginBottom:3,
                      width:Dimensions.get('window').width/1.2,
                      alignItems:'center',
                      borderBottomColor:'#c1c0c9',
                      fontSize: 20,fontFamily: "newFont",
                fontWeight: "normal",
                fontStyle: "normal",
              //   lineHeight: 11,
                letterSpacing: 0,
                color: "#777777"}} >{i18n.t('typeOfOrder')}</Text>

<View style={{width:'100%',justifyContent:'space-between',flexDirection:'row'}}>

<TouchableOpacity 
onPress={()=>{this.deffultPressed()}}

style={{width:'32.5%',height:45,backgroundColor:this.state.defaultBackgroundColor,justifyContent:'center',alignItems:'center',borderRadius:0,
shadowOffset: {
  width: 0,
  height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,}}>
<Text style={{fontFamily: 'newFont',
fontSize: 13,
fontWeight: this.state.defultTextWeight,
fontStyle: "normal",
letterSpacing: 0,
color: this.state.defultTextColor}}>{i18n.t('deffult')}</Text>

</TouchableOpacity>
<TouchableOpacity 
onPress={()=>{this.urgentPressed()}}
style={{width:'32.5%',height:45,backgroundColor:this.state.urgentBackgroundColor,justifyContent:'center',alignItems:'center',borderRadius:0,
shadowOffset: {
  width: 0,
  height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,}}>
<Text style={{fontFamily: 'newFont',
fontSize: 13,
fontWeight: this.state.urgentTextWeight,
fontStyle: "normal",
letterSpacing: 0,
color: this.state.urgentTextColor}}>{i18n.t('urgent')}</Text>

</TouchableOpacity>

<TouchableOpacity 


style={{width:'32.5%',height:45,backgroundColor:this.state.latterBookingBackgroundColor,justifyContent:'center',alignItems:'center',borderRadius:0,
shadowOffset: {
  width: 0,
  height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,}}>
<DatePicker
onPress={()=>{this.latterBookingPressed()}}
style={{
  backgroundColor: this.state.latterBookingBackgroundColor,
  borderRadius: 0,
  borderRadius: 0,
  alignItems: "center",
  justifyContent: "center",
  width: '100%',
  borderRadius: 0,
  borderBottomWidth: 0,
  borderLeftWidth: 0,
  ...Platform.select({
    ios: {
      paddingLeft: 0
    },
    android: {
      paddingLeft: 0
    }
  }),
  height: 45
}}
customStyles={{
  dateInput: {
    borderWidth: 0,
    width:'100%',
    color: "black",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    fontWeight: "normal",
    fontStyle: "normal",
    fontFamily: "helivet",
    color: "#86764f",
    textAlign: "center",
    fontSize: 13
  },
  placeholderText: {
    fontFamily: 'newFont',
    fontSize: 13,
    fontWeight: this.state.latteerBookingTextWeight,
    fontStyle: "normal",
    letterSpacing: 0,
    color: this.state.latterBookingTextColor
  },
  dateText: {
    fontFamily: 'newFont',
    fontSize: 13,
    fontWeight: this.state.latteerBookingTextWeight,
    fontStyle: "normal",
    letterSpacing: 0,
    color: this.state.latterBookingTextColor
    // fontFamily: 'newFont',
  }
}}
iconSource={null}
// date={this.state.chosenDate}
date=""
showIcon = {false}
mode="date"
minDate={date}
maxDate={dat}
duration={0}
placeholder={i18n.t('latterBooking')}
format="YYYY-MM-DD"
confirmBtnText="Confirme"
ref={ref => (this.datePicker = ref)}
cancelBtnText="Cancle"
onDateChange={date => {
 this.onConfiremPressed(date);
}}
/>
</TouchableOpacity>
</View>

     
       <View style={{ height: 10 }} />
       <Text
                   
                   style={{ 
                    marginTop:7,
                    marginBottom:3,
                      width:Dimensions.get('window').width/1.2,
                      alignItems:'center',
                      borderBottomColor:'#c1c0c9',
                      fontSize: 20,fontFamily: "newFont",
                fontWeight: "normal",
                fontStyle: "normal",
              //   lineHeight: 11,
                letterSpacing: 0,
                color: "#777777"}} > {i18n.t('check_out')}</Text>


<View style={{width:'100%',justifyContent:'space-between',flexDirection:'row'}}>

<View 
onPress={()=>{this.latterBookingPressed()}}

style={{width:'95%',height:45,backgroundColor:this.state.latterBookingBackgroundColor,justifyContent:'space-between',alignItems:'center',borderRadius:0,flexDirection:'row',
shadowOffset: {
  width: 0,
  height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,backgroundColor:'#8FCFEB',borderRadius:11,paddingEnd:5,paddingStart:5}}>
<Text style={{fontFamily: 'newFont',
fontSize: 13,
fontWeight:'bold',
fontStyle: "normal",
letterSpacing: 0,
color: 'gray'}}>{i18n.t('cod')}</Text>
<Text style={{fontFamily: 'numFont',
fontSize: 13,
fontWeight: 'bold',
fontStyle: "normal",
letterSpacing: 0,
color: 'white'}}>
{p}{i18n.t('jod')}</Text>

</View>

</View>

<Text
                   
                   style={{ 
                    marginTop:7,
                    marginBottom:3,
                      width:Dimensions.get('window').width/1.2,
                      alignItems:'center',
                      borderBottomColor:'#c1c0c9',
                      fontSize: 16,fontFamily: "newFont",
                fontWeight: "normal",
                fontStyle: "normal",
              //   lineHeight: 11,
                letterSpacing: 0,
                color: "#777777"}} >{i18n.t('name')}</Text>
                            <TextInput 
                            placeholder={this.state.firstNmae +' '+ this.state.lastName}
                            editable={false}
                             onChangeText={(text)=>this.setState({firstName:text,
                                rowData: Object.assign({}, this.state.rowData, { id: 30,address_name:text, })
}) }
                                            //  onChangeText={(text) => this.setState({street:text})}

                            style={{height:40,borderWidth:1,borderColor:this.state.addressNameBorder,textAlign:'center',justifyContent:'center',alignItems:'center',borderRadius:3,marginTop:0}} />

						

								<View style={{ height: 10 }} />
                                {/* </View> */}


                               

       <View style={{flexDirection:'column',justifyContent:'flex-start'}}>

						

<View style={{height:10}}/>

       <Text
                   
                   style={{ 
                    marginTop:7,
                    marginBottom:3,
                      width:Dimensions.get('window').width/1.2,
                      alignItems:'center',
                      borderBottomColor:'#c1c0c9',
                      fontSize: 16,fontFamily: "newFont",
                fontWeight: "normal",
                fontStyle: "normal",
              //   lineHeight: 11,
                letterSpacing: 0,
                color: "#777777"}} >{i18n.t('email')}</Text>
                            <TextInput 
                             placeholder={this.state.userEmail}
                             editable={false}
                             onChangeText={(text)=>this.setState({email:text,
                                rowData: Object.assign({}, this.state.rowData, { id: 30,street_name:text, })
}) }
                                            //  onChangeText={(text) => this.setState({street:text})}

                            style={{height:40,borderWidth:1,borderColor:this.state.streetBorder,textAlign:'center',justifyContent:'center',alignItems:'center',borderRadius:3,marginTop:0}} />

							

								<View style={{ height: 10 }} />
                                {/* </View> */}

                                <Text
                   
                   style={{ 
                    marginTop:7,
                    marginBottom:3,
                      width:Dimensions.get('window').width/1.2,
                      alignItems:'center',
                      borderBottomColor:'#c1c0c9',
                      fontSize: 16,fontFamily:'newFont',
                fontWeight: "normal",
                fontStyle: "normal",
              //   lineHeight: 11,
                letterSpacing: 0,
                color: "#777777"}} >{i18n.t('pharmacyName')}</Text>
                                <TextInput 
                                 placeholder={this.state.pharmcyNmae}
                                 editable={false}
                                onChangeText={(text)=>this.setState({pharmacy_name:text,
                                           rowData: Object.assign({}, this.state.rowData, { id: 30,building:text, })
}) }
                                                //  onChangeText={(text) => this.setState({building:text,rowData})}

                                style={{height:40,borderWidth:1,borderColor:'#E8E8E8',textAlign:'center',justifyContent:'center',alignItems:'center',borderRadius:3}}/>

							

								<View style={{ height: 10 }} />
                                {/* <Text
                   
                   style={{ 
                    marginTop:7,
                    marginBottom:3,
                      width:Dimensions.get('window').width/1.2,
                      alignItems:'center',
                      borderBottomColor:'#c1c0c9',
                      fontSize: 16,fontFamily:'newFont',
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                color: "#777777"}} >Pharmacy Number</Text>
                                <TextInput
                                 editable={false}
                                 onChangeText={(text)=>this.setState({pharmacy_num:text,
                                    rowData: Object.assign({}, this.state.rowData, { id: 30,floor:text, })
}) }

                                style={{height:40,borderWidth:1,borderColor:'#E8E8E8',textAlign:'center',justifyContent:'center',alignItems:'center',borderRadius:3,fontFamily: "newFont",}} />

						

<View style={{width:10}}/> */}
	</View>
                            <Text
                   
                   style={{ 
                     
                    marginTop:7,
                    marginBottom:3,
                      width:Dimensions.get('window').width/1.2,
                      alignItems:'center',
                      borderBottomColor:'#c1c0c9',
                      fontSize: 16,fontFamily: "newFont",
                fontWeight: "normal",
                fontStyle: "normal",
              //   lineHeight: 11,
                letterSpacing: 0,
                color: "#777777"}} >{i18n.t('country')}</Text>
                                <TextInput 
                                 placeholder={i18n.t('jordan')}
                                 editable={false}
                                                //  onChangeText={(text) => this.setState({aprtmentNo:text})}
                                                onChangeText={(text)=>this.setState({country:text,
                                                    rowData: Object.assign({}, this.state.rowData, { id: 30,apartmentno:text, })
         }) }
                                style={{height:40,borderWidth:1,borderColor:'#E8E8E8',textAlign:'center',justifyContent:'center',alignItems:'center',borderRadius:3,marginTop:0}} />

						
                               
                               

							                                         <View style={{height:30}}/>

							</View>
                            
						{/* </View> */}
                        </ScrollView>
                        </View>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',width:'100%'}}>
                    
                    <TouchableOpacity 
// onPress={()=>{this.deffultPressed()}}

style={{width:'47.17%',height:45,backgroundColor:'#8FCFEB',justifyContent:'center',alignItems:'center',borderRadius:0,
shadowOffset: {
  width: 0,
  height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,borderBottomStartRadius:7,flexDirection:'column'}}>
<Text style={{fontFamily: 'newFont',
fontSize: 13,
fontWeight: 'bold',
fontStyle: "normal",
letterSpacing: 0,
color: 'gray'}}> {i18n.t('paymentAmount')}</Text>
<Text style={{fontFamily: 'numFont',
fontSize: 13,
fontWeight: 'bold',
fontStyle: "normal",
letterSpacing: 0,
color: 'gray'}}>{((p+parseFloat(testF)+parseFloat(testE)+parseFloat(testS)).toFixed(3))}{i18n.t('jod')}
</Text>

</TouchableOpacity>
<View style={{height:45,width:1,opacity:0.01,backgroundColor:'gray'}}/>
<TouchableOpacity 
onPress={()=>{this.onOrderNOwPressed()}}

style={{width:'47.17%',height:45,backgroundColor:'#8FCFEB',justifyContent:'center',alignItems:'center',borderRadius:0,
shadowOffset: {
  width: 0,
  height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,borderBottomEndRadius:7,

elevation: 5,}}>
<Text style={{fontFamily: 'newFont',
fontSize: 13,
fontWeight: 'bold',
fontStyle: "normal",
letterSpacing: 0,
color: 'gray'}}> {i18n.t('makePurchase')}</Text>

</TouchableOpacity>
                    </View>
                        </View>

                    </Modal>




      
                    <View style={{
    justifyContent: 'center',
    alignItems: 'center',}}>
 
 <View >
        <View style={{ shadowColor: "black",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  , width: Dimensions.get('window').width,justifyContent:'space-between',alignItems:'center',paddingEnd:15,paddingStart:15,
    height: 60,flexDirection:'row',
    backgroundColor: 'white',borderTopColor:'gray',borderTopWidth:0.3
    
    }} >
    <TouchableOpacity
    onPress={() =>
      this.props.navigation.navigate('Home')

  }
    style={{ width: Dimensions.get('window').width/6,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
     <Icon style={{color:'#c1c0c9',}} name={
        Platform.OS === 'ios'
          ? `md-home`
          : 'md-home'
      }/> 
      <Text style={{ fontFamily: "newFont",
  fontSize: 10,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0,
  color: "#c1c0c9"}}>{i18n.t('home')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{width: Dimensions.get('window').width/6, flexDirection:'column',justifyContent:'center',alignItems:'center'}}
         onPress={() =>
          this.props.navigation.navigate('WishListScreen')
    
      }
        >

    <Icon style={{color:'#c1c0c9',}} name={
        Platform.OS === 'ios'
          ? `md-heart`
          : 'md-heart'
      }/>
       <Text style={{ fontFamily: "newFont",
  fontSize: 10,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0,
  color: "#c1c0c9"}}>{i18n.t('wishlist')}</Text>
      </TouchableOpacity>
       
        {/* <View style={{width: Dimensions.get('window').width/4,
    height: 130,
    backgroundColor: 'white',
    borderTopEndRadius:80,borderTopStartRadius:80,justifyContent:'center',alignItems:'center'
    
    }} >
      <TouchableOpacity
     onPress={() => {
      this.setModalVisible(!this.state.popUpModal);
  }}
     style={{ borderRadius:35,height:70,width:70,borderColor:'#8FCFEB',borderWidth:5,backgroundColor:'white',justifyContent:'center',alignItems:'center',marginTop:-35}}>
            <Image style={{width:50,height:50,resizeMode:'contain'}} source={require('../assets/images/logo.png')}/></TouchableOpacity>



    </View> */}

<TouchableOpacity 

onPress={() =>
  this.props.navigation.navigate('OrdersScreenOfTabs')

}
 style={{width: Dimensions.get('window').width/6,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>

   <Icon style={{color:'#c1c0c9',}} name={
        Platform.OS === 'ios'
          ? `md-paper`
          : 'md-paper'
      }/>
      <Text style={{ fontFamily: "newFont",
  fontSize: 10,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0,textAlign:'center',
  color: "#c1c0c9"}}>{i18n.t('orders')}</Text>
      </TouchableOpacity>

    <TouchableOpacity 
     onPress={() =>
      this.props.navigation.navigate('SettingsScreen')

  }
    style={{width: Dimensions.get('window').width/6,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>

    <Icon style={{color:'#c1c0c9',}}  name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}/>
           <Text style={{ fontFamily: "newFont",
  fontSize: 10,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0,
  color: "#c1c0c9"}}>{i18n.t('settings')}</Text>
</TouchableOpacity>

       
</View>

      </View>   
    </View>
      </Container>
      </StyleProvider>
    );
  }
}

const mapStateToActions = {
  getCategories: {},
  addItemToOrder: addItem

}

const mapStateToProps = state => ({
  Order: state.AddToOrderReducer.Order
});

export default connect(mapStateToProps, {...mapStateToActions,...AddOrderAction})(OrderScreen);

const styles = StyleSheet.create({
  image : {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
  counterWraper:{
    borderWidth: 1,
    borderColor: '#8FCFEB',
  },
  itemORGPrice:{
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold'
  },
  itemOriginal: {
    fontFamily: "Acens",
    fontSize: 17,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#8FCFEB"
  }
});
