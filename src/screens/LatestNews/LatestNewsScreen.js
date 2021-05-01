import React from 'react';
import axios from 'axios';
import AnimatedLoader from "react-native-animated-loader";
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
  ImageBackground,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import styles from './styles';
import { categories } from '../../data/dataArrays';
import { getNumberOfRecipes } from '../../data/MockDataAPI';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MenuImage from '../../components/MenuImage/MenuImage';
import * as Animatable from "react-native-animatable";
import ViewMoreText from 'react-native-view-more-text';
export default class CategoriesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Latest News',
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
        <Image
        style={styless.headerButtonImage}
        source={require('../../../assets/icons/news.png')}
        />
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
    console.log(url)

    axios({
      method: 'get',
      url: url+'api/latest_news',
      // responseType: 'stream'
    })
    .then(async({ data: response }) => {
      console.log(response.latest_news)
      await this.setState({data:response.latest_news,url:url,visible:false})
    });
  }
  renderViewMore(onPress){
    return(
      <Text onPress={onPress} style={{ color:'#5a97fa' }}>View more</Text>
    )
  }
  renderViewLess(onPress){
    return(
      <Text onPress={onPress} style={{ color:'#5a97fa' }}>View less</Text>
    )
  }
  renderCategory = ({ item }) => {
      let  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let date = new Date(item.date)
      let Month = months[date.getMonth()];
      let Day = date.getDate();
      return(
    <Animatable.View  animation="slideInDown" iterationCount={1} direction="alternate">
       {/* <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressCategory(item)}>
         <View style={styles.categoriesItemContainer}>
             <Image style={styles.categoriesPhoto} source={{ uri: this.state.url+"storage/"+item.icon }} />
             <Text style={styles.categoriesName}>{item.name}</Text>
         </View>
       </TouchableHighlight> */} 
     
      <View underlayColor='rgba(73,182,77,1,0.9)'>
        <View style={styles.card}>
            <ImageBackground style={styles.cardImage} source={{uri: this.state.url+"storage/"+item.image}}>
                <View style={{ backgroundColor:'#D19A20',width:70,height:70 }}>
                    <View style={{ backgroundColor:'#FF6347',padding:10,alignItems:'center',margin:5 }}>
                        <Text style={{ color:'white' }}>{Day}</Text>
                    </View>
                    <View style={{ alignItems:'center' }}>
                        <Text style={{ color:'white' }}>{Month}</Text>
                    </View>
                </View>
            </ImageBackground>
            <View style={styles.cardHeader}>
                <View style={styles.timeContainer}>
                    <Text style={{fontSize:18}}>{item.title}</Text>
                </View>
                <View style={{ marginTop:20 }}>
                    <ViewMoreText
                    numberOfLines={2}
                    renderViewMore={this.renderViewMore}
                    renderViewLess={this.renderViewLess}
                    // textStyle={{textAlign: 'center'}}
                    >
                    <Text>
                        {item.description}
                    </Text>
                    </ViewMoreText>
                </View>
            </View>
        </View>
      </View>
    </Animatable.View>
    )
  };

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