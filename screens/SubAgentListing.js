import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View, Image, Dimensions, TouchableOpacity, ImageBackground, Alert,Platform,ScrollView,I18nManager,AsyncStorage } from 'react-native';
import getTheme from '../native-base-theme/components';
import variables from '../native-base-theme/variables/variables';
import { connect } from "react-redux";
import { requestCategoryItem } from '../actions/getCategoryItemsAction';
import AddToCartModal from '../UI_Commponents/AddToCartModal';
import { SinglePickerMaterialDialog } from 'react-native-material-dialog';
import client from '../api/constant'

import { showMessage, hideMessage } from "react-native-flash-message";
import {addItem} from '../actions/AddToOrder'
import { FlatGrid } from 'react-native-super-grid';
import Modal from "react-native-modal";
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
  Content, Card, CardItem,Radio,
} from "native-base";

import { Localization } from 'expo-localization';
import Expo from 'expo';

let lang;

import i18n from 'i18n-js';

let BaseURL = 'https://smortec.com/';

const en = {
    home: 'Home',
    wishlist: 'Wishlist',
    settings:'Settings',
    orders:'Orders',
        filter:'Filter',
    atoz:'A-Z',
    ztoa:'Z-A',
    hightolow:'High to Low',
    lowtohigh:'Low to High',
    topseller:'Top Seller',
    mostLiked:'Most Liked',
    filterProducts:'Filter Products',
    callNow:'CALL NOW',
    addedSuccessfully:'Added Successfully',
    inCart:'Added To Cart',
    addToCart:'ADD TO CART',
    addedToWishList:'Added to Wishlist',
    removedFromWishList:"Removed from Wishlist",
    reset:"Reset",
    noRecordFound:'No Record Found',

    
   
};
const ar = {
  addedToWishList:'تمت الاضافة الى المفضلة',
  removedFromWishList:"تم الحذف من المفضلة",
  home: 'الرئيسية',
  wishlist: 'المفضلة',
  settings:'الاعدادات',
  orders:'Orders',
    filter:'فلتر',
  atoz:'ا-ي',
  ztoa:'ي-ا',
  hightolow:'من الاعلى الى الاقل',
  lowtohigh:'من الاقل الى الاعلى',
  topseller:'الأكثر مبيعاً',
  mostLiked:'الأكثر اعجاباً',
  filterProducts:'ترتيب المنتجات',
  callNow:'اتصل الآن',
  addedSuccessfully:'تمت اضافة العنصر بنجاح',
    inCart:'تمت الاضافة',
    addToCart:'أضف إلى السلة',
    reset:'اعادة تعيين',
    noRecordFound:'القائمة فارغة',






};

const arr=[{products_name:'Title',products_image:'https://cdn.newsapi.com.au/image/v1/4252c2266ea692402219cd0cdf94587b',products_desc:'desc1 desc1 desc1 desc1 desc1 desc1'},{products_name:'Title2',products_image:'https://www.thehindubusinessline.com/migration_catalog/9ovuz-nppa/alternates/LANDSCAPE_435/nppa',products_desc:'desc2 desc2 desc2 desc2 desc2 desc2'},{products_name:'Title3',products_image:'https://www.healthcarefinancenews.com/sites/healthcarefinancenews.com/files/styles/companion_top/public/pills3_crop.jpg?itok=MmOE8Jxo',products_desc:'desc3 desc3 desc3 desc3 desc3 desc3'},{products_name:'Title4',products_image:'http://im.rediff.com/money/2012/oct/28drug.jpg',products_desc:'desc4 desc4 desc4 desc4 desc4 desc4'}]

class SubAgentListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recordTotal:0,
      item:null,
      disableddefult:false,

      btnVisabilty:false,
      btnVisabilty_defult:false,
      count:1,
      value: 1,
      testArr:[],
      message: null ,
      val: 1,
      btnDisabled:false,
      typeOfAll:"",
      loading: true,
      loading_defult: true,
  
      fetching_from_server: false,
      fetching_from_server_defult: false,


      isModalVisible: false,
      isModalSortVisible: false,
      filter: 'defult',
      status:200,
      defultArr:[],
      popUpModal: false,
      testArr:[],
      wish:[],
      userID:'',
      singlePickerSelectedItem:'A To Z',
      singlePickerVisible: false,
      
      myLang: AsyncStorage.getItem("myLang").then((value) => {
        this.setState({ "myLang": value })
    }).done()
    ,




    }
    this.offset = 0;
    this.offset_defult = 0;
    this.offset_ztoa = 0;
