import { StyleSheet } from 'react-native';
import { MKColor } from 'react-native-material-kit';

export default StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    padding: 24,
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 7,
    marginRight: 7,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginTop: 10,
    marginBottom: 20,
  },
  legendLabel: {
    textAlign: 'center',
    color: '#666666',
    marginTop: 10,
    marginBottom: 20,
    fontSize: 12,
    fontWeight: '300',
  },
  bottom: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    paddingLeft: 10,
  },
  card: {
    marginLeft: 7,
    marginRight: 7,
    marginTop: 5,
    marginBottom: 5,
  },
});
