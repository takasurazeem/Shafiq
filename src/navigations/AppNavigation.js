import { createAppContainer } from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer'
import {createStackNavigator} from 'react-navigation-stack'
/* import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from '@react-navigation/drawer' */
import HomeScreen from '../screens/Home/HomeScreen';
import ItemsScreen from '../screens/Items/ItemsScreen';
import CategoriesScreen from '../screens/Categories/CategoriesScreen';
import CatelogueScreen from '../screens/Catelogue/CatelogueScreen';
import YoutubeScreen from '../screens/Youtube/YoutubeScreen';
import Sub_CategoriesScreen from '../screens/Categories/Sub_CategoriesScreen';
import AboutUsScreen from '../screens/AboutUs/AboutUsScreen';
import DrawerContainer from '../screens/DrawerContainer/DrawerContainer';
import SearchScreen from '../screens/Search/SearchScreen';
import ContactUsScreen from '../screens/ContactUs/ContactUsScreen';
import CalculatorScreen from '../screens/Calculator/CalculatorScreen';
import LatestNewsScreen from '../screens/LatestNews/LatestNewsScreen';

/* const Stack = createStackNavigator();

function MainNavigator() {
  return(
    <Stack.Navigator
      screenOptions={{
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
            alignSelf: 'center',
            flex: 1,
          }
      }}
    >
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Categories' component={CategoriesScreen}/>
      <Stack.Screen name='Recipe' component={RecipeScreen}/>
      <Stack.Screen name='RecipesList' component={RecipesListScreen} />
      <Stack.Screen name='Ingredient' component={IngredientScreen} />
      <Stack.Screen name='Search' component={SearchScreen} />
      <Stack.Screen name='IngredientsDetails' component={IngredientsDetailsScreen} />
    </Stack.Navigator>
  )
} */

const MainNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Categories: CategoriesScreen,
    Catelogues: CatelogueScreen,
    Items: ItemsScreen,
    Sub_Categories: Sub_CategoriesScreen,
    LatestNews: LatestNewsScreen,
    Youtube: YoutubeScreen,
    AboutUs: AboutUsScreen,
    Search: SearchScreen,
    ContactUs: ContactUsScreen,
    Calculator: CalculatorScreen,
  },
  {
    initialRouteName: 'Home',
    // headerMode: 'float',
    defaulfNavigationOptions: ({ navigation }) => ({

    })
  }
); 

/* const Drawer = createDrawerNavigator();

function DrawerStack() {
  return(
    <Drawer.Navigator
      drawerPosition='left'
      initialRouteName='Main'
      drawerStyle={{
        width: 250
      }}
      drawerContent={props=> DrawerContainer}
    >
      <Drawer.Screen name='Main' component={MainNavigator} />
    </Drawer.Navigator>
  )
} */

const DrawerStack = createDrawerNavigator(
  {
    Main: MainNavigator
  },
  {
    drawerPosition: 'left',
    initialRouteName: 'Main',
    drawerWidth: 250,
    contentComponent: DrawerContainer
  }
);

/* export default function AppContainer() {
  return(
    <NavigationContainer>
      <DrawerStack/>
    </NavigationContainer>
  )
} */
 
export default AppContainer = createAppContainer(DrawerStack);

console.disableYellowBox = true;