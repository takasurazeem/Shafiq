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
  StyleSheet
} from 'react-native';
import * as FileSystem from 'expo-file-system';
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
        <Text></Text>
      )
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
    <Surface style={styles.surface}>
      <Animatable.View style={{alignSelf:'center'}} animation="slideInDown" iterationCount={1} direction="alternate">
        <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressCatelogue(item.file)}>
          <View style={styles.cateloguesItemContainer}>
              <Image resizeMode="cover" style={styles.cateloguesPhoto} source={{ uri: this.state.url+"storage/"+item.image }} />
              <Text style={styles.cateloguesName}>{item.title}</Text>
            {/* <Text style={styles.categoriesInfo}>{getNumberOfRecipes(item.id)} recipes</Text> */}
          </View>
        </TouchableHighlight>
      </Animatable.View>
    </Surface>
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
  },
  surface: {
    padding: 8,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
});