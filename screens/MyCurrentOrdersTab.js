

import React, { Component } from "react";
import {  Metrics, Colors } from '../Themes';

import { StyleSheet,View,TouchableOpacity ,TextInput,Dimensions,Platform,Image,Modal,AsyncStorage,FlatList,ScrollView,I18nManager,ActivityIndicator} from 'react-native'
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Item,
    Input,
    Body,
    Left,
    Right,
    Icon,
    Form,Picker,
    StyleProvider,ListItem,
    Text,Card,Radio,Label
} from "native-base";
import MyOrdersStyles from '../css/MyOrdersStyles';
import {connect} from "react-redux";
import {CLEAR_CART} from '../actions/types';
import client from '../api/constant';
import getTheme from '../native-base-theme/components';
import variables from '../native-base-theme/variables/variables';
import styles from '../css/styles'
import { showMessage, hideMessage } from "react-native-flash-message";
import * as AddOrderAction from '../actions/AddToOrder';
import { OrderedItem } from '../UI_Commponents/OrderedItem';
import { Localization } from 'expo-localization';
import Expo from 'expo';
import DatePicker from 'react-native-datepicker'



import i18n from 'i18n-js';
let lang;
var timesArr=['9 am - 10 am','10 am - 11 am','11 am - 12 pm' ,'12 pm - 1 pm','1 pm - 2 pm','2 pm - 3 pm', '3 pm - 4 pm','4 pm - 5 pm', '5 pm - 6 pm']
const en = {
    home: 'Home',
    wishlist: 'Wishlist',
    settings:'Settings',
    orders:'Orders',
        checkout:'CHECK OUT',
    orderNow:'ORDER NOW',
    orderId:'Order ID',
    date:'Date',
    price:'Price',
    status:'Status',
    orderType:"Order Type",
      default:'Default',
  urgent:'Urgent',
  laterBooking:'Later Booking',
    jod:'JOD',
 noordersyet:'There is no orders yet',
 filter:'Filter',
 pending:'Pending',
 approved:'Approved',
 rejected:'Rejected',
 canceled:'Canceled',
 proceed:'Proceed',
 filterOrders:'Filter Orders',
 shippingDate:'Sending Date',
 vieworderdetails:'VIEW ORDER DETAILS'
 



    
   
};
const ar = {
    noordersyet:'لا يوجد طلبات حتى الآن',

  home: 'الرئيسية',
  wishlist: 'المفضلة',
  settings:'الاعدادات',
  orders:'Orders',
    checkout:'الدفع',
  orderNow:'اطلب الآن',
  orderId:'رقم الطلب',
  date:'التاريخ',
  price:'السعر',
  status:'حالة الطلب',
  orderType:"نوع الطلب",
  default:'افتراضي',
  urgent:'مستعجل',
  laterBooking:'حجز لاحق',

  jod:'دينار',
  filter:'فلتر',
  pending:'بانتظار الموافقة',
 approved:'تمت الموافقة',
 rejected:'المرفوض',
 canceled:'تم الالغاء',
 proceed:'بدء التحضير',
 filterOrders:'فلترة الطلبات',
 shippingDate:'تاريخ الارسال',
 vieworderdetails:'عرض تفاصيل الطلب'







};


