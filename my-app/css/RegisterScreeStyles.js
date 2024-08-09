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
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#a21b8d',
    marginTop: 150,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#a21b8d',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    color: '#333',
  },
  vehicleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  vehicleInput: {
    width: '22%',
    height: 40,
    borderColor: '#a21b8d',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
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
});

export default styles;
