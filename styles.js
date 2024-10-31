import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    padding: width * 0.05,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.05,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: width * 0.06,
    color: '#FF6F61',
    fontWeight: 'bold',
  },
  settingsIcon: {
    fontSize: width * 0.06,
    color: '#4A90E2',
  },
  selectSetScreenContainer: {
    flex: 1, // Allow the container to grow and take available space
  },
  selectSetScreenTitle: {
    fontSize: width * 0.05,
    color: '#FF6F61',
    marginBottom: height * 0.02,
    textAlign: 'center',
  },
  selectSetScreenButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    padding: width * 0.05,
    margin: width * 0.01, // Add margin for spacing in grid
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectSetScreenImage: {
    width: '100%',
    height: height * 0.2,
    marginBottom: height * 0.02,
  },
  selectSetScreenButtonText: {
    fontSize: width * 0.045,
    color: '#333333',
    textAlign: 'center',
  },
  homeScreenBackground: {
    flex: 1,
    resizeMode: 'cover',
  },
  flatListContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