this.offset_hightolow=0;
this.offset_lowtohight=0;
this.offset_topseller=0;
this.offset_mostliked=0;


    //Index of the offset to load from web API
    this._toggleModal = this._toggleModal.bind(this);
    this.Navigate = this.Navigate.bind(this)
  }
  likedPress(products_id){
    // if(this.state.wish.includes() !=undefined){
if(this.state.wish.includes(products_id)){
client.post(`/app/unlikeproduct?liked_products_id=${products_id}&liked_customers_id=${this.state.userID}`).then((res) => {
console.log("res00",res)
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
  this.setState({wish:[]})

  client.post(`/app/getallproducts?type=wishlist&customers_id=${this.state.userID}&language_id=${lang}`).then((res) => {
    for (let i=0;i<res.data.product_data.length;i++){
      this.setState({
        wish: [...this.state.wish, (res.data.product_data[i]).products_id]
      })       }

  })
}
})

}else{

client.post(`/app/likeproduct?liked_products_id=${products_id}&liked_customers_id=${this.state.userID}`).then((res) => {
  console.log("res11",res)

    if(res.data.status==200){

      Alert.alert(
        `${i18n.t('addedToWishList')}`,
        `${i18n.t('addedToWishList')}`,
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

handelAddToOrder(item){
  i18n.fallbacks = true;
  i18n.translations = { ar, en };

  i18n.locale = this.state.myLang;
  this.setState({testArr: this.state.testArr.concat(item.products_id)});
  let test=0;
  for(let i=0;i<=item.bounce.length;i++){

    if(item.bounce[i]!=undefined){ 

    if(this.state.count>=item.bounce[i].qty_from){
      if(item.bounce[i].type=='percent'){

        test=item.bounce[i].bounces;
test=(item.bounce[i].bounces)/100*this.state.count
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

    let totalSell=item.products_price*(this.state.count+parseInt(test))
    profitmargion= totalSell-(ppp*this.state.count)
    let margin=ppp*(this.state.count+parseInt(test))
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

    customers_basket_quantity: this.state.count,
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
  _retrieveData = async (type,z) => {
    console.log("typeeeeeeee",type)
    this.setState({typeOfAll:type})

    try {
      const value = await AsyncStorage.getItem('userID');
      const myLang = await AsyncStorage.getItem('myLang');
      if (value !== null) {
        // We have data!!
        if(myLang=='ar')
        {
          lang=4;
        }else{
          lang=1;
        }
        // We have data!!
        this.setState({userID:value})
       
        client.post(`/app/getallproducts?type=wishlist&customers_id=${value}&language_id=${lang}`).then((res) => {
          for (let i=0;i<res.data.product_data.length;i++){
          this.setState({
            wish: [...this.state.wish, (res.data.product_data[i]).products_id]
          })
        }
        
        
       
   
        })
      }

      if(type==null||type==undefined){
        console.log("this.offset_defult}000",this.offset_defult)

        client.post(`/app/getallproducts?page_number=${this.offset_defult}&agentId=${this.props.navigation.state.params.itemId}&language_id=${lang}`).then((res) => {
          if(res.data.message=='Returned all products.'){
            this.offset_defult = this.offset_defult + 1;
    console.log("this.offset_defult2222",this.offset_defult)
            this.setState({ defultArr: res.data.product_data, loading_defult: false, })
            this.setState({recordTotal:res.data.total_record})

            if(this.state.defultArr.length==res.data.total_record){
              this.setState({btnVisabilty_defult:false})
            }else{
              this.setState({btnVisabilty_defult:true})
            }
        
            for (let i=0;i<this.props.Order.length;i++){
      this.setState({
            testArr: [...this.state.testArr, (this.props.Order[i]).products_id],
      
            
          })
            
            }
      
           
          }
          if(res.data.status==200){
            this.setState({status:200})
          }else{
            this.setState({status:204})        }

            console.log("11sssss",res.data.product_data)

        this.setState({loading_defult:false})
        
        })
      }
      else if(type=='reset'&&z==0){
        console.log("jdhjsdhjshdjshdhjshdjshjdsjhdjhsd",this.offset_defult)
        this.offset_defult=z
        client.post(`/app/getallproducts?page_number=${this.offset_defult}&agentId=${this.props.navigation.state.params.itemId}&language_id=${lang}`).then((res) => {
    
          if(res.data.status==200){
            this.setState({status:200})
          }else{
            this.setState({status:204})        }
          if(res.data.message=='Returned all products.'){
          this.offset_defult = this.offset_defult + 1;
    
          this.setState({ defultArr: res.data.product_data, loading_defult: false, })
          this.setState({recordTotal:res.data.total_record})

          if(this.state.defultArr.length==res.data.total_record){
            this.setState({btnVisabilty_defult:false})
          }else{
            this.setState({btnVisabilty_defult:true})
          }
      
          for (let i=0;i<this.props.Order.length;i++){
    this.setState({
          testArr: [...this.state.testArr, (this.props.Order[i]).products_id],
    
          
        })
          
          }
    
         
        }
        
        
        })
      }
      else{
        var offset_guest
        if(type=='a to z'){
          offset_guest=this.offset
        }
        else if(type =='z to a'){
          offset_guest=this.offset_ztoa
    
        }
        else if(type=='high to low'){
          offset_guest=this.offset_hightolow
        }
        else if(type=='low to high'){
          offset_guest=this.offset_lowtohight
        }
        else if(type=='top seller'){
          offset_guest=this.offset_topseller
        }
        else if(type=='most liked'){
          offset_guest= this.offset_mostliked
        }
        console.log("offset_guest",offset_guest)
        client.post(`/app/getallproducts?page_number=${this.offset_guest}&agentId=${this.props.navigation.state.params.itemId}&language_id=${lang}&type=${type}`).then((res) => {
    console.log("res filterss",res)
    this.setState({recordTotal:res.data.total_record})

          if(res.data.status==200){
            this.setState({status:200})
          }else{
            this.setState({status:204})        }
          if(res.data.message=='Returned all products.'){
          if(type=='a to z'){
            this.offset = this.offset + 1;
          }
          else if(type =='z to a'){
            this.offset_ztoa=this.offset_ztoa+1;
      
          }
          else if(type=='high to low'){
            this.offset_hightolow=this.offset_hightolow+1
          }
          else if(type=='low to high'){
            this.offset_lowtohight=this.offset_lowtohight+1
          }
          else if(type=='top seller'){
            this.offset_topseller=this.offset_topseller+1
          }
          else if(type=='most liked'){
            this.offset_mostliked= this.offset_mostliked+1
          }
          this.setState({ defultArr: res.data.product_data, loading_defult: false, })
          if(this.state.defultArr.length==res.data.total_record){
            this.setState({btnVisabilty_defult:false})
          }else{
            this.setState({btnVisabilty_defult:true})
          }
      
          for (let i=0;i<this.props.Order.length;i++){
    this.setState({
          testArr: [...this.state.testArr, (this.props.Order[i]).products_id],
    
          
        })
          
          }
    
         
        }
        
        
        })
      }
    



    } catch (error) {
      // Error retrieving data
      console.log('getstorageitemerrrror',error);
    }
    if(this.state.testArr.includes(item.products_id)){
      this.setState({btnColor:'gray',txtColr:'#8FCFEB',btnDisabled:true,checkDisplay:'flex'})

}
  };
  setModalVisible(visible) {
    this.setState({ popUpModal: visible });
}
setSortModalVisible(visible) {
  this.setState({ isModalSortVisible: visible });
} 

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
  onSelect = data => {
    this.setState(data);
  };
  Navigate(itemId,title,onSelect) {
    const { Items } = this.props;
    const { Order } = this.props;

    this.props.navigation.navigate('ItemScreen', {
      itemId: itemId,
      title: title,
      onSelect:this.onSelect

    })
  }
  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  setItem = (item) =>
    this.setState({ item })

  static navigationOptions = {
    title: null,
    drawerLabel: 'Home', backgroundColor: 'red'
  };
  async componentWillMount(){
  
    const myLang = await AsyncStorage.getItem('myLang');
    const value = await AsyncStorage.getItem('userID');

      // We have data!!
      if(myLang=='ar')
      {
        lang=4;
      }else{
        lang=1;
      }
    
    this.setState({userID:value})
client.post(`/app/getallproducts?page_number=${this.offset_defult}&agentId=${this.props.navigation.state.params.itemId
}&language_id=${lang}`).then((res) => {
  console.log("ress2222",res)
  this.setState({recordTotal:res.data.total_record})
this.setState({loading_defult:false})
      if(res.data.status==200){
        this.setState({ defultArr: res.data.product_data })

        this.offset_defult = this.offset_defult + 1;

        if(this.state.defultArr.length==res.data.total_record){
          this.setState({btnVisabilty_defult:false})
        }else{
          this.setState({btnVisabilty_defult:true})
        }
      }}).catch((error) => {
        console.log("error3333333",error)
        this.setState({loading_defult:false})
  
  
    //   dispatch({type: HOME_LOADING, payload: false})
  
    })
    

  }
  async componentDidMount() {    // if (I18nManager.isRTL)
    // {
    //   lang=4;
    // }
    // else{
    //   lang=1;
    // }
        // this._retrieveData()
       
        const value = await AsyncStorage.getItem('userID');
        const myLang = await AsyncStorage.getItem('myLang');
        if (value !== null) {
          // We have data!!
          if(myLang=='ar')
          {
            lang=4;
          }else{
            lang=1;
          }
          this.setState({userID:value})
         
          client.post(`/app/getallproducts?type=wishlist&customers_id=${value}&language_id=${lang}`).then((res) => {
            for (let i=0;i<res.data.product_data.length;i++){
            this.setState({
              wish: [...this.state.wish, (res.data.product_data[i]).products_id]
            })
          }
          
          
         
     
          })
   
        }
    this.props.getCategoryItem()

    let itemId = this.props.navigation.state.params.itemId
    let image = this.props.navigation.state.params.image

        // }
  }
  static navigationOptions = {

    header:null
    // left: (<Icon name={'chevron-left'} onPress={() => { goBack() }} />),
    // title: 'DELICO',
    // headerStyle: {
    //   backgroundColor: '#8FCFEB', fontFamily: 'Acens', color: 'white', height: 77,
    //   elevation: null
    // },
    // headerTitleStyle: {
    //   fontFamily: 'Acens', color: 'white', fontSize: 25
    // },
    // headerRight: (
    //   <Icon name="search" style={{ color: 'white', marginEnd: 20 }} />
      

    // ),
  };
  showDialog(){
    LIST=['A To Z','Z To A']
    return(
      <SinglePickerMaterialDialog
  title={'Pick one element!'}
  items={LIST.map((row, index) => ({ value: index, label: row }))}
  visible={this.state.singlePickerVisible}
  selectedItem={this.state.singlePickerSelectedItem}
  onCancel={() => this.setState({ singlePickerVisible: false })}
  onOk={result => {
    this.setState({ singlePickerVisible: false });
    this.setState({ singlePickerSelectedItem: result.selectedItem });
  }}
/>
    )
  }









    loadMoreDataDefult = (type) => {
  console.log("honaaaaa1111",this.props.navigation.state.params.itemId)
          //On click of Load More button We will call the web API again
          this.setState({ fetching_from_server_defult: true,disableddefult:true  }, () => {
 
          if(type==undefined||type==null||type=='reset'|| type=='')
      {

          client.post(`/app/getallproducts?page_number=${this.offset_defult}&agentId=${this.props.navigation.state.params.itemId}&language_id=${lang}`).then((res) => {
console.log("res1111",res)
            if(res.data.message=='Returned all products.'){
              this.setState({defultArr:this.state.defultArr.concat(res.data.product_data),fetching_from_server_defult: false,disableddefult:false}) 
              this.setState({recordTotal:res.data.total_record})

              this.offset_defult = this.offset_defult + 1;
         
                if(this.state.defultArr.length==res.data.total_record){
                  this.setState({btnVisabilty_defult:false})
                }else{
                  this.setState({btnVisabilty_defult:true})
                }
            
                
        
              // }
            
        
            }else{
              this.setState({fetching_from_server_defult:false})
            }
      
          })
        }
   
      else{
        var offset_guest_load
        if(type=='most liked'){
          offset_guest_load=this.offset_mostliked
        }
        else if(type=='z to a'){
          offset_guest_load=this.offset_ztoa
        }
        else if(type=='a to z'){
          offset_guest_load=this.offset
        }
        else if(type=='low to high'){
          offset_guest_load=this.offset_lowtohight
        }
        else if(type=='high to low'){
          offset_guest_load=this.offset_hightolow
        }
        else if(type=='top seller'){
          offset_guest_load=this.offset_topseller
        }
        client.post(`/app/getallproducts?page_number=${offset_guest_load}&agentId=${this.props.navigation.state.params.itemId}&language_id=${lang}&type=${type}`).then((res) => {
          this.setState({
            defultArr: [...this.state.defultArr,res.data.product_data[i]],fetching_from_server_defult: false
          })
          this.setState({recordTotal:res.data.total_record})
          if(res.data.message=='Returned all products.'){
            if(type=='most liked'){
              this.offset_mostliked=this.offset_mostliked+1
            }
            else if(type=='z to a'){
this.offset_ztoa=this.offset_ztoa+1
            }
            else if(type=='a to z'){
              this.offset=this.offset+1
            }
            else if(type=='low to high'){
              this.offset_lowtohight=this.offset_lowtohight+1
            }
            else if(type=='high to low'){
              this.offset_hightolow=this.offset_hightolow+1
            }
            else if(type=='top seller'){
              this.offset_topseller=this.offset_topseller+1
            }
            for (let i=0;i<res.data.product_data.length;i++){
             
           
              if(this.state.defultArr.length==res.data.total_record){
                this.setState({btnVisabilty_defult:false})
              }else{
                this.setState({btnVisabilty_defult:true})
              }
          
              
      
            }
          
      
          }
         
    
        })
      }
      
        });
          };

    



    renderFooterDefult() {
      if(this.state.btnVisabilty_defult){

      
      return (
      //Footer View with Load More button
        <View style={{ padding: 10,width:Dimensions.get('window').width,backgroundColor:'white',
          justifyContent: 'center',height:80,paddingBottom:60,
          
          alignItems: 'center',
          flexDirection: 'row',}}>
          <TouchableOpacity
            activeOpacity={0.9}
            disabled={this.state.disableddefult?true:false}

            onPress={()=>{this.loadMoreDataDefult(this.state.typeOfAll)}}
            style={{padding: 10,
              backgroundColor: 'white',shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              
              elevation: 5,
              
              borderRadius: 4,
              flexDirection: 'row',
              justifyContent: 'center',width:50,height:50,borderRadius:25,
              alignItems: 'center',}}>
            {/* <Text style={{color: 'white',
    fontSize: 15,
    textAlign: 'center',}}>Load More</Text> */}
    {/* <Image  style={{ height:this.state.fetching_from_server_defult? 0:27,width:27}}  source={require('../assets/images/loadmore.png')}/> */}
    <Icon name="md-add" style={{ height:this.state.fetching_from_server_defult? 0:27,width:27,color:"#8FCFEB",textAlign:"center"}}/>

            {this.state.fetching_from_server_defult ? (
              <ActivityIndicator color="#8FCFEB" style={{ marginLeft: -25.5,}} />
            ) : null}
          </TouchableOpacity>
        </View>
      );
            } else{
              return(
                null
              )
            }
           
    }




  returnArray() {
    var testArrTest=this.state.testArr
    for (let i=0;i<this.props.Order.length;i++){
      // this.setState({
      //     //   testArr: [...this.state.testArr, (this.props.Order[i]).products_id],
      
            
      //     // })
          testArrTest=[...testArrTest, (this.props.Order[i]).products_id]
        }
        console.log("testArrTest22",testArrTest)

    const { Items } = this.props;

    // this.setState({arr:Items})
    if (this.state.filter === 'defult'||this.state.filter === 'AtoZ'||this.state.filter=='ZtoA'||this.state.filter=='hightolow'||this.state.filter=='lowtohigh'||this.state.filter=='topseller'||this.state.filter=='mostliked') {
      return (
        <Content>
          <View style={{ flex: 1 }}>
            {this.state.isModalVisible &&
              <AddToCartModal
                _toggleModal={this._toggleModal}
                isModalVisible={this.state.isModalVisible}
                setItem={this.setItem}
                item={this.state.item}
              />
            }
           
         {this.state.status==200 ?(
                this.state.loading_defult? (
                  <ActivityIndicator color='#8FCFEB' size="large"  style={{color:'#8FCFEB',marginTop:50}}/>
                ) :   
          this.state.defultArr.length > 0 ? (
            
       
              <FlatGrid
              // itemDimension={130}
              itemDimension={Dimensions.get('window').width>420?200:130}

              items={this.state.defultArr}
              // items={arr}
              style={styles.gridView}
              renderItem={({ item, index }) => (
                // <ItemCard
                //   navigate={this.Navigate}
                //   _toggleModal={this._toggleModal}
                //   setItem={this.setItem}
                //   index={index}
                //   item={item}
                //   Order={this.state.testArr}
                //   wish={this.state.wish}

                // />



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
                              source={{uri: BaseURL +item.products_image}} 
                               style={{ 
                                 position: 'absolute',
                              top: 0,height:null,
                              flex:1,
                              left: 0,
                              bottom: 0,
                              right: 0,
                              }}/>
                   </TouchableOpacity> 
                   <View style={{justifyContent:'flex-start',width:'85%',flexDirection:'column',alignItems:'flex-start',padding:3}}>
             
              <Text   numberOfLines={2}
              style={{  fontSize: 13,
                height:40,

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
              ListFooterComponent={this.renderFooterDefult.bind(this)}
            />
            
            ) : 
            <View style={{justifyContent:'center',alignItems:'center',width:'100%'}}>
            <Text style={{fontFamily: "Acens",
         fontSize: 15,marginTop:100,
         fontWeight: "normal",
         fontStyle: "normal",
         letterSpacing: 0,
         textAlign: "left",
         color: "#777777"}} >{i18n.t('noRecordFound')}</Text>
          </View>
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
        
          </View>
        </Content>
      
    
       ) }
       


   
  
  }
  defultSort() {
    this.setSortModalVisible(false)
    this.setState({ filter: 'defult' })
    this.setState({ loading_defult: true })

    this._retrieveData('reset',0)

  }
  aToz() {
    this.setSortModalVisible(false)
    this.setState({ filter: 'AtoZ' })
    this.setState({ loading_defult: true })
    this._retrieveData('a to z')


  }
  zToa() {
    this.setSortModalVisible(false)

    this.setState({ filter: 'ZtoA' })
    this.setState({ loading_defult: true })
    this._retrieveData('z to a')
   
  }
  highToLow() {
    this.setSortModalVisible(false)

  
    this.setState({ filter: 'hightolow' })
    this.setState({ loading_defult: true })
    this._retrieveData('high to low')
  }
  
  lowToHight(){
    this.setSortModalVisible(false)

    this.setState({ filter: 'lowtohigh' })
    this.setState({ loading_defult: true })
    this._retrieveData('low to high')

  }
  topseller(){
    this.setSortModalVisible(false)

    this.setState({ filter: 'topseller' })
    this.setState({ loading_defult: true })
    this._retrieveData('top seller')
  }
  mostliked(){
    this.setSortModalVisible(false)

    this.setState({ filter: 'mostliked' })
    this.setState({ loading_defult: true })
    this._retrieveData('most liked')

  }
  // defultSort() {
  //   this.setSortModalVisible(false)
  //   this.setState({ filter: 'defult' })
 
  // }
  // aToz() {
  //   this.setSortModalVisible(false)
  //   this.setState({ filter: 'AtoZ' })

  // }
  // zToa() {
  //   this.setSortModalVisible(false)

  //   this.setState({ filter: 'ZtoA' })
  // }
  // highToLow() {
  //   this.setSortModalVisible(false)

  //   this.setState({ filter: 'hightolow' })
  // }
  
  // lowToHight(){
  //   this.setSortModalVisible(false)

  //   this.setState({ filter: 'lowtohigh' })

  // }
  // topseller(){
  //   this.setSortModalVisible(false)

  //   this.setState({ filter: 'topseller' })

  // }
  // mostliked(){
  //   this.setSortModalVisible(false)

  //   this.setState({ filter: 'mostliked' })

  // }
  popup() { }
  render() {
   console.log("defultArrrrrrr",this.state.defultArr)
    i18n.fallbacks = true;
    i18n.translations = { ar, en };
 

    i18n.locale = this.state.myLang;
    const { Items } = this.props;
  

    return (
      <StyleProvider style={getTheme(variables)}>
        <Container>
        <Header style={{height:99,backgroundColor:'#8FCFEB'}}>
        
        <Left style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <Button style={{}} transparent onPress={() => this.props.navigation.goBack()}>
              <Icon style={{  transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],}}
               name={
        Platform.OS === 'ios'
          ? `ios-arrow-back`
          : 'arrow-back'
      }  />
            </Button>
            <View style={{width:15}}/>
            <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('SearchScreen')}}>
                  <Icon name="search" style={{ color:'white',}}/>
                  </TouchableOpacity> 
        </Left>
        <Body style={styles.header}>
              <Title style={{fontSize:25,width:Dimensions.get('window').width/1.5,fontFamily:'Acens',marginLeft:0,color:"#fff"}}>SMORTEC</Title>
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

          <ScrollView>
         

          <View style={{
            backgroundColor: 'white',
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
           
          }}>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '50%', alignItems: 'center' }}>
            
               
              
                <Text style={{
                  fontFamily: "newFont",
                  fontSize: 15,
                  fontWeight: "normal",
                  fontStyle: "normal",
                  lineHeight: 17,
                  letterSpacing: 0,
                  color: "#909090",marginStart: 15, marginEnd: 13
                }}>{this.props.navigation.state.params.name}
                <Text style={{
                  fontFamily: "numFont",
                  fontSize: 15,
                  fontWeight: "normal",
                  fontStyle: "normal",
                  lineHeight: 17,
                  letterSpacing: 0,
                  color: "#8FCFEB",marginStart: 15, marginEnd: 13
                }}> ({this.state.recordTotal})</Text>
                </Text>
            </View>
</View>


          <View style={{
            backgroundColor: '#E8E8E8',
            height: 47,marginBottom:-15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: -6
          }}>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '50%', alignItems: 'center' }}>
              <TouchableOpacity
              style={{flexDirection: 'row', justifyContent: 'flex-start', width: '50%', alignItems: 'center'}}
              onPress={() => {
                this.setSortModalVisible(!this.state.setSortModalVisible);
            }}
               
              >
                <Image
                  source={require('../assets/images/bluefilter.png')}
                  style={{ width: 20, height: 20, marginStart: 15, marginEnd: 13 }}
                />
             
              
                <Text style={{
                  fontFamily: "newFont",
                  fontSize: 15,
                  fontWeight: "normal",
                  fontStyle: "normal",
                  lineHeight: 17,
                  letterSpacing: 0,
                  color: "#787878"
                }}>{i18n.t('filter')}</Text>
              </TouchableOpacity>
            </View>


            {/* <View style={{flexDirection:'row',justifyContent:'flex-end',width:'50%',alignItems:'center'}}>
<TouchableOpacity>
<Image
                source={require('../assets/images/sortbyicon.png')}
                style={{width:20,height:20,}}
              />
              </TouchableOpacity>
              <TouchableOpacity>

               <Image
                source={require('../assets/images/listsort.png')}
                style={{width:20,height:20,marginStart:13,marginEnd:15}}
              />
              </TouchableOpacity>
</View> */}

          </View>
          {this.returnArray()}
          </ScrollView>
        
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
                                        <Text style={{ fontSize: 20, color: 'white', fontFamily: 'Acens',width:Dimensions.get('window').width/1.67,textAlign:'center' }}>Filter Products</Text>
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
                onPress={ () => { this.aToz() } }
                style={{width:'100%',height:44,justifyContent:'center',alignItems:'center'}}>
               
                <Text style={{fontFamily: "Acens",
  fontSize: 16,
  fontWeight: "bold",
  fontStyle: "normal",}}>
                  {i18n.t('atoz')}
                </Text>
                </TouchableOpacity>
                <View style={{width:'100%',height:4,backgroundColor:'black'}}/>
                <TouchableOpacity
                 onPress={ () => { this.zToa() } }
                style={{width:'100%',height:44,justifyContent:'center',alignItems:'center'}}>

                <Text style={{fontFamily: "Acens",
  fontSize: 16,
  fontWeight: "bold",
  fontStyle: "normal",}}>
                  {i18n.t('ztoa')}
                </Text>
                </TouchableOpacity>
                <View style={{width:'100%',height:1,backgroundColor:'black'}}/>
                <TouchableOpacity  onPress={ () => { this.highToLow() } } style={{width:'100%',height:44,justifyContent:'center',alignItems:'center'}}>

                <Text style={{fontFamily: "Acens",
  fontSize: 16,
  fontWeight: "bold",
  fontStyle: "normal",}}>
              {i18n.t('hightolow')}
                </Text>
                </TouchableOpacity>

                <View style={{width:'100%',height:1,backgroundColor:'black'}}/>
                <TouchableOpacity  onPress={ () => { this.lowToHight() } } style={{width:'100%',height:44,justifyContent:'center',alignItems:'center'}}>

                <Text style={{fontFamily: "Acens",
  fontSize: 16,
  fontWeight: "bold",
  fontStyle: "normal",}}>
                {i18n.t('lowtohigh')}
                </Text>
                </TouchableOpacity>

                <View style={{width:'100%',height:1,backgroundColor:'black'}}/>
                <TouchableOpacity  onPress={ () => { this.topseller() } } style={{width:'100%',height:44,justifyContent:'center',alignItems:'center'}}>

                <Text style={{fontFamily: "Acens",
  fontSize: 16,
  fontWeight: "bold",
  fontStyle: "normal",}}>
               {i18n.t('topseller')}
                </Text>
                </TouchableOpacity>
                <View style={{width:'100%',height:1,backgroundColor:'black'}}/>
                <TouchableOpacity  onPress={ () => { this.mostliked() } } style={{width:'100%',height:44,justifyContent:'center',alignItems:'center'}}>

                <Text style={{fontFamily: "Acens",
  fontSize: 16,
  fontWeight: "bold",
  fontStyle: "normal",}}>
               {i18n.t('mostLiked')}
                </Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={ () => { this.defultSort() } } style={{width:'100%',height:44,justifyContent:'center',alignItems:'center'}}>

<Text style={{fontFamily: "Acens",
fontSize: 16,
fontWeight: "bold",
fontStyle: "normal",}}>
{i18n.t('reset')}
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

<View style={{
    justifyContent: 'center',
    alignItems: 'center',}}>
 
 <View >
        <View style={{  width: Dimensions.get('window').width,justifyContent:'space-between',alignItems:'center',paddingEnd:15,paddingStart:15,
    height: 60,flexDirection:'row',
    backgroundColor: 'white',borderTopColor:'gray',borderTopWidth:0.3,
    
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
  getCategoryItem: requestCategoryItem,
  addItemToOrder: addItem
}

const mapStateToProps = state => ({
  Items: state.CategoryItemsReducer.CtegoryItems,
  Order: state.AddToOrderReducer.Order,
  dumyItem: state.CategoryItemsReducer.CtegoryItems,

});

export default connect(mapStateToProps, mapStateToActions)(SubAgentListing)

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
    zIndex: 1,
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