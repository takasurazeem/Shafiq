import React from 'react';
import { PROVIDER_GOOGLE } from 'expo';
import { TextInput, ScrollView,AsyncStorage,Dimensions,ImageBackground  ,Text, View, TouchableOpacity,Linking, Image ,StyleSheet} from 'react-native';
import MenuImage from '../../components/MenuImage/MenuImage';
import AnimatedLoader from "react-native-animated-loader";
import * as Animatable from "react-native-animatable";
import axios from 'axios';
import Textarea from 'react-native-textarea';
import MapView from 'react-native-maps';
import { ConfirmDialog } from 'react-native-simple-dialogs';
const { width, height } = Dimensions.get('window');
export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Contact Us',
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
      style={style.headerButtonImage}
      source={require('../../../assets/icons/contact.png')}
      />
    ),
  });

  constructor(props) {
    super(props);
    this.state={
      data:[],
      message:'',
      name:'',
      dialogVisible:false,
      email:'',
      phone:'',
      visible: false,
      modalData:''
    }
  }
onPressRecipe =item =>{
    // this.setState({visible:true,image:item})
  };
  component = async() => {
    var url = await AsyncStorage.getItem('url')
    if(this.state.name =="" || this.state.phone =="" || this.state.email =="" || this.state.email ==""){
        return alert('Fill the Fields Please!')
     }
    await this.setState({visible:true})
    axios({
        method: 'post',
        url: url+'api/contactus',
        data: {
          name:this.state.name,
          email:this.state.email,
          phone:this.state.phone,
          message:this.state.message,
        }
      })
      .then(async({ data: response }) => {
        await this.setState({visible:false,dialogVisible:true,modalData:response.success,name:'',email:'',phone:'',message:''})
        
      });
  }
  onMarkerPress = (lat,long) => {
    var url = 'geo:'+lat+','+long
    Linking.openURL(url);
  }
  onChange = (text) => {
    this.setState({message:text})
  }
  render() {
    const {visible} = this.state
    return (
      <ImageBackground style={{ flex:1}} resizeMode= 'stretch' source={require('../../../assets/1.jpg')}>
          <ScrollView>
              <View style={{  flexDirection:'row',justifyContent:'center',marginTop:15 }}>
                  <Text style={{ fontSize:24,paddingBottom:5,borderBottomWidth:1,borderBottomColor:'#FF6347' }}>Get In Touch</Text>
              </View>
              <View style={{width:'70%', marginHorizontal:50,marginVertical:10 }}>
                  <Text>Your Name</Text>
                  <TextInput
                  style={{ height: 40,borderWidth: .1,backgroundColor:'#f5f5f5',borderColor:'#dbdbdb',shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.8,
                  shadowRadius: 2,  
                  elevation: 1,paddingLeft:5 }}
                  onChangeText={name =>{this.setState({name:name})}}
                  value={this.state.name}
                  placeholder="Your Name"
                  // keyboardType="numeric"
                  />
              </View>
              <View style={{width:'70%', marginHorizontal:50,marginVertical:10 }}>
                  <Text>Your Phone</Text>
                  <TextInput
                  style={{ height: 40,borderWidth: .1,backgroundColor:'#f5f5f5',borderColor:'#dbdbdb',shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.8,
                  shadowRadius: 2,  
                  elevation: 1,paddingLeft:5 }}
                  onChangeText={phone =>{this.setState({phone:phone})}}
                  value={this.state.phone}
                  placeholder="Your Phone"
                  keyboardType="numeric"
                  />
              </View>
              <View style={{width:'70%', marginHorizontal:50,marginVertical:10 }}>
                  <Text>Your Email</Text>
                  <TextInput
                  style={{ height: 40,borderWidth: .1,backgroundColor:'#f5f5f5',borderColor:'#dbdbdb',shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.8,
                  shadowRadius: 2,  
                  elevation: 1,paddingLeft:5 }}
                  onChangeText={email =>{this.setState({email:email})}}
                  value={this.state.email}
                  placeholder="Your Email"
                  // keyboardType="numeric"
                  />
              </View>
              <View style={{width:'70%', marginHorizontal:50,marginVertical:10 }}>
                  <Textarea
                      containerStyle={style.textareaContainer}
                      style={style.textarea}
                      onChangeText={this.onChange}
                      defaultValue={this.state.message}
                      maxLength={120}
                      placeholder={'Your Message。。。'}
                      placeholderTextColor={'#c7c7c7'}
                      underlineColorAndroid={'transparent'}
                  />
              </View>
              <View style={{width:'30%', marginHorizontal:50,marginVertical:10 }}>
                  <TouchableOpacity style={{ backgroundColor:'#FF6347',padding:15,borderRadius:10,justifyContent:'center',alignItems:'center' }} onPress={this.component}>
                      <Text style={{ color:'white' }}>Send</Text>
                  </TouchableOpacity>
              </View>
              <View style={{  flexDirection:'row',justifyContent:'center',marginTop:25 }}>
                  <Text style={{ fontSize:24,paddingBottom:5,borderBottomWidth:1,borderBottomColor:'#FF6347' }}>Get Directions</Text>
              </View>
              <View style={{width:'93%', marginHorizontal:10,marginVertical:50 }}>
                  <MapView
                      initialRegion={{
                        latitude: 32.13125713506263,
                        longitude: 74.19491381086122,
                      latitudeDelta: 0.00225,
                      longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0022
                      }}
                      provider={PROVIDER_GOOGLE}
                      loadingEnabled={true}
                      style={style.map}
                  >
                    <MapView.Marker
                    coordinate={{ 
                      latitude: 32.13125713506263,
                      longitude: 74.19491381086122,
                      }}
                      title={"Shafiq&Sons"}
                      description={'Gujranwala'}
                      onPress={(e) => {e.stopPropagation(); this.onMarkerPress(32.13125713506263,74.19491381086122)}}
                    />
                  </MapView>
              </View>
              <AnimatedLoader
              visible={visible}
              overlayColor="rgba(255,255,255,0.75)"
              // source={require("./loader.json")}
              animationStyle={style.lottie}
              speed={2}
              >
              <Text style={{fontSize:18}}>Loading...</Text>
              </AnimatedLoader>
              <ConfirmDialog
                  // title="Confirm Dialog"
                  visible={this.state.dialogVisible}
                  onTouchOutside={() => this.setState({dialogVisible: false})}
              >
                  <View style={{ alignItems:'center' }}>
                    <Image style={style.icon} source={{uri: "https://img.icons8.com/color/70/000000/facebook-like.png"}} />
                    <Text style={style.title}>{this.state.modalData}</Text>
                  </View>
              </ConfirmDialog>
          </ScrollView>
        </ImageBackground>
    );
  }
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
      },
      textareaContainer: {
        height: 180,
        padding: 5,
        backgroundColor: '#f5f5f5',
      },
      textarea: {
        textAlignVertical: 'top',  // hack android
        height: 170,
        fontSize: 14,
        color: '#333',
      },
        lottie: {
        width: 100,
        height: 100
      },
      modelcontainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      map: {
        width: "100%",
        height: 500,
      },
      container: {
        flex: 1,
        backgroundColor: '#EEEEEE',
        alignItems: 'center',
        paddingTop:50,
      },
      icon:{
        width:60,
        height:60,
      },
      title:{
        fontSize:19,
        textAlign: 'center',
        marginTop:22,
        color: "#5F6D7A"
      },
      description: {
        marginTop:20,
        textAlign: 'center',
        color: "#A9A9A9",
        fontSize:16,
        margin:40,
      },
      buttonContainer: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
      },
      loginButton: {
        backgroundColor: "#3498db",
      },
      buttonText: {
        color: "#FFFFFF",
        fontSize:20,
      },
      headerButtonImage: {
        justifyContent: 'center',
        width: 35,
        height: 35,
        margin: 6
      }   
});
