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
    marginBottom: 24,
    color: '#a21b8d',
    marginTop: 150,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#a21b8d',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  passwordContainer: {
    width: '80%',
    position: 'relative',
    marginBottom: 12,
  },
  passwordInput: {
    width: '100%',
    height: 40,
    borderColor: '#a21b8d',
    borderWidth: 1,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingRight: 40, 
  },
  eyeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: '#359021',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
    
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: 'blue',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default styles;
