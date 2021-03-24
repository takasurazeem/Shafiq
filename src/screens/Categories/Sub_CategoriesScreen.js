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
import styles from './styles';
import { categories } from '../../data/dataArrays';
import { getNumberOfRecipes } from '../../data/MockDataAPI';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MenuImage from '../../components/MenuImage/MenuImage';
import * as Animatable from "react-native-animatable";
export default class SubCategoriesScreen extends React.Component {
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
    this.state = {
      data:[],
      url:'',
      visible: true
    }
  }
  componentDidMount = async () => {
    var url = await AsyncStorage.getItem('url')
    this.props.navigation.setParams({title:this.props.navigation.getParam('name')})
    axios({
      method: 'post',
      url: url+'api/sub_sub_cat',
      // responseType: 'stream'
      data: {
        sub_cat_id:this.props.navigation.getParam('id')
      }
    })
    .then(async({ data: response }) => {
      await this.setState({data:response.sub_sub_cats,url:url,visible:false})
      
    });
    
  }
  onPressCategory = item => {
    this.props.navigation.navigate("Items",{id:item.id,name:item.name})
    
  };

  renderCategory = ({ item }) => (
    <Animatable.View style={styles.card} animation="slideInDown" iterationCount={1} direction="alternate">
      <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressCategory(item)}>
        <View style={styles.categoriesItemContainer}>
          <Image style={styles.categoriesPhoto} source={{ uri: this.state.url+"storage/"+item.icon }} />
          <Text style={styles.categoriesName}>{item.name}</Text>
          {/* <Text style={styles.categoriesInfo}>{getNumberOfRecipes(item.id)} recipes</Text> */}
        </View>
      </TouchableHighlight>
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