import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
  AsyncStorage,
  TextInput,
  ImageBackground,
  Keyboard,
  Platform,
  Alert
} from 'react-native';
import axios from 'axios';
import styles from './styles';
import ImagePreview from 'react-native-image-preview';
import MenuImage from '../../components/MenuImage/MenuImage';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import AnimatedLoader from "react-native-animated-loader";
import * as Animatable from "react-native-animatable";
import { SafeAreaView } from 'react-native-safe-area-context';
export default class SearchScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Search',
    headerTitleStyle: { alignSelf: 'center' },
    headerLeft: (
      <MenuImage
        onPress={() => {
          navigation.openDrawer();
        }}
      />
      ),
      headerRight: (
        <Image
        style={style.headerButtonImage}
        source={require('../../../assets/icons/search.png')}
        />
      ),
  });

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      Productsloading: false,
      data: [],
      items: [],
      size:'',
      code:''
    };
  }
  componentDidMount =async () => {
    var url = await AsyncStorage.getItem('url')
    console.log(url+'api/sizes_list')
    axios({
      method: 'get',
      url: url+'api/sizes_list',
    })
    .then(async({ data: response }) => {
      console.log(response.sizes)
      var sizes=[]
      response.sizes.map(x =>{
          sizes.push({label: x.size, value: x.id, icon: () => <Icon name="flag" size={18} color="#900" />})
      })
      await this.setState({data:sizes,url:url,Productsloading:false})
    });
  }
  search =async () => {
    if(this.state.size =="" && this.state.code ==""){
       return alert('Select Size or Enter Code!')
    }
    await this.setState({Productsloading:true})
    axios({
      method: 'post',
      url: this.state.url+'api/search_products',
      data: {
        size_id:this.state.size,
        code:this.state.code,
      }
    })
    .then(async({ data: response }) => {
      if(response.data.length==0){
        // this.setState({items:[],Productsloading:false,Error:''})
       return Alert.alert(
          "No Data Found",
          "",
          [
            
            { text: "OK", onPress: () => this.setState({items:[],Productsloading:false,Error:''}) }
          ]
        );
    
      }
        await this.setState({items:response.data,Productsloading:false,Error:''})
    });
  }
  onPressProduct =item =>{
    this.setState({visible:true,image:item})
  };
  closeImage =() =>{
    this.setState({visible:false})
  };
  renderProducts = ({ item }) => (
    <Animatable.View style={styles.card} animation="slideInDown" iterationCount={1} direction="alternate">
      <TouchableHighlight  underlayColor='rgba(73,182,77,1,0.9)'  onPress={() => this.onPressProduct(this.state.url+"storage/"+item.image)}>
          {/* <View style={styles.container}>
            <Image style={styles.photo} source={{ uri: this.state.url+"storage/"+item.image }} />
            <Text style={styles.title}>{item.code}</Text>
          </View> */}
          <View style={{  }}>
                <View style={styles.imageContainer}>
                  <Image style={styles.cardImage} source={{uri:this.state.url+"storage/"+item.image}}/>
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.title}>{item.code}</Text>
                </View>
              </View>
      </TouchableHighlight>
    </Animatable.View>
  );

  render() {
    return (
      <ImageBackground style={{ flex:1}} resizeMode= 'stretch' source={require('../../../assets/1.jpg')}>
        <SafeAreaView style={{ flex:1 }}>
          <View style={{  flexDirection:'row',justifyContent:'center',marginTop:5 }}>
            <Text style={{ fontSize:20,paddingBottom:5,borderBottomWidth:1,borderBottomColor:'#FF6347' }}>Search Items</Text>
          </View>
          <View style={{ paddingHorizontal:20,paddingTop:20,alignItems:'center'}}>
          <View style={{width:'70%',marginVertical:10,zIndex:0 }}>
              <Text>Search by Code</Text>
              <TextInput
                style={{ height: 40,borderWidth: .1,backgroundColor:'#fafafa',borderColor:'#adadad' }}
                onChangeText={code =>{this.setState({code:code})}}
                // value={number}
                placeholder="Code###"
                // keyboardType="numeric"

              />
            </View>

            <View style={{width:'70%',marginVertical:10,zIndex:1000}}>
              <Text>Select Size</Text>
              <DropDownPicker
                  items={this.state.data}
                  defaultValue={this.state.country}
                  containerStyle={{height: 40}}
                  style={{backgroundColor: '#fafafa'}}
                  itemStyle={{
                      justifyContent: 'flex-start'
                  }}
                  dropDownStyle={{backgroundColor: '#fafafa'}}
                  onChangeItem={size => this.setState({size:size})}
              />
            </View>
            <View style={{alignItems:'center' ,zIndex:0,marginBottom:20}}>
            <TouchableOpacity style={{ backgroundColor:'#FF6347',zIndex:0,paddingHorizontal:'25%',paddingVertical:15,borderRadius:10 }} onPress={this.search}>
              <Text style={{ color:'white' }}>Search</Text>
            </TouchableOpacity>
          </View>
          </View>
          
          
          <ImagePreview visible={this.state.visible} source={{uri: this.state.image}} close={this.closeImage} />
              {this.state.items.length>0 &&
                // <View style={{justifyContent:'center',alignItems:'center',paddingVertical:10,zIndex:0,width:"100%"}}>
                  <View style={{paddingBottom:10,zIndex:0,marginVertical:10,alignItems:'center'}}>
                    <Text style={{borderBottomWidth:1,borderColor:'#FF6347',fontSize:20}}>Products</Text>
                  </View>
                // </View>
              }
              <FlatList
                vertical
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={this.state.items}
                renderItem={this.renderProducts}
                keyExtractor={item => `${item.size_id}`}
              />
            {/* </View>
            
          </View> */}
          {/* <View style={{ flexDirection:'row',justifyContent:'center',zIndex:0 }}>
            <TouchableOpacity style={{ backgroundColor:'#FF6347',padding:15,borderRadius:10,zIndex:0 }} onPress={this.search}>
              <Text style={{ color:'white' }}>Search</Text>
            </TouchableOpacity>
          </View> */}
          
          <ImagePreview visible={this.state.visible} source={{uri: this.state.image}} close={this.closeImage} />
              <AnimatedLoader
                visible={this.state.Productsloading}
                overlayColor="rgba(255,255,255,0.75)"
                // source={require("./loader.json")}
                animationStyle={styles.lottie}
                speed={2}
              >
                <Text style={{fontSize:18}}>Loading...</Text>
              </AnimatedLoader>
          
        </SafeAreaView>
      </ImageBackground>
    );
  }
}
const style=StyleSheet.create({
  headerButtonImage: {
  justifyContent: 'center',
  width: 35,
  height: 35,
  margin: 6
  }
  });