const { textInputStyle,checkOutText,mainContainerCheckOut,firstViewInCheckOut,pickerContinerInCheckOut,iosPickerIconStyle,pickerStyle,makePurchaseContainer,makePurchaseTouchable,makePurchaseText,itemTextStyleICheckoutPicker,textStyleInCheckoutPicker } = styles
let a=[];
class MyCurrentOrdersTab extends Component {
    constructor (props){
        super(props);
        this.state ={
            isModalSortVisible: false,
            status:200,
            data: [
				
            
                
				
			],
            paymentMethod: null,
            myLang: AsyncStorage.getItem("myLang").then((value) => {
                this.setState({ "myLang": value })
            }).done()
            ,
        
selected:1,
paymentMethodModalVisibality: false,
codSelected:true,
othersSelected:false,
payPalSelected:false,
visaSelected:false,
userID:'',
username: '',
city: '',
address:'',
email:'',
phone:'',
chosenDate: new Date(),

userCity:'',
userAddress:'',
cityBottomColor:'#c1c0c9',
addressBottomColor:'#c1c0c9',
products:this.props.Order,

// finalArr:[ 

//     {
//         products_id
//     },
//     {
//         products_name
//     },
//     {
//         price
//     },
//     {
//         customers_basket_quantity
//     },
//     {final_price
//     }
// ]

        }
    }
    setModalVisible(visible) {
        this.setState({ paymentMethodModalVisibality: visible });
    }
codPressed(){
    this.setState({codSelected:true,
    othersSelected:false,
    visaSelected:false,
    payPalSelected:false})
}
othersPressed(){
    this.setState({codSelected:false,
    othersSelected:true})
    this.setModalVisible(true)
}
visaPressed(){
    this.setState({codSelected:false,
    
visaSelected:true,
payPalSelected:false})
this.setModalVisible(false)
}
payPalPressed(){
    this.setState({codSelected:false,
   
visaSelected:false,
payPalSelected:true})
this.setModalVisible(false)

}
    onValueChange(value) {
        this.setState({
            selected: value
        });
    }

    setSortModalVisible(visible) {
        this.setState({ isModalSortVisible: visible });
      } 


    canclePressed(){
        this.setModalVisible(false)
      this.codPressed()
    }
    static navigationOptions = {
        header:null
        // title: 'Check out',
        // headerStyle: {
        //     backgroundColor: '#8FCFEB',fontFamily:'Acens',color:'white',height:77,
        //     elevation: null
        // },
        // headerTitleStyle: {
        //     fontFamily:'Acens',color:'white',fontSize:25
        // }
    };
    statusSort(statusVal) {
        this.setState({data:[]})
        this.setSortModalVisible(false)
       
 
        client.post(`/app/getorders?customers_id=${this.state.userID}&language_id=${lang}&status=${statusVal}`
        
        ).then((res) => {
          if(res.data.status==200){
    
            this.setState({status:200})
  
  }else{
   this.setState({status:204})
  }
  if(res.data.message=='Returned all orders.'){
  
  
  if(res.data.data.length>0){
  this.setState({
   
   data: res.data.data
  })
  }
  
  }      
   
   })
  

      }
    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('userID');
          const namevalue =  await AsyncStorage.getItem("userName"); 
          const phonevalue = await AsyncStorage.getItem("userPhone");
          const passwvalue = await AsyncStorage.getItem("userPassword");
          const userEmail = await AsyncStorage.getItem("userEmail");
          const userCity = await AsyncStorage.getItem('userCity');
          const userAddress = await AsyncStorage.getItem('userAddress');
          const myLang = await AsyncStorage.getItem('myLang');
      
      
          if(myLang=='ar'){
            lang=4;
          }else{
            lang=1;
          }
      
