import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View, Image,Dimensions,TouchableOpacity,ImageBackground ,Platform,AsyncStorage,Modal,I18nManager,Alert} from 'react-native';
import getTheme from '../native-base-theme/components';
import variables from '../native-base-theme/variables/variables';
import { connect } from "react-redux";
import { requestCategoryItem } from '../actions/getCategoryItemsAction';
import { ItemCard } from '../UI_Commponents/ItemCard';
import AddToCartModal from '../UI_Commponents/AddToCartModal';
import client from '../api/constant';
import { FlatGrid } from 'react-native-super-grid';
// import Modal from "react-native-modal";
import {
  Container,
  Header,
  Title,
  Button,
  Left,
  Right,
  Icon,
  Body,
  Text,
  StyleProvider,
  Content, Card, CardItem,
} from "native-base";
import { Avatar, Badge, withBadge } from 'react-native-elements'
import {addItem} from '../actions/AddToOrder'
import { showMessage, hideMessage } from "react-native-flash-message";

import { Localization } from 'expo-localization';
import Expo from 'expo';

let BaseURL = 'https://smortec.com/';


import i18n from 'i18n-js';
let lang;

const en = {
    home: 'Home',
    wishlist: 'Favorite',
    settings:'Settings',
    orders:'Orders',
        noRecordFound:'No Record Found',
    wishListTitle:' MY FAVORITE',
    callNow:'CALL NOW',
    addedSuccessfully:'Added Successfully',
    addedToWishList:'Added to Wishlist',
    removedFromWishList:"Removed from Wishlist",
    
   
};
const ar = {
  addedToWishList:'تمت الاضافة الى المفضلة',
  removedFromWishList:"تم الحذف من المفضلة",
      addedSuccessfully:'تمت اضافة العنصر بنجاح',

  home: 'الرئيسية',
  wishlist: 'المفضلة',
  settings:'الاعدادات',
  orders:'الطلبات',
    noRecordFound:'قائمة المفضلة فارغة',
  wishListTitle:'المفضلة',
  callNow:'اتصل الآن'


};


class WishListScreen extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;

    this.state = {
      item:null,

      isModalVisible: false,
      isLoading:true,
      wishListArr:[],
      testArr:[],
      wish:[],
      loading: true,
      success:'0',
      status:200,



      //Loading state used while loading the data for the first time
      //Data Source for the FlatList
      fetching_from_server: false,
      phonCall:'07999999',


      userID:'',
      popUpModal: false,
      myLang: AsyncStorage.getItem("myLang").then((value) => {
        this.setState({ "myLang": value })
    }).done()
    ,

    }
    this._toggleModal = this._toggleModal.bind(this);
    this.Navigate = this.Navigate.bind(this)
  }
  setModalVisible(visible) {
    this.setState({ popUpModal: visible });
  }
 
  onSelect = data => {
    this.setState(data);
  };

  onSelectWishArr = data => {
    this.setState(data);
    // this.props.navigation.navigate('WishListScreen')
  };
  Navigate(itemId) {
    this.props.navigation.navigate('ItemScreen', {
      itemId: itemId,
      onSelectWishArr:this.onSelectWishArr,
      onSelect:this.onSelect
    })
  }
  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  setItem = (item) =>
    this.setState({ item })

  static navigationOptions = {
    title: null,
    drawerLabel: 'Home',backgroundColor:'red'
  };
  returnBadg()
  {
    if(this.props.Order.length>0){
  return(
    // <Badge style={{ alignItems:'center',justifyContent:'center', marginBottom:-10,borderRadius:8,width:16,height:16,borderColor:'red',borderWidth:1,backgroundColor:'red',color:'red'}}></Badge>
    <View  style={{ width: 10, backgroundColor: 'white' ,height:10,borderRadius:5}}
    >
     
 </View>
    )
    }else{
      return
  (
    <View/>
  );
      
    }
    
  }

  static navigationOptions = {
    header:null
  //   left: ( <Icon name={'chevron-left'} onPress={ () => { goBack() } }  /> ),  
  //   drawerLabel: 'test',
  // title: 'WishList',
  // headerStyle: {
  //     backgroundColor: '#8FCFEB',fontFamily:'Acens',color:'white',height:77,
  //     elevation: null
  // },
  // headerTitleStyle: {
  //     fontFamily:'Acens',color:'white',fontSize:25
  // },
  // headerRight: (
  //   <Icon name="search" style={{ color:'white',marginEnd:20}}/>
     
  // ),
};

