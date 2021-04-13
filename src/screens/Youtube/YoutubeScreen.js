import React from 'react';
import { FlatList, ScrollView,AsyncStorage,Linking ,Text, View, TouchableOpacity, Image ,StyleSheet} from 'react-native';
import styles from './styles';
import { recipes } from '../../data/dataArrays';
import MenuImage from '../../components/MenuImage/MenuImage';
import DrawerActions from 'react-navigation';
import { getCategoryName } from '../../data/MockDataAPI';
import Items from '../../components/Items/Items';
import ImagePreview from 'react-native-image-preview';
import AnimatedLoader from "react-native-animated-loader";
import * as Animatable from "react-native-animatable";
import { WebView } from 'react-native-webview';
import axios from 'axios';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default class YoutubeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Videos',
    headerTitleStyle: { alignSelf: 'center' },
    headerLeft: (
      <MenuImage
        onPress={() => {
          navigation.openDrawer();
        }}
      />
      ),
      headerRight: (
        <Text></Text>
      )
  });

  constructor(props) {
    super(props);
    this.state={
      data:[],
      visible: true,
      url:''
    }
  }
onPressRecipe =item =>{
    // this.setState({visible:true,image:item})
  };
  componentDidMount = async() => {
    // await AsyncStorage.setItem({"url":"http://staging.shafiquesons.com/"})
    var url = await AsyncStorage.getItem('url')
    this.props.navigation.setParams({title:this.props.navigation.getParam('name')})
    axios({
      method: 'get',
      url:  url+'api/videos_list',
      // responseType: 'stream'
    })
      .then(({ data: response }) => {
        console.log(response.videos)
        this.setState({data:response.videos,visible:false,url:url})
      });
  }
  renderCategory = ({ item }) => (
    <Animatable.View style={styles.card} animation="slideInDown" iterationCount={1} direction="alternate">
      <TouchableOpacity underlayColor='rgba(73,182,77,1,0.9)' onPress={() =>Linking.openURL(item.url)}>
        <View style={styles.categoriesItemContainer}>
            <Image style={styles.categoriesPhoto} source={{ uri: this.state.url+"storage/"+item.image }} />
            <Text style={styles.categoriesName}>{item.title}</Text>
          {/* <Text style={styles.categoriesInfo}>{getNumberOfRecipes(item.id)} recipes</Text> */}
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
  render() {
    const {visible} = this.state
    return (
      <View style={{flex:1}}>
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