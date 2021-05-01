import React from 'react';
import axios from 'axios';
import AnimatedLoader from "react-native-animated-loader";
import {NavigationContainer} from '@react-navigation/native'
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
  StyleSheet,
  AsyncStorage,
  ImageBackground
} from 'react-native';
import { Dialog } from 'react-native-simple-dialogs';
import MenuImage from '../../components/MenuImage/MenuImage';
import * as Animatable from "react-native-animatable";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
export default class MyTabs extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const tit='aaaaa';
        return{
        title: 'Calculator',
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
            style={style.headerButtonImage}
            source={require('../../../assets/icons/calculator.png')}
            />
          ),
      }};
      constructor(props) {
        super(props);
        this.state = {
            data:[],
            url:'',
            visible: true,
            wall:false,
            floor:true,
            length:'',
            heightwidth:'',
            tilesize:'',
            packing:'',
            total_area_ft:'',
            total_area_mt:'',
            no_of_boxes:'',
            dialogVisible:false
        }
      }
      sub = (base, exponent) => {
        return <View style={{flexDirection: 'row'}}>
            <View style={{alignItems: 'flex-end'}}>
                <Text style={{fontSize: 13}}>{base}</Text>
            </View>
            <View style={{alignItems: 'flex-start'}}>
                <Text style={{fontSize: 10}}>{exponent}</Text>
            </View>
        </View>
    }
floor = () => {
    this.setState({wall:false,floor:true})
}
wall = () => {
    this.setState({wall:true,floor:false})
}
componentDidMount =async () => {
    // console.log(this.props.navigation.state.routeName
    //     )
    var url = await AsyncStorage.getItem('url')
    console.log(url+'api/sizes_list')
    axios({
      method: 'get',
      url: url+'api/sizes_list',
    })
    .then(async({ data: response }) => {
      var sizes=[]
      response.sizes.map(x =>{
          sizes.push({label: x.size, value: x.id, icon: () => <Icon name="flag" size={18} color="#900" />,packing:x.packing})
      })
      await this.setState({data:sizes,url:url,Productsloading:false})
    });
  }
onChnageDropDown =async (size) => {
    console.log(size)
    await this.setState({tilesize:size.size,packing:size.packing.toString()})
}
calculte = () => {
    if(this.state.length=='' || this.state.heightwidth=='' || this.state.tilesize==''){
        return alert('Fill the Fields!')
    }
    var ft = this.state.length*this.state.heightwidth
    var mt = parseFloat(ft)/10.764;
    var boxes =  Math.ceil(parseFloat(mt)/parseFloat(this.state.packing))
    this.setState({no_of_boxes:boxes,dialogVisible:true,total_area_ft:ft.toFixed(2),total_area_mt:mt.toFixed(2),length:'',heightwidth:'',packing:'',tilesize:''})
}

