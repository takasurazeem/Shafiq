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
  Linking,
  ImageBackground
} from 'react-native';
import styles from './styles';
import MenuImage from '../../components/MenuImage/MenuImage';
import * as Animatable from "react-native-animatable";
import { Surface } from 'react-native-paper';
export default class CatelogueScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Catelogues',
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
        source={require('../../../assets/icons/catalogue.png')}
        />
      ),
  });
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      url:'',
      visible: false
    }
  }
  componentDidMount = async () => {
    var url = await AsyncStorage.getItem('url')
    this.props.navigation.setParams({title:this.props.navigation.getParam('name')})
    console.log( url+'api/catalogues_list')

    axios({
      method: 'get',
      url: url+'api/catalogues_list',
      // responseType: 'stream'
    })
    .then(async({ data: response }) => {
      console.log(response)
      await this.setState({data:response.catalogues,url:url,visible:false})
    });
  }
  onPressCatelogue =async item => {
    // return console.log(this.state.url+'storage/'+item)
    
      let uri = this.state.url+'storage/'+item
      console.log('a',uri)
      let fileUri = FileSystem.documentDirectory ;
      await FileSystem.downloadAsync(uri, fileUri)
      .then(({ uri }) => {
         console.log(uri)
        })
        .catch(error => {
          console.error(error);
        })
  };

  renderCategory = ({ item }) => (
    // <Surface style={styles.surface}>
    //   <Animatable.View style={{alignSelf:'center'}} animation="slideInDown" iterationCount={1} direction="alternate">
    //     <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => Linking.openURL('http://staging.shafiquesons.com/storage/'+item.file)}>
    //       <View style={styles.cateloguesItemContainer}>
    //           <Image resizeMode="cover" style={styles.cateloguesPhoto} source={{ uri: this.state.url+"storage/"+item.image }} />
    //           <Text style={styles.cateloguesName}>{item.title}</Text>
    //         {/* <Text style={styles.categoriesInfo}>{getNumberOfRecipes(item.id)} recipes</Text> */}
    //       </View>
    //     </TouchableHighlight>
    //   </Animatable.View>
    // </Surface>
    <Animatable.View  animation="slideInDown" iterationCount={1} direction="alternate">
      <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => Linking.openURL(this.state.url+'storage/'+item.file)}>
        <View style={styles.card}>
            <Image style={styles.cardImage} source={{ uri: this.state.url+"storage/"+item.image }}/>
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