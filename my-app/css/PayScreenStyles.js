import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
  },
  logo: {
    width: 400,
    height: 215,
    marginBottom: 20,
    marginTop: -120,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#a21b8d',
    marginTop: 150,
  },
  detailContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    borderColor: '#a21b8d',
    borderWidth: 1,
    marginBottom: 20,
  },
  detailText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: '#359021',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusText: {
    fontSize: 18,
    color: 'red',
    marginTop: 20,
  },
});

export default styles;
