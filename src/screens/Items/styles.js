import { StyleSheet } from 'react-native';
import { RecipeCard } from '../../AppStyles';

const styles = StyleSheet.create({
  // container: RecipeCard.container,
  Sizescontainer: RecipeCard.Sizescontainer,
  // photo: RecipeCard.photo,
  // title: RecipeCard.title,
  // category: RecipeCard.category
  list: {
    paddingHorizontal: 10,
  },
  listContainer:{
    alignItems:'center'
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card:{
    marginVertical: 8,
    backgroundColor:"white",
    flexBasis: '45%',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5,
  },
  cardContent: {
    // paddingVertical: 17,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical:10
  },
  cardImage:{
    flex: 1,
    height: 150,
    // width: 150,
  },
  imageContainer:{
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,  
    // elevation: 5,
    flex:1
  },
  /******** card components **************/
  title:{
    fontSize:18,
    flex:1,
    color:"#778899"
  },
  count:{
    fontSize:18,
    flex:1,
    color:"#B0C4DE"
  },
});

export default styles;