render(){
  return (
    <ImageBackground style={{ flex:1}} resizeMode= 'stretch' source={require('../../../assets/1.jpg')}>
        <ScrollView>
            <View style={{ flexDirection:'row',flex:1,justifyContent:'center',paddingTop:20 }}>
                <Text style={{ fontSize:22,borderBottomColor:'#FF6347',borderBottomWidth:1 }}>{this.state.floor?'Floor':'Wall'} Tile Box Calculations</Text>
            </View>
            <View style={{ flexDirection:'row',paddingTop:30,paddingLeft:50 }}>
                <TouchableOpacity style={{ marginRight:5,padding:15,backgroundColor:this.state.floor?'#FF6347':'white',borderRadius:10 }} onPress={()=>{this.floor()}}>
                    <Text style={{ color:this.state.floor?'white':'black' }}>Floor Tile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ padding:15,backgroundColor:this.state.wall?'#FF6347':'white',borderRadius:10 }} onPress={()=>{this.wall()}}>
                    <Text style={{ color:this.state.wall?'white':'black' }}>Wall Tile</Text>
                </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal:10,paddingTop:20 }}>
                <View style={style.inputContainer}>
                        <Text style={style.label}>Length</Text>
                        <TextInput
                        style={style.input}
                        onChangeText={length =>{this.setState({length:length})}}
                        value={this.state.length}
                        placeholder="Length"
                        keyboardType="numeric"
                        maxLength={10}
                        />
                    </View>
                    <View style={style.inputContainer}>
                        <Text style={style.label}>{this.state.floor?'Width':'Height'}</Text>
                        <TextInput
                        style={style.input}
                        onChangeText={heightwidth =>{this.setState({heightwidth:heightwidth})}}
                        value={this.state.heightwidth}
                        placeholder={this.state.floor?'Width':'Height'}
                        keyboardType="numeric"
                        maxLength={10}
                        />
                    </View>
                    <View style={style.inputContainer}>
                        <Text style={style.label}>Select Size</Text>
                        <DropDownPicker
                            items={this.state.data}
                            defaultValue={this.state.country}
                            containerStyle={{height: 40}}
                            style={{backgroundColor: '#fafafa'}}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            onChangeItem={size => this.onChnageDropDown(size)}
                        />
                    </View>
                    <View style={[style.inputContainer,{zIndex:0}]}>
                        <Text style={style.label}>Packing</Text>
                        <TextInput
                        value={this.state.packing}
                        style={[style.input,{backgroundColor:this.state.packing==''?'#d9d7d7':'#f5f5f5'}]}
                        placeholder="Packing"
                        editable={false}
                        // selectTextOnFocus={false}
                        keyboardType="numeric"
                        maxLength={10}
                        />
                    </View>
                    <View style={style.inputContainer}>
                        <TouchableOpacity style={{ backgroundColor:'#FF6347',padding:15,borderRadius:10,justifyContent:'center',alignItems:'center' }} onPress={()=>this.calculte()}>
                            <Text style={{ color:'white' }}>Calculate</Text>
                        </TouchableOpacity>
                    </View>
                    <Dialog
                    // title="Confirm Dialog"
                        visible={this.state.dialogVisible}
                        onTouchOutside={() => this.setState({dialogVisible: false})}
                        animationType='slide'
                        dialogStyle={{ height:400 }}
                    >
                        <View style={{  }}>
                            <View style={{ alignItems:'center', }}>
                                <Image style={style.icon} source={require('../../../assets/icons/icon.png')} />
                            </View>
                            
                            <View style={{ flexDirection:'row',flex:1,paddingVertical:20,justifyContent:'center' }}>
                                <View style={{ alignItems:'center',flex:1 }}>
                                    <Text style={[style.title,{borderBottomColor:'#FF6347',borderBottomWidth:1}]}>Required Boxes</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection:'row',flex:1,paddingVertical:30,justifyContent:'center' }}>
                                <View style={style.contentContainer}>
                                    <Text style={style.title}>Total Area:</Text>
                                </View>
                                <View style={style.contentContainer}>
                                    <Text style={style.title}>{this.state.total_area_ft}</Text>
                                    <View style={{ flexDirection: 'row',paddingLeft:3 }}>
                                        <Text style={{ fontSize: 18 }}>ft</Text>
                                        <Text style={{ fontSize: 10,fontWeight:'bold' }}>2</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection:'row',flex:1,paddingVertical:30,justifyContent:'center' }}>
                                <View style={style.contentContainer}>
                                    <Text style={style.title}>Total Area:</Text>
                                </View>
                                <View style={style.contentContainer}>
                                    <Text style={style.title}>{this.state.total_area_mt}</Text>
                                    <View style={{ flexDirection: 'row',paddingLeft:3 }}>
                                        <Text style={{ fontSize: 18 }}>mt</Text>
                                        <Text style={{ fontSize: 10,fontWeight:'bold' }}>2</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection:'row',flex:1,paddingVertical:30,justifyContent:'center' }}>
                                <View style={style.contentContainer}>
                                    <Text style={style.title}>No of Boxes:</Text>
                                </View>
                                <View style={style.contentContainer}>
                                    <Text style={style.title}>{this.state.no_of_boxes}</Text>
                                </View>
                            </View>
                        </View>
                    </Dialog>
            </View>
        </ScrollView>
    </ImageBackground>
  );
}
}
const style=StyleSheet.create({
label:{
    fontSize:18,
    paddingBottom:5
},
inputContainer:{
    width:'70%', 
    marginHorizontal:40,
    marginVertical:10
},
input:{
    height: 40,
    borderWidth: .1,
    backgroundColor:'#f5f5f5',
    borderColor:'#dbdbdb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 1,paddingLeft:5
},
icon:{
    width:120,
    height:120,
  },
contentContainer:{
    alignItems:'center',
    flex:.5,
    flexDirection:'row'
},
title:{
    fontSize:18
},  
headerButtonImage: {
justifyContent: 'center',
width: 35,
height: 35,
margin: 6
}
});