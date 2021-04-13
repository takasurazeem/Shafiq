import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cateloguesItemContainer: {
    // flex: 1,
    margin: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 215,
    borderColor: '#c2c2c2',
    borderWidth: 1.5,
    borderRadius: 20,
    // paddingTop:10
    
  },
  cateloguesPhoto: {
    width: '100%',
    height: 155,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 3
  },
  cateloguesName: {
    flex: 1,
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
    marginTop: 8
  },
  cateloguesInfo: {
    marginTop: 3,
    marginBottom: 5
  }
});

export default styles;
