import { StyleSheet, Dimensions } from 'react-native';

// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;
const SizeNumColums = 3;
// item size
const RECIPE_ITEM_HEIGHT = 170;
const SIZE_ITEM_HEIGHT = 50;
const RECIPE_ITEM_MARGIN = 20;

// 2 photos per width
export const RecipeCard = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: RECIPE_ITEM_MARGIN,
    marginTop: 20,
    width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
    height: RECIPE_ITEM_HEIGHT + 30,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 15
  },
  Sizescontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign:'center',
    marginLeft: RECIPE_ITEM_MARGIN,
    marginTop: 20,
    paddingTop: 10,
    width: (SCREEN_WIDTH - (SizeNumColums + 1) * RECIPE_ITEM_MARGIN) / SizeNumColums,
    height: SIZE_ITEM_HEIGHT,
    borderColor: '#FF6347',
    backgroundColor: '#FF6347',
    borderWidth: 0.5,
    borderRadius: 30
  },
  photo: {
    width: (SCREEN_WIDTH - (.5 ) * RECIPE_ITEM_MARGIN) / recipeNumColums,
    height: RECIPE_ITEM_HEIGHT,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#444444',
    marginTop: 3,
    marginRight: 5,
    marginLeft: 5,
  },
  // category: {
  //   marginTop: 5,
  //   marginBottom: 5
  // }
});