_retrieveData = async () => {
  this.setState({loading:true})
  try {
    const value = await AsyncStorage.getItem('userID');
    // const namevalue =  await AsyncStorage.getItem("userName"); 
    // const phonevalue = await AsyncStorage.getItem("userPhone");
    // const passwvalue = await AsyncStorage.getItem("userPassword");
    // const userEmail = await AsyncStorage.getItem("userEmail");

    

    const myLang = await AsyncStorage.getItem('myLang');
    if (value !== null) {
      // We have data!!
      if(myLang=='ar')
      {
        lang=4;
      }else{
        lang=1;
      }      // We have data!!

      this.setState({ fetching_from_server_topseller: true }, () => {

      client.post(`/app/getallproducts?type=wishlist&customers_id=${value}&language_id=${lang}`).then((res) => {
    
        if(res.data.status==200){
          this.setState({status:200})
        }else{
          this.setState({status:204})   
             }
        if(res.data.message=='Returned all products.'){
          this.setState({success:'1'})
        for (let i=0;i<res.data.product_data.length;i++){
          this.setState({
            wish: [...this.state.wish, (res.data.product_data[i]).products_id], 
          })
        }
 
        for (let i=0;i<this.props.Order.length;i++){
   
  
          // this.setState({ testArr: this.props.Order[i].products_id})
          this.setState({
            testArr: [...this.state.testArr, (this.props.Order[i]).products_id]
          })
        }
       if(res.data.product_data.length>0){
        this.setState({
          
          wishListArr: res.data.product_data,
          isLoading:false,loading: false,fetching_from_server:false
        })}
      
      }
      }
      )})


this.setState({
  userID:value

})

    }
  } catch (error) {
    // Error retrieving data
    console.log('getstorageitemerrrror',error);
  }
  
};

componentWillUnmount() {
  this._isMounted = false;
}
componentDidMount(){
  this._isMounted = true;

  if (I18nManager.isRTL)
  {
    lang=4;
  }
  else{
    lang=1;
  }
  this._isMounted && this._retrieveData()
     
      
}
// handelAddToOrder(item){
//   this.setState({item:item,isModalVisible:true})

// }



handelAddToOrder(item){
  i18n.fallbacks = true;
  i18n.translations = { ar, en };

  i18n.locale = this.state.myLang;
  this.setState({testArr: this.state.testArr.concat(item.products_id)});
  let test=0;
  for(let i=0;i<=item.bounce.length;i++){

    if(item.bounce[i]!=undefined){ 

    if(1>=item.bounce[i].qty_from){
      if(item.bounce[i].type=='percent'){

        test=item.bounce[i].bounces;
test=(item.bounce[i].bounces)/100*1
      }else{
              test=item.bounce[i].bounces;

      }
      this.setState({bounsNum:item.bounce[i].bounces})
    }
  }
}
  let BaseURL = 'https://smortec.com';
  let testTaxF=0;
  let testTaxS=0;
  let testTaxE=0;
  let ppp=0;
  if(item.tax_description=='4%'){

  
   testTaxF= 0.04*parseFloat(item.products_price);
}else  if(item.tax_description=='8%'){

  
   testTaxE= 0.08*parseFloat(item.products_price);
} else  if(item.tax_description=='16%'){

  
   testTaxS= 0.16*parseFloat(item.products_price);
}
    if(item.new_price !=null && item.new_price !=''){
      ppp= parseFloat(item.new_price)
      
    }else{
      ppp=parseFloat(item.cost_price)
    }

    
   

let profitmarginratio=0;
let profitmargion=0;

    let totalSell=item.products_price*(1+parseInt(test))
    profitmargion= totalSell-(ppp*1)
    let margin=ppp*(1+parseInt(test))
    profitmarginratio=(parseFloat(profitmargion / margin)*100).toFixed(3)
    let price = item.new_price !=null && item.new_price !=''?parseFloat(item.new_price): parseFloat(item.cost_price);

 

  let itemss={
    drug_store:item.drug_store,
    sub_agent:item.sub_agent,

    products_id:item.products_id,
    products_name : item.products_name,
    
    final_price:  ppp,
    // price: item.new_price !=null &&item.new_price !=''?parseFloat(item.new_price): parseFloat(item.cost_price),
    price: item.new_price !=null && item.new_price !=''?parseFloat(item.new_price): parseFloat(item.cost_price),

    customers_basket_quantity: 1,
    image: BaseURL + '/' +item.products_image,
    bounsArr:item.bounce,
    test:parseInt(test),
    unit:item.units,
    tax:item.tax_description,
    profit_margin: parseFloat(profitmargion),
    profit_margin_ratio:(profitmarginratio),

    testTaxF:testTaxF,
    testTaxE:testTaxE,
    testTaxS:testTaxS,
    f:ppp,
    publicPrice:item.products_price,
    isCustom:false,
    redeem:this.props.redeem,
    bounsNum:this.state.bounsNum,
    testTaxF: item.tax_description*parseFloat(item.products_price),
  }    


  this.props.addItemToOrder(itemss)
  showMessage({
    message: i18n.t('addedSuccessfully'),
    type: "success",
  });

}


