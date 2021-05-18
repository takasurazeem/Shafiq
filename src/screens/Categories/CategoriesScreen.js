import React from 'react';
import axios from 'axios';
import AnimatedLoader from "react-native-animated-loader";
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
  AsyncStorage,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Pressable
} from 'react-native';
import styles from './styles';
import { categories } from '../../data/dataArrays';
import { getNumberOfRecipes } from '../../data/MockDataAPI';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MenuImage from '../../components/MenuImage/MenuImage';
import * as Animatable from "react-native-animatable";
export default class CategoriesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name,
    headerTitleStyle: { alignSelf: 'center' },
    headerLeft:null,
    headerLeft: (
      <MenuImage
        onPress={() => {
          navigation.openDrawer();
        }}
      />
      ),
      headerRight: (
        <Pressable onPress={()=>{navigation.navigate('Home')}}>
          <Image
            style={styless.headerButtonImage}
            source={require('../../../assets/icons/home.png')}
          />
        </Pressable>
      ),
  });
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      url:'',
      visible: true
    }
  }
  componentDidMount = async () => {
    var url = await AsyncStorage.getItem('url')
    this.props.navigation.setParams({title:this.props.navigation.getParam('name')})
    console.log(url)

    axios({
      method: 'post',
      url: url+'api/sub_cat',
      // responseType: 'stream'
      data: {
        main_cat_id:this.props.navigation.getParam('id')
      }
    })
    .then(async({ data: response }) => {
      console.log(response.sub_cats)
      await this.setState({data:response.sub_cats,url:url,visible:false})
    });
  }
  onPressCategory = item => {
    this.props.navigation.navigate('Sub_Categories',{id:item.id,name:item.name})
  };

  renderCategory = ({ item }) => (
    <Animatable.View  animation="slideInDown" iterationCount={1} direction="alternate">
       {/* <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressCategory(item)}>
         <View style={styles.categoriesItemContainer}>
             <Image style={styles.categoriesPhoto} source={{ uri: this.state.url+"storage/"+item.icon }} />
             <Text style={styles.categoriesName}>{item.name}</Text>
         </View>
       </TouchableHighlight> */}
     
      <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressCategory(item)}>
        <View style={styles.card}>
            <Image style={styles.cardImage} source={{uri: this.state.url+"storage/"+item.icon}}/>
            <View style={styles.cardHeader}>
                <View style={styles.timeContainer}>
                  <Text style={styles.title}>{item.name}</Text>
                </View>
              </View>
        </View>
      </TouchableHighlight>
    </Animatable.View>
  );

  render() {
    const {visible} = this.state
    return (

      <ImageBackground style={{ flex:1}} resizeMode= 'stretch' source={require('../../../assets/1.jpg')}>
          <FlatList
            data={this.state.data}
            renderItem={this.renderCategory}
            keyExtractor={item => `${item.id}`}
          />
        <AnimatedLoader
          visible={visible}
          overlayColor="rgba(255,255,255,0.75)"
          // source={require("./loader.json")}
          animationStyle={styless.lottie}
          speed={2}
        >
          <Text style={{fontSize:18}}>Loading...</Text>
        </AnimatedLoader>
      </ImageBackground>
    );
  }
}
const styless = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100
  },
  headerButtonImage: {
    justifyContent: 'center',
    width: 35,
    height: 35,
    margin: 6
  }
});