import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image,AsyncStorage,StyleSheet } from 'react-native';
import styles from './styles';
import Items from '../../components/Items/Items';
import ImagePreview from 'react-native-image-preview';
import axios from 'axios';
import MenuImage from '../../components/MenuImage/MenuImage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AnimatedLoader from "react-native-animated-loader";
import * as Animatable from "react-native-animatable";
export default class ItemScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name,
    headerTitleStyle: { alignSelf: 'center' },
    headerLeft: (
      <MenuImage
        onPress={() => {
          navigation.openDrawer();
        }}
      />
    )
  });

  constructor(props) {
    super(props);
    this.state={
      visible:false,
      image:'',
      data:[],
      MetaData:[],
      url:'',
      loading: true,
      Productsloading: false,
      Error:''
    }
  }
  componentDidMount = async () => {
    var url = await AsyncStorage.getItem('url')
    this.props.navigation.setParams({title:this.props.navigation.getParam('name')})
    axios({
      method: 'post',
      url: url+'api/get_products_or_sizes',
      // responseType: 'stream'
      data: {
        sub_sub_cat_id:this.props.navigation.getParam('id')
      }
    })
    .then(async({ data: response }) => {
      // return console.log(response.sizes)
      if(response.sizes){
        if(response.sizes.length==0){
          this.setState({Error:"No Data Exist!"})
        }
        else{
          console.log('sizes',response.sizes)
          await this.setState({MetaData:response.sizes,url:url,loading:false,Error:''})
          console.log('si',response.sizes)
        }
      }
    if(response.products){
      if(response.products.length==0){
        this.setState({Error:"No Data Exist!"})
      }
      else{
        // console.log('pro',response.products)
        await this.setState({data:response.products,url:url,loading:false,Error:''})
      }
    }
      
    });
    
  }
  getProducts = async (id) => {
    this.setState({Productsloading:true})
    axios({
      method: 'post',
      url: this.state.url+'api/products_of_size',
      data: {
        size_id:id
      }
    })
    .then(async({ data: response }) => {
      if(response.products.length==0){
        this.setState({Error:"No Data Exist!"})
      }
      else{
        await this.setState({data:response.products,Productsloading:false,Error:''})
      }
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
          <View style={styles.container}>
            <Image style={styles.photo} source={{ uri: this.state.url+"storage/"+item.image }} />
            <Text style={styles.title}>{item.code}</Text>
          </View>
      </TouchableHighlight>
    </Animatable.View>
  );
  renderSizes = ({ item }) => (
    <Animatable.View style={styles.card} animation="slideInDown" iterationCount={1} direction="alternate">
      <TouchableOpacity  underlayColor='rgba(73,182,77,1,0.9)' onPress={() =>this.getProducts(item.id)} >
          <View style={styles.Sizescontainer}>
            <Text style={[styles.title,{color:'white'}]}>{item.size}</Text>
          </View>
      </TouchableOpacity>
    </Animatable.View>
  );
  render() {
    const {loading} = this.state
    return (
      <View>
        {this.state.MetaData.length>0?
        <View>
          <View style={{justifyContent:'center',alignItems:'center',paddingVertical:10}}>
                <Text style={{fontSize:20}}>Sizes</Text>
                <Text style={{color:"#787A85"}}>Select Size for Products </Text>
          </View>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            numColumns={3}
            data={this.state.MetaData}
            renderItem={this.renderSizes}
            keyExtractor={item => `${item.id}`}
          />
          </View>
        :
        <></>
        }
        <ImagePreview visible={this.state.visible} source={{uri: this.state.image}} close={this.closeImage} />
            {this.state.data.length>0 &&
              <View style={{justifyContent:'center',alignItems:'center',paddingVertical:10}}>
                <View style={{borderBottomWidth:1,borderColor:'#FF6347',paddingBottom:10}}>
                  <Text style={{fontSize:20}}>Products</Text>
                </View>
              </View>
            }
            <FlatList
              vertical
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={this.state.data}
              renderItem={this.renderProducts}
              keyExtractor={item => `${item.recipeId}`}
            />
            <AnimatedLoader
              visible={loading}
              overlayColor="rgba(255,255,255,0.75)"
              // source={require("./loader.json")}
              animationStyle={styless.lottie}
              speed={2}
            >
              <Text style={{fontSize:18}}>Loading...</Text>
            </AnimatedLoader>
      </View>
    );
  }
}
const styless = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100
  }
});