          if (value !== null) {
            // We have data!!
     

      this.setState({
        userID:value,
        username:namevalue,
        phone:phonevalue,
        // userPassword:passwvalue,
        email:userEmail,
        userCity:userCity,
        userAddress:userAddress

      })
         
      
      client.post(`/app/getorders?customers_id=${value}&language_id=${lang}`
        
      ).then((res) => {
        if(res.data.status==200){
  
          this.setState({status:200})

}else{
 this.setState({status:204})
}
if(res.data.message=='Returned all orders.'){


if(res.data.data.length>0){
this.setState({
 
 data: res.data.data
})
}

}      
 
 })


       }
      } catch (error) {
        // Error retrieving data
        console.log('getstorageitemerrrror',error);
      }
      
      };
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
            
        this._retrieveData()
        // for(let i=0;i<=this.state.ExperienceArr.length;i++){

        // }
         
       
      }
       registerUser(data){
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
        })
        .then(res => res.json())
        .then((apiResponse)=>{ 
            return {
                type: "REGISTER_USER",
                api_response: apiResponse.data
            }
        })
        .catch(function (error) {
            return {
                type: "REGISTER_USER",
                api_response: {success: false}
            }
        })
}

    _handlePress = async () => {
        // save the lang in storage
//         if(this.state.city.length>0&this.state.address.length>0){
//             this.setState({cityBottomColor:'#c1c0c9'})
//             this.setState({addressBottomColor:'#c1c0c9'})
// if(this.state.username==''|| this.state.city=='' || this.state.email==''|| this.state.address==''){
//     showMessage({
//         message: "something went wrong",
//         type: "danger",
//       });

        
// }else{
       
        for(let i=0;i<this.state.products.length;i++){
        //  a=`products[${i}][products_id]=${this.state.products[i].products_id} &
        //  products[${i}][customers_basket_quantity]=${this.state.products[i].customers_basket_quantity}`
a.push(`products[${i}][products_id]=${this.state.products[i].products_id}&products[${i}][products_price]=${this.state.products[i].final_price}&products[${i}][customers_basket_quantity]=${this.state.products[i].customers_basket_quantity}`)
    }
//}

    let b=a.toString()
    b.replace(",","&")

    // client.post(`/addtoorder?customers_id=${this.state.userID}&delivery_firstname=${this.state.username}&customers_telephone=${this.state.phone}
    //     &delivery_street_address=${this.state.userAddress}&delivery_city=${this.state.userCity}&total=${this.props.navigation.state.params.finalPrice}&products[]&
    // &payment_method=cod&language_id=1&${b.split(",").join("&")}`)
        client.post(`/addtoorder?customers_id=${this.state.userID}&delivery_firstname=${this.state.username}&customers_telephone=${this.state.phone}&delivery_city=${this.state.userCity}&total=${this.props.navigation.state.params.finalPrice}&payment_method=cod&language_id=${lang}& ${b.split(",").join("&")}&products[&city_id=1&billing_street_address=${this.state.userAddress}`)
        .then((res) => {
             if(res.data.message==='Order has been placed successfully.'){
                 this.props.clearCart();

                this.props.navigation.navigate('OrderAddedSuccesfully')  
            }

  })


    }
    onOrderPressed() {
        
    this.props.navigate(this.props.id,)
}
    render() {
      console.log("this.state.data",this.state.data)
        i18n.fallbacks = true;
        i18n.translations = { ar, en };
        //i18n.locale =null;
    
        i18n.locale = this.state.myLang;
  
        return (
          
               
        <Content style={{	backgroundColor: '#f3f3f3'}}>
       

        <View style={{height:15,backgroundColor: '#f3f3f3'}}/>
        {this.state.status==200 ?(
          this.state.data.length > 0 ? (
					this.state.data.map((item, index) => {
            console.log("itemm",item)
            var date1 = new Date(item.shipping_date);
            date1=(date1.getMonth() + 1) + '/' + date1.getDate() + '/' +  date1.getFullYear();
						return (
                          
							<View
                            
                            // onPress={()=>{ this.props.navigate(item.orders_id,item.data[0].products_name,item.data,index,date1,item.agent,item.drugstore)}}
								style={
									item.orders_id === 1
										? [MyOrdersStyles.rowBg, { marginTop: 50}]
										: MyOrdersStyles.rowBg
								}
								key={index}>
								<View style={MyOrdersStyles.rowField}>
									<Text style={MyOrdersStyles.fieldLabelTxt}>{i18n.t('orderId')}</Text>
									<Text style={MyOrdersStyles.fieldDescriptionTxt}>{item.orders_id}</Text>
								</View>
								<View style={MyOrdersStyles.rowListDivider} />

								<View style={MyOrdersStyles.rowField}>
									<Text style={MyOrdersStyles.fieldLabelTxt}>{i18n.t('date')}</Text>
									<Text style={MyOrdersStyles.fieldDescriptionTxt}>{item.created_at}</Text>
								</View>
								<View style={MyOrdersStyles.rowListDivider} />
                <View style={MyOrdersStyles.rowField}>
									<Text style={{color: "#959595",
		fontSize: 15,
		fontFamily: "newFont",
		width: Metrics.WIDTH * 0.25,
		textAlign: 'left'}}>{i18n.t('shippingDate')}</Text>
									<Text style={MyOrdersStyles.fieldDescriptionTxt}>{date1}</Text>
								</View>




								{/* <View style={MyOrdersStyles.rowField}>
									<Text style={MyOrdersStyles.fieldLabelTxt}>Product</Text>
									<Text numberOfLines={1} style={MyOrdersStyles.fieldDescriptionTxt}>
										{item.Product}
									</Text>
								</View> */}
								<View style={MyOrdersStyles.rowListDivider} />

								<View style={MyOrdersStyles.rowField}>
									<Text style={MyOrdersStyles.fieldLabelTxt}>{i18n.t('price')}</Text>
									<Text style={[MyOrdersStyles.fieldDescriptionTxt,{fontFamily: 'numFont'}]}>{item.order_price}{i18n.t('jod')}</Text>
								</View>
								<View style={MyOrdersStyles.rowListDivider} />

								<View style={MyOrdersStyles.rowField}>
									<Text style={MyOrdersStyles.fieldLabelTxt}>{i18n.t('status')}</Text>
                  {item.orders_status_id==1&&item.approve==0?
                  I18nManager.isRTL?
									<Text
										style={
											item.Status == 'Complete'
												? [MyOrdersStyles.fieldDescriptionTxt, { color: '#00ff00' }]
                                                : [MyOrdersStyles.fieldDescriptionTxt, { color: '#f0b949' }]
                                                
                                                
										}>

										{(item.orders_status_ar)}/تمت الموافقه عليها
									</Text>
                  :
                  <Text
                  style={
                    item.Status == 'Complete'
                      ? [MyOrdersStyles.fieldDescriptionTxt, { color: '#00ff00' }]
                                              : [MyOrdersStyles.fieldDescriptionTxt, { color: '#f0b949' }]
                                              
                                              
                  }>

                  {item.orders_status}/Approved
                </Text>
                  :
                  item.orders_status_id==1&&item.approve2>0?
                  I18nManager.isRTL?
									<Text
										style={
											item.Status == 'Complete'
												? [MyOrdersStyles.fieldDescriptionTxt, { color: '#00ff00' }]
                                                : [MyOrdersStyles.fieldDescriptionTxt, { color: '#f0b949' }]
                                                
                                                
										}>

										{(item.orders_status_ar)}/يوجد موافقه عليها
									</Text>
                  :
                  <Text
                  style={
                    item.Status == 'Complete'
                      ? [MyOrdersStyles.fieldDescriptionTxt, { color: '#00ff00' }]
                                              : [MyOrdersStyles.fieldDescriptionTxt, { color: '#f0b949' }]
                                              
                                              
                  }>

                  {item.orders_status}/There's Approved
                </Text>
                  :
                  item.orders_status_id==2&&item.type==2?
                  I18nManager.isRTL?
									<Text
										style={
											item.Status == 'Complete'
												? [MyOrdersStyles.fieldDescriptionTxt, { color: '#00ff00' }]
                                                : [MyOrdersStyles.fieldDescriptionTxt, { color: '#f0b949' }]
                                                
                                                
										}>

										{(item.orders_status_ar)} مع سمورتك 
									</Text>
                  :
                  <Text
                  style={
                    item.Status == 'Complete'
                      ? [MyOrdersStyles.fieldDescriptionTxt, { color: '#00ff00' }]
                                              : [MyOrdersStyles.fieldDescriptionTxt, { color: '#f0b949' }]
                                              
                                              
                  }>

                  {item.orders_status} With Smortec
                </Text>  
                :
                                <Text
                  style={
                    item.Status == 'Complete'
                      ? [MyOrdersStyles.fieldDescriptionTxt, { color: '#00ff00' }]
                                              : [MyOrdersStyles.fieldDescriptionTxt, { color: '#f0b949' }]
                                              
                                              
                  }>

                  {I18nManager.isRTL?(item.orders_status_ar) :(item.orders_status)}
                </Text>
                  }
								</View>
                <View style={MyOrdersStyles.rowListDivider} />

                <View style={MyOrdersStyles.rowField}>
									<Text style={MyOrdersStyles.fieldLabelTxt}>{i18n.t('orderType')}</Text>
                  {item.type=='1'?
                  <Text style={MyOrdersStyles.fieldDescriptionTxt}>{i18n.t('default')}</Text>
:
item.type=='2'?
<Text style={MyOrdersStyles.fieldDescriptionTxt}>{i18n.t('urgent')}</Text>
:
item.type=='3'?
<Text style={MyOrdersStyles.fieldDescriptionTxt}>{i18n.t('laterBooking')}</Text>
:null
                  }
								</View>
                <View style={MyOrdersStyles.rowListDivider} />
                <TouchableOpacity
                            
                            onPress={()=>{ this.props.navigate(item.orders_id,item.data[0].products_name,item.data,index,date1,item.agent,item.drugstore)}}>
                <View style={MyOrdersStyles.rowField}>

                <View
                                    
                                    style={{width:'100%',height:45,backgroundColor:'#8FCFEB',justifyContent:'center',alignItems:'center'}}> 
                                   <Text style={{fontSize: 15,
 fontWeight: "normal",
 fontStyle: "normal",
 fontFamily:'newFont',
 lineHeight: 19,
 letterSpacing: 0.1,
 textAlign: "center",
 color: "#ffffff",}} >{i18n.t('vieworderdetails')}</Text>
                                   </View>
                                   </View>
                                   </TouchableOpacity>
                            </View>
                       
                        );
                        
                    }) 
                    ) : 
                    <ActivityIndicator color='#8FCFEB' size="large"  style={{color:'#8FCFEB'}}/>
  
           ):
                    
                        
                        <View style={{justifyContent:'center',alignItems:'center',width:'100%',backgroundColor:'white'}}>
                        <Text style={{fontFamily: "Acens",
                 fontSize: 15,marginTop:100,
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                textAlign: "left",
                color: "#777777"}} >{i18n.t('noordersyet')}</Text>
                    </View>
                
                        }




<Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.isModalSortVisible}
                        onRequestClose={() => {
                            this.setSortModalVisible(false);
                        }}>
                        <View style={{ marginTop: 50, marginEnd: 20, marginStart: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
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
                                    <View  style={{width:10, justifyContent:'flex-end'}}  />
                                  <TouchableOpacity 
                                 onPress={()=>{this.setSortModalVisible(false)}}
>  
 <Icon style={{color:'white',}} name={
        Platform.OS === 'ios'
          ? `md-close`
          : 'md-close'
      }/>
                                    {/* <Text style={{width:30,height:30,fontSize: 23, color: 'white', marginEnd:-20,marginStart:10,marginTop:-5}}>x</Text> */}
                                    </TouchableOpacity>
                                        <Text style={{ fontSize: 20, color: 'white', fontFamily: 'Acens',width:Dimensions.get('window').width/1.67,textAlign:'center' }}>{i18n.t('filterOrders')}</Text>
                                        {/* <TouchableOpacity 
     onPress={ () => { this.defultSort() } }>  
 <Image style={{width:22,height:22,marginLeft:0}} 
 source={require('../assets/images/clearefilter.png')}
 />
                                    </TouchableOpacity> */}
                                   
                                       </View>
                                       </View>
                                       <View style={{height:Dimensions.get('window').height/2,justifyContent:'center',alignItems:'center'}}>
                                       {/* <TextInput 
                 onChangeText={(text) => this.setState({emailForfet:text})}
                placeholderTextColor='#777777' placeholder='EMAIL' style={[emailInputStyle,{width:Dimensions.get('window').width/1.5}]}>

                </TextInput> */}
                <TouchableOpacity
                onPress={ () => { this.statusSort(1) } }
                style={{width:'100%',height:44,justifyContent:'center',alignItems:'center'}}>
             

                <Text style={{fontFamily: "Acens",
  fontSize: 16,
  fontWeight: "bold",
  fontStyle: "normal",}}>
                  {i18n.t('pending')}
                </Text>
                </TouchableOpacity>
                <View style={{width:'100%',height:4,backgroundColor:'black'}}/>
                <TouchableOpacity
                 onPress={ () => { this.statusSort(2)} }
                style={{width:'100%',height:44,justifyContent:'center',alignItems:'center'}}>

                <Text style={{fontFamily: "Acens",
  fontSize: 16,
  fontWeight: "bold",
  fontStyle: "normal",}}>
                  {i18n.t('approved')}
                </Text>
                </TouchableOpacity>
                <View style={{width:'100%',height:1,backgroundColor:'black'}}/>
                <TouchableOpacity  onPress={ () => { this.statusSort(3)} } style={{width:'100%',height:44,justifyContent:'center',alignItems:'center'}}>

                <Text style={{fontFamily: "Acens",
  fontSize: 16,
  fontWeight: "bold",
  fontStyle: "normal",}}>
              {i18n.t('rejected')}
                </Text>
                </TouchableOpacity>

                <View style={{width:'100%',height:1,backgroundColor:'black'}}/>
                <TouchableOpacity  onPress={ () => { this.statusSort(4) } } style={{width:'100%',height:44,justifyContent:'center',alignItems:'center'}}>

                <Text style={{fontFamily: "Acens",
  fontSize: 16,
  fontWeight: "bold",
  fontStyle: "normal",}}>
                {i18n.t('canceled')}
                </Text>
                </TouchableOpacity>

                <View style={{width:'100%',height:1,backgroundColor:'black'}}/>
                <TouchableOpacity  onPress={ () => { this.statusSort(5) } } style={{width:'100%',height:44,justifyContent:'center',alignItems:'center'}}>

                <Text style={{fontFamily: "Acens",
  fontSize: 16,
  fontWeight: "bold",
  fontStyle: "normal",}}>
               {i18n.t('proceed')}
                </Text>
                </TouchableOpacity>
                
<View style={{width:Dimensions.get('window').width/1.37,alignItems:'flex-end',justifyContent:'flex-end',paddingTop:30}}>
{/* <TouchableOpacity
onPress={()=>{this.setSortModalVisible(false)}}
style={{width:70,height:37,backgroundColor:'#8FCFEB',justifyContent:'center',alignItems:'center'}}><Text style={{fontSize: 12, color: 'white', fontFamily: 'Acens', }} >Cancel</Text></TouchableOpacity> */}
</View>
</View>
                                    </View>
                                {/* </View> */}
                            </Card>
                        </View>

                    </Modal>


				</Content>
             
        );
    }
}

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: "#FFF"
//     }
// });

// export default CheckoutScreen;
const mapStateToActions = {
    getCategories: {}
  }
  
  const mapStateToProps = state => ({
    Order: state.AddToOrderReducer.Order
  });
  
  export default connect(mapStateToProps, AddOrderAction)(MyCurrentOrdersTab)
  

 {/* <Picker
                            mode="dialog"
                            iosHeader={this.state.selected}
                            iosIcon={<Icon name="arrow-dropdown-circle" style={iosPickerIconStyle} />}
                            style={pickerStyle}
                            selectedValue={this.state.selected}
                            onValueChange={this.onValueChange.bind(this)}
                            itemTextStyle={itemTextStyleICheckoutPicker}
                            textStyle={textStyleInCheckoutPicker}
                        >
                            <Picker.Item label="Choose a Payment Method" value="key0"  />
                            <Picker.Item label="test text" value="key1" />
                            <Picker.Item label="testttt " value="key2" />
                            <Picker.Item label="test " value="key3" />
                        </Picker> */}