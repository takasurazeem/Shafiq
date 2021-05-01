import React from 'react';
import { View,Image, } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import MenuButton from '../../components/MenuButton/MenuButton';

export default class DrawerContainer extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.content}>
        <View style={{alignItem:'center',width:250,justifyContent:'center',flex:.25,borderBottomColor:'#c7c8c9',borderBottomWidth:1,marginBottom:20}}>
          <Image style={{width:150,height:150,alignSelf:'center'}} source={require('../../../assets/icons/icon.png')} />
        </View>
        <View style={styles.container}>
          <MenuButton
            title="HOME"
            source={require('../../../assets/icons/home.png')}
            onPress={() => {
              navigation.navigate('Home');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="Search"
            source={require('../../../assets/icons/search.png')}
            onPress={() => {
              navigation.navigate('Search');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="Calculator"
            source={require('../../../assets/icons/calculator.png')}
            onPress={() => {
              navigation.navigate('Calculator');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="Catelogues"
            source={require('../../../assets/icons/catalogue.png')}
            onPress={() => {
              navigation.navigate('Catelogues');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="Latest News"
            source={require('../../../assets/icons/news.png')}
            onPress={() => {
              navigation.navigate('LatestNews');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="Videos"
            source={require('../../../assets/icons/youtube.png')}
            onPress={() => {
              navigation.navigate('Youtube');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="About us"
            source={require('../../../assets/icons/aboutus.png')}
            onPress={() => {
              navigation.navigate('AboutUs');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="Contact Us"
            source={require('../../../assets/icons/contact.png')}
            onPress={() => {
              navigation.navigate('ContactUs');
              navigation.closeDrawer();
            }}
          />
        </View>
      </View>
    );
  }
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  })
};
