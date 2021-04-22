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
import PDFReader from 'rn-pdf-reader-js'
import styles from './styles';
import MenuImage from '../../components/MenuImage/MenuImage';
import * as Animatable from "react-native-animatable";
export default class CatelogueScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'PDF Viewver',
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
  }
  render() {
      console.log(this.props.navigation.getParam('pdf'))
    return (
        <PDFReader
        source={{
          uri: this.props.navigation.getParam('pdf')
        }}
        webviewProps={{
            startInLoadingState: false,
          }}
        readerContainer={{height:10}}
      />
    // <WebView source={{ uri: "https://reactnativemaster.com/wp-content/uploads/2020/02/React-native-document-viewer-pdf-sample.pdf" }} />
    );
  }
}
const styless = StyleSheet.create({
  
});