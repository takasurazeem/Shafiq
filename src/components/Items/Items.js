import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image } from 'react-native';
import styles from './styles';
import { recipes } from '../../data/dataArrays';
import MenuImage from '../../components/MenuImage/MenuImage';
import DrawerActions from 'react-navigation';
import { getCategoryName } from '../../data/MockDataAPI';
import ImagePreview from 'react-native-image-preview';
export default class HomeScreen extends React.Component {
  

  constructor(props) {
    super(props);
    this.state={
      visible:false,
      image:'',
      url:this.props.url
    }
  }
onPressRecipe =item =>{
    this.setState({visible:true,image:item})
  };
  closeImage =() =>{
    this.setState({visible:false})
  };

  renderRecipes = ({ item }) => (
    <TouchableHighlight  underlayColor='rgba(73,182,77,1,0.9)'  onPress={() => this.onPressRecipe(this.state.url+"storage/"+item.image)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: this.state.url+"storage/"+item.image }} />
        <Text style={styles.title}>{item.code}</Text>
      </View>
    </TouchableHighlight>
  );

  render() {
    console.log('d',this.props.data)
    return (
      <View>
        <ImagePreview visible={this.state.visible} source={{uri: this.state.image}} close={this.closeImage} />
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={this.props.data}
          renderItem={this.renderRecipes}
          keyExtractor={item => `${item.recipeId}`}
        />
      </View>
    );
  }
}
