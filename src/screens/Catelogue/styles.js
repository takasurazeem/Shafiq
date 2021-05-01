import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // categoriesItemContainer: {
  //   flex: 1,
  //   margin: 10,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   height: 215,
  //   borderColor: '#c2c2c2',
  //   borderWidth: 1.5,
  //   borderRadius: 20,
    
  // },
  // categoriesPhoto: {
  //   width: '100%',
  //   height: 155,
  //   borderRadius: 20,
  //   borderBottomLeftRadius: 0,
  //   borderBottomRightRadius: 0,
  //   shadowColor: 'blue',
  //   shadowOffset: {
  //     width: 0,
  //     height: 3
  //   },
  //   shadowRadius: 5,
  //   shadowOpacity: 1.0,
  //   elevation: 3
  // },
  // categoriesName: {
  //   flex: 1,
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   color: '#333333',
  //   marginTop: 8
  // },
  // categoriesInfo: {
  //   marginTop: 3,
  //   marginBottom: 5
  // }
  container:{
    flex:1,
    marginTop:20,
  },
  list: {
    paddingHorizontal: 17,
    backgroundColor:"#E6E6E6",
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card:{
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5,
    shadowOpacity: 0.5,
    marginHorizontal:15,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor:"white"
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    alignSelf:'center',justifyContent:'center'
    // flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    backgroundColor:"#EEEEEE",
  },
  cardImage:{
    flex: 1,
    height: 150,
    width: null,
    resizeMode:'stretch'
  },
  /******** card components **************/
  icon: {
    width:25,
    height:25,
  },
  iconData:{
    width:15,
    height:15,
    marginTop:5,
    marginRight:5
  },
  timeContainer:{
    flexDirection:'row'
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1
  },
  socialBarSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  title: {
    // marginLeft: 8,
    fontSize:16
  },
  socialBarButton:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default styles;