likedPress(products_id){
  // if(this.state.wish.includes() !=undefined){
if(this.state.wish.includes(products_id)){
client.post(`/app/unlikeproduct?liked_products_id=${products_id}&liked_customers_id=${this.state.userID}`).then((res) => {

// this.setState({wish:[]})
if(res.data.status==200){
  Alert.alert(
    `${i18n.t('removedFromWishList')}`,
    `${i18n.t('removedFromWishList')}`,
    [
      
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
    {cancelable: false},
  );
// this.setState({wish:[]})

client.post(`/app/getallproducts?type=wishlist&customers_id=${this.state.userID}&language_id=${lang}`).then((res) => {

  if(res.data.status==200){
    this.setState({status:200})
  }else{
    this.setState({status:204})        }
  if(res.data.message=='Returned all products.'){
    this.setState({success:'1'})
  for (let i=0;i<res.data.product_data.length;i++){
    this.setState({
      wish: [...this.state.wish, (res.data.product_data[i]).products_id], 
    })
  }

  for (let i=0;i<this.props.Order.length;i++){


    // this.setState({ testArr: this.props.Order[i].products_id})
    this.setState({
      testArr: [...this.state.testArr, (this.props.Order[i]).products_id]
    })
  }
 if(res.data.product_data.length>0){
  this.setState({
    
    wishListArr: res.data.product_data,
    isLoading:false,loading: false,fetching_from_server:false
  })}

}
}
)
}
})
}else{

client.post(`/app/likeproduct?liked_products_id=${products_id}&liked_customers_id=${this.state.userID}`).then((res) => {

  if(res.data.status==200){
    Alert.alert(
      `${i18n.t('removedFromWishList')}`,
      `${i18n.t('removedFromWishList')}`,
      [
        
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
    client.post(`/app/getallproducts?type=wishlist&customers_id=${this.state.userID}&language_id=${lang}`).then((res) => {
      for (let i=0;i<res.data.product_data.length;i++){
      this.setState({
        wish: [...this.state.wish, (res.data.product_data[i]).products_id]
      })      }

    })}
})
}
}
  render() {
    var testArrTest=this.state.testArr
    for (let i=0;i<this.props.Order.length;i++){
      // this.setState({
      //     //   testArr: [...this.state.testArr, (this.props.Order[i]).products_id],
      
            
      //     // })
          testArrTest=[...testArrTest, (this.props.Order[i]).products_id]
        }
        console.log("testArrTest22",testArrTest)
    i18n.fallbacks = true;
    i18n.translations = { ar, en };


    i18n.locale = this.state.myLang;
    const  Items  = this.state.wishListArr;

if(this.state.fetching_from_server){

}

    return (
      <StyleProvider style={getTheme(variables)}>
        <Container>
        <Header style={{height:99,backgroundColor:'#8FCFEB'}}>
        
        <Left>
        <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('SearchScreen')}}>
                  <Icon name="search" style={{ color:'white',}}/>
                  </TouchableOpacity> 
        </Left>
        <Body style={[styles.header,{width:Dimensions.get('window').width,justifyContent:'center',alignItems:'center'}]}>
              <Title style={[styles.header,{fontSize:25,width:Dimensions.get('window').width/1.5,fontFamily:'Acens',marginStart:0}]}>{i18n.t('wishListTitle')}</Title>
            </Body>
            <Right style={{width:50,justifyContent:'flex-end',marginRight:-70}} >
              <Body> 
              <TouchableOpacity 
     onPress={() =>
      this.props.navigation.navigate('OrderScreen')

  }
    style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
{this.returnBadg()}
    <Icon style={{color:'white',}} name={
        Platform.OS === 'ios'
          ? `md-cart`
          : 'md-cart'
      }/>
           {/* <Text style={{ fontFamily: "newFont",
  fontSize: 10,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0,
  color: "#c1c0c9"}}>Cart</Text> */}
</TouchableOpacity>
               
</Body>
            </Right>
        </Header> 
         
          <Content>
           {/* { Items.length!=0? */}
            <View style={{ flex: 1 }}>
              {this.state.isModalVisible &&
                <AddToCartModal
                  _toggleModal={this._toggleModal}
                  isModalVisible={this.state.isModalVisible}
                  setItem={this.setItem}
                  item={this.state.item}
                />
              }
               {/* {this.state.loading ? (
          <ActivityIndicator color='#8FCFEB' size="large"  style={{color:'#8FCFEB'}}/>
        ) : ( */}
                        

         {this.state.status==200 ?(
          Items.length > 0 ? (
                 
              <FlatGrid
                // itemDimension={130}
                itemDimension={Dimensions.get('window').width>420?200:130}

                items={Items}
                style={styles.gridView}
                renderItem={({ item, index }) => (
                 
                  <Card cardBorderRadius={5}>     
                 <View
                   
                    
                   >
             
             
                   
                   <View>
                  <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
                 <TouchableOpacity  style={{ width: '100%', flex: 1,flex:1,height:Dimensions.get('window').height/3.7,
    alignItems: 'stretch'}} onPress={() =>{
                             this.Navigate (item.products_id,item.products_name)
                             }}> 
                  <Image resizeMode={'stretch'}
                              source={{uri: BaseURL +item.products_image}}  style={{  position: 'absolute',
                              top: 0,height:null,
                              flex:1,
                              left: 0,
                              bottom: 0,
                              right: 0,}}/>
                   </TouchableOpacity> 
                   <View style={{justifyContent:'flex-start',width:'85%',flexDirection:'column',alignItems:'flex-start',padding:3}}>
             
              <Text   numberOfLines={2}
              style={{  fontSize: 13,
                textAlign:I18nManager.isRTL?"left":null,
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                color: "#8FCFEB",fontFamily:"newFont",marginTop:5,marginBottom:5,color:'#8FCFEB'}}>{item.products_name}</Text>
                 {/* <Text   numberOfLines={2}
              style={[styles.itemText,{marginTop:0,marginBottom:0,color:'gray',fontFamily:'#newFont'}]}>{item.products_description}</Text> */}
                
               
                 </View>
                
                 {/* <Text   numberOfLines={1}
                  
              style={[styles.itemText,{marginTop:0,marginBottom:0,color:'#383838',}]}>{item.new_price} JOD</Text>
                 */}
                 <View style={{justifyContent:'space-between',width:'85%',flexDirection:'row',alignItems:'center'}}>
                
                
                 {item.new_price !=null &&item.new_price !=''?(
                  <Text   numberOfLines={1}
                  
              style={{  fontSize: 10,
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                color: "#8FCFEB",fontFamily: 'numFont',marginTop:0,marginBottom:0,color:'#383838',textDecorationLine: 'line-through',color:'gray'}}>{item.cost_price} JOD</Text>
                
                 ):
                 <Text   numberOfLines={1}
                  
                 style={{  fontSize: 12,
                  fontWeight: "normal",
                  fontStyle: "normal",
                  letterSpacing: 0,
                  color: "#8FCFEB",fontFamily: 'numFont',marginTop:0,marginBottom:0,color:'#383838'}}>{item.cost_price} JOD </Text>

                  
                 }  

{item.new_price !=null &&item.new_price !=''?(
                   
                   <Text   numberOfLines={2}
              style={{  fontSize: 12,
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                color: "#8FCFEB",fontFamily: 'numFont',marginTop:0,marginBottom:0,color:'black'}}> - {item.new_price}JOD</Text>
               
                ):
                null}
                 <TouchableOpacity onPress={()=>{this.likedPress(item.products_id)}}>
                {/* <Image source={this.state.wish.includes(item.products_id) ? require('../assets/images/hart.png') : require('../assets/images/hartempty.png')} style={{width:17,height:23,marginBottom:10,resizeMode:'contain',}}/> */}
                {this.state.wish.includes(item.products_id) ? 
                <Icon name="md-heart" style={{fontSize:25,color:"red",alignSelf:"center"}} />
                :
                <Icon name="md-heart" style={{fontSize:25,color:"#8FCFEB",alignSelf:"center"}} />

                }
             </TouchableOpacity> 
                 </View>
                  </View>
                 
                
                   </View>
                  
                          
                         </View>
                           <View style={{width:'100%'}}>
                             <Body style={{width:'100%'}}>
                             <Button style={{width:'100%'}}
                              onPress={() =>{
                                this.handelAddToOrder(item)

                              //  this.Navigate (item.products_id,item.products_name)
                               }}
                               disabled={ testArrTest.includes(item.products_id)||item.in_stock==0? true:false}

                             // disabled={ Order.includes(item.products_id)? true:false}
                             style={{height:30,backgroundColor:testArrTest.includes(item.products_id)||item.in_stock==0?'gray':'#8FCFEB',borderBottomEndRadius:7,borderBottomStartRadius:7,justifyContent:'center',alignItems:'center'}} 
                             block 
                            //onPress={()=>{
                             
                           
                            //    props.navigate(props.item.products_id)
                               
                            //  }}
                             >
               <Text style={{fontFamily: "Acens",
                 fontSize: 12,textAlign:'center',
                 fontWeight: "normal",
                 fontStyle: "normal",
                 letterSpacing: 0,
                 color: "#ffffff"
               }}>{I18nManager.isRTL?testArrTest.includes(item.products_id)?'تمت الاضافه الى السلة':'أضف الى السلة':testArrTest.includes(item.products_id)?'Added to Cart':'Add to Cart'}</Text>      
                   </Button>
                         </Body>
                           </View>
                           {/* <View style={{height:20}}/> */}
                       </Card>
  
                    )}
                    // ItemSeparatorComponent={() => <View style={styles.separator} />}
                    // ListFooterComponent={this.renderFooterDefult.bind(this)}
                    //Adding Load More button as footer component
                  />
                  ) : 
                  <ActivityIndicator color='#8FCFEB' size="large"  style={{color:'#8FCFEB'}}/>

         ):

        
         <View style={{justifyContent:'center',alignItems:'center',width:'100%'}}>
         <Text style={{fontFamily: "Acens",
 fontSize: 15,marginTop:100,
 fontWeight: "normal",
 fontStyle: "normal",
 letterSpacing: 0,
 textAlign: "left",
 color: "#777777"}} >{i18n.t('noRecordFound')}</Text>
       </View>


                }
              {/* // )} */}
            </View>
           
          </Content>
         
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
         
        >

    <Icon style={{color:'#8FCFEB',}} name={
        Platform.OS === 'ios'
          ? `md-heart`
          : 'md-heart'
      }/>
       <Text style={{ fontFamily: "newFont",
  fontSize: 10,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0,
  color: "#8FCFEB"}}>{i18n.t('wishlist')}</Text>
      </TouchableOpacity>
{/*        
        <View style={{width: Dimensions.get('window').width/4,
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
//  onPress={()=>{this._callShowDirections() }}
// onPress={

// Platform.select({
//     ios: () => {
//         Linking.openURL('http://maps.apple.com/maps?daddr=32.004734,%2035.861525');
//     },
//     android: () => {
//         Linking.openURL('http://maps.google.com/maps?daddr=32.004734,%2035.861525');
//     }
// })}
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
  letterSpacing: 0,
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
}


const mapStateToActions = {
  getCategoryItem: requestCategoryItem,
  addItemToOrder: addItem

}

const mapStateToProps = state => ({
  Items: state.CategoryItemsReducer.CtegoryItems,
  Order: state.AddToOrderReducer.Order

});
export default connect(mapStateToProps, mapStateToActions)(WishListScreen)

const styles = StyleSheet.create({
  cardText: {
    position: 'absolute',
    top: 80,
    left: 50,
    right: 50,
    bottom: 0, 
    fontFamily: "Acens",
  fontSize: 26,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 42,
  letterSpacing: 0,
  textAlign: "center",
  color: "#ffffff",
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:1,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  loader: {
    position: 'absolute',
    top: 350,
    left: 150
  },
})




