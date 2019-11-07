import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View, Image,Dimensions,TouchableOpacity,ImageBackground ,Platform,AsyncStorage,Modal,FlatList,I18nManager,Alert} from 'react-native';
import getTheme from '../native-base-theme/components';
import variables from '../native-base-theme/variables/variables';
import { connect } from "react-redux";
import { requestCategoryItem } from '../actions/getCategoryItemsAction';
import { ItemNotification } from '../UI_Commponents/ItemNotification';
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

import { Localization } from 'expo-localization';
import Expo from 'expo';



import i18n from 'i18n-js';


const en = {
  notifications:'',
    home: 'Home',
    wishlist: 'Favorite',
    settings:'Settings',
    orders:'Orders',
        noRecordFound:'No Record Found',
    wishListTitle:'NOTIFICATIONS',
    callNow:'CALL NOW',
    deleteallnotifications:'Delete All Notifications',
    Doyouwanttoclearallnotification:'Do you want to clear all notifications?',
    cancel:'Cancel',
    ok:'Ok'
    
   
};
const ar = {
  home: 'الرئيسية',
  wishlist: 'المفضلة',
  settings:'الاعدادات',
  orders:'الطلبات',
    noRecordFound:'القائمة فارغة',
  wishListTitle:'الاشعارات',
  callNow:'اتصل الآن',
  deleteallnotifications:'مسح كل الاشعارات',
  Doyouwanttoclearallnotification:'هل ترغب بمسح كل الاشعارات؟',
  cancel:'الغاء',
  ok:'موافق'




};


class NotificationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        notifiyArr:[],
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
    this.onDelete = this.onDelete.bind(this)

  }
  setModalVisible(visible) {
    this.setState({ popUpModal: visible });
  }
 
  Navigate(itemId) {
    this.props.navigation.navigate('ItemScreen', {
      itemId: itemId
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
  async componentWillMount() {
    this._retrieveData()

   
  }
  static navigationOptions = {
    header:null

};

_retrieveData = async () => {
  this.setState({loading:true})
  try {
    const value = await AsyncStorage.getItem('userID');


    

    if (value !== null) {
      // We have data!!
      this.setState({ fetching_from_server_topseller: true }, () => {

      client.post(`/app/notification?customers_id=${value}`).then((res) => {
        if(res.data.status==200){
          this.setState({status:200, notifiyArr: res.data.data})
          
             
           
           
        }else{
          this.setState({status:204})        }
       
      }
      )})
    

this.setState({
  userID:value
  // userNmae:namevalue,
  // userPhone:phonevalue,
  // userPassword:passwvalue,
  // userEmail:userEmail
})

    }
  } catch (error) {
    // Error retrieving data
    console.log('getstorageitemerrrror',error);
  }
  
};


onDelete (index,item) {
   let newItem = this.state.notifiyArr;
          newItem.splice(index, 1)
          this.setState({ notifiyArr: newItem })
  client.post(`/app/cancelnotification?id=${item.id}`
  
  ).then((res) => {
     if(res.data.message=='notification returned.'){
     



       
     }
       
      

})

}



onDeleteAll () {
  // deleteallnotifications:'Delete All Notifications',
  // Doyouwanttoclearallnotification:'Do you want to clear all notifications?'
  
  Alert.alert(
    `${i18n.t('deleteallnotifications')}`,
    `${i18n.t('Doyouwanttoclearallnotification')}`,
    [
      
      {
        text:  `${i18n.t('cancel')}`,
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text:  `${i18n.t('ok')}`, onPress: () => 
    
      client.post(`/app/cancelnotification?id=0&customers_id=${this.state.userID}`

).then((res) => {
 if(res.data.status==200){  
      //  this.setState({ notifiyArr: [] })

 this.setState({status:204,notifiyArr:[]})



   
 }
     
  

})
    },
    ],
    {cancelable: true},
  );

  
   

}


componentDidMount(){
  
}
  render() {
    i18n.fallbacks = true;
    i18n.translations = { ar, en };
    //i18n.locale =null;

    i18n.locale = this.state.myLang;
    const  Items  = this.state.notifiyArr;
    let BaseURL = 'http://delico.qiotic.info';
    


    return (
      <StyleProvider style={getTheme(variables)}>
        <Container>
        {/* <Header style={{height:99,backgroundColor:'#8FCFEB'}}>
        
        <Left>
        <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('SearchScreen')}}>
                  <Icon name="search" style={{ color:'white',}}/>
                  </TouchableOpacity> 
        </Left>
        <Body style={styles.header}>
              <Title style={[styles.header,{fontSize:25,width:Dimensions.get('window').width/1.5,fontFamily:'Acens',marginLeft:0}]}>{i18n.t('wishListTitle')}</Title>
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
           
</TouchableOpacity>
               
</Body>
            </Right>
        </Header> 
          */}

<Header style={{height:99,backgroundColor:'#8FCFEB'}}>
        
        <Left>
        <Button style={{}} transparent onPress={() => this.props.navigation.goBack()}>
        <Icon
         style={{  transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],}}
        name={
        Platform.OS === 'ios'
          ? `ios-arrow-back`
          : 'arrow-back'
      }  />
                  </Button>
           
        </Left>
        <Body style={[styles.header,{width:Dimensions.get('window').width,justifyContent:'center',alignItems:'center'}]}>
              <Title style={[styles.header,{fontSize:25,width:Dimensions.get('window').width/1.5,fontFamily:'Acens',marginStart:0}]}>{i18n.t('wishListTitle')}</Title>
            </Body>
            <Right style={{width:50,justifyContent:'flex-end',marginRight:-70}} >
              <Body> 
              <TouchableOpacity 
     onPress={() =>
      this.onDeleteAll()

  }
    style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
    <Icon style={{color:'white',}} name={
        Platform.OS === 'ios'
          ? `ios-trash`
          : 'ios-trash'
      }/>



            </TouchableOpacity>
               
</Body>
            </Right>
        </Header> 
          <Content>
          
         {this.state.status==200 ?(
          this.state.notifiyArr.length > 0 ? (
                 
              <FlatList
              data={this.state.notifiyArr}
              renderItem={({ item ,index}) => (
                  <ItemNotification
                    // navigate={this.Navigate}
                    onDelete={this.onDelete}
                    index={index}
                    item={item}
                    
                    />
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
             
          </Content>
         
                    <View style={{
    justifyContent: 'center',
    alignItems: 'center',}}>
 
 <View >
        <View style={{ 
   width: Dimensions.get('window').width,justifyContent:'space-between',alignItems:'center',paddingEnd:15,paddingStart:15,
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
}


const mapStateToActions = {
  getCategoryItem: requestCategoryItem
}

const mapStateToProps = state => ({
  Items: state.CategoryItemsReducer.CtegoryItems,
  Order: state.AddToOrderReducer.Order

});
export default connect(mapStateToProps, mapStateToActions)(NotificationList)

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




