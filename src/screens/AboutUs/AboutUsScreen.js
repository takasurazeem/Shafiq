import React from 'react';
import axios from 'axios';
import AnimatedLoader from "react-native-animated-loader";
import {
  Text,
  View,
  ScrollView,
  StyleSheet
} from 'react-native';
import MenuImage from '../../components/MenuImage/MenuImage';
export default class CategoriesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "About Us",
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
  render() {
    const {visible} = this.state
    return (
      <ScrollView style={{ paddingHorizontal:15,paddingVertical:20,backgroundColor:'white' }}>
          <View style={{ marginBottom:30 }}>
              <Text>
                  With A Heritage Of Rich Business Traditions Such As Honesty And Integrity Inherited From The Visionary <Text style={{ fontWeight:'bold',fontSize:16 }}>Haji Muhammad Shafiq</Text> Late, The Next Generation Laid The Foundations Of <Text style={{ fontWeight:'bold',fontSize:16 }}>SHAFIQUE SONS</Text> In 2009. With A Futuristic Approach Towards Provision Of Ultimate Quality Products Coupled With The Old Fashioned Ways Of Fair Business Practices Turned Out To The Basis Of Immense Success Of This Newly Established Entity.
              </Text>
          </View>
          <View style={{ marginBottom:30 }}>
              <Text>
                  Under the able leadership of<Text style={{ fontWeight:'bold',fontSize:16 }}> Mr. Mazhar Shafiq</Text> and Mr. Imran Shafiq, & <Text style={{ fontWeight:'bold',fontSize:16 }}>Mr. Abdul Rahman Pasha</Text>, <Text style={{ fontWeight:'bold',fontSize:16 }}>SHAFIQUE SONS</Text> Has Made Phenomenal Progress in twelve Years’ Short Span Of Its Existence.
              </Text>
          </View>
          <View style={{ marginBottom:30 }}>
              <Text>
                  Commitment To Adhere To The Ultimate Product Quality Has Lead Them To Restrict To Exclusive Dealership Of Master; The Market Leader In High End Tiles, Sanitary Fittings And Plastic Bathroom Accessories. The Exclusive Outlet In Gujranwala Is Also Famous For Housing The Entire Range Of Master Without Fail. <Text style={{ fontWeight:'bold',fontSize:16 }}>SHAFIQUE SONS</Text> Have Five Exclusive Size <Text style={{ fontWeight:'bold',fontSize:16 }}>8"x20"</Text> Wall Tile, <Text style={{ fontWeight:'bold',fontSize:16 }}>10"x32"</Text> mono Porosa Wall Tile and Indoor Floor Tile <Text style={{ fontWeight:'bold',fontSize:16 }}>12"x26"</Text> Mono Porosa Wall Tile <Text style={{ fontWeight:'bold',fontSize:16 }}>30"x30"</Text> Porcelain Floor And <Text style={{ fontWeight:'bold',fontSize:16 }}>21"x21"</Text> Porcelain Floor Tiles.
              </Text>
          </View>
          <View style={{ marginBottom:30 }}>
              <Text>
                  Other Than Master Products, The Group Is Into Import Of High End Bathroom Products Including Sanitary Ware And Accessories Through a Sister Concern By The Name Of <Text style={{ fontWeight:'bold',fontSize:16 }}>PASHA INTERNATIONAL</Text> Sanitary Ware and Authorized Dealer Of <Text style={{ fontWeight:'bold',fontSize:16 }}>PORTA Sanitary Ware, KSW Sanitary Ware, Rashid Kitchen Sink,Bester Kitchen appliances, Generaltec Kitchen Appliances, BathTec, DMC adhesive Bound, Marachi adhesive Bound, Metro adhesive Bound, Royal Water Proof Grout</Text>
              </Text>
          </View>
          <View style={{ marginBottom:30 }}>
              <Text>
                  It’s The Quality of Products and Level of Service Provided By <Text style={{ fontWeight:'bold',fontSize:16 }}>SHAFIQUE SONS</Text> That Has Resulted in a Large and Permanent Customer Base with a Relationship of Immense Trust and Reliability.
              </Text>
          </View>
          <View style={{ marginBottom:30 }}>
              <Text>
                  While proudly launching the Exclusive <Text style={{ fontWeight:'bold',fontSize:16 }}>SHAFIQUE SONS</Text> Series in Collaboration with Master, <Text style={{ fontWeight:'bold',fontSize:16 }}>SHAFIQUE SONS</Text> Is Soon Spreading Its Footprint to Others Cities As Well Starting from Lahore To Begin With.
              </Text>
          </View>
      </ScrollView>
    );
  }
}
const styless = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100
  }
});