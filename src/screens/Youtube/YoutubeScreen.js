import React from 'react';
import { FlatList, ImageBackground,AsyncStorage,Linking ,Text, View, TouchableHighlight, Image ,StyleSheet} from 'react-native';
import styles from './styles';
import { recipes } from '../../data/dataArrays';
import MenuImage from '../../components/MenuImage/MenuImage';
import DrawerActions from 'react-navigation';
import { getCategoryName } from '../../data/MockDataAPI';
import Items from '../../components/Items/Items';
import ImagePreview from 'react-native-image-preview';
import AnimatedLoader from "react-native-animated-loader";
import { Surface } from 'react-native-paper';
import * as Animatable from "react-native-animatable";
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
        <Image
        style={styless.headerButtonImage}
        source={require('../../../assets/icons/youtube2.png')}
        />
      ),
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
    <Animatable.View  animation="slideInDown" iterationCount={1} direction="alternate">
      {/* <TouchableOpacity underlayColor='rgba(73,182,77,1,0.9)' onPress={() =>Linking.openURL(item.url)}>
        <View style={styles.categoriesItemContainer}>
            <Image style={styles.categoriesPhoto} source={{ uri: this.state.url+"storage/"+item.image }} />
            <Text style={styles.categoriesName}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    </Animatable.View> */}
    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() =>Linking.openURL(item.url)}>
        <View style={styles.card}>
            <Image style={styles.cardImage} source={{uri: this.state.url+"storage/"+item.image}}/>
            <View style={styles.cardHeader}>
                <View style={styles.timeContainer}>
                  <Text style={styles.title}>{item.title}</Text>
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
  surface: {
    padding: 8,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  headerButtonImage: {
    justifyContent: 'center',
    width: 35,
    height: 35,
    margin: 6
    }
});