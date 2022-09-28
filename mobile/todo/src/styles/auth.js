import { StyleSheet } from 'react-native'

const authStyles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    backgroundColor: 'rgb(204, 232, 255)',
    height: '100%',
  },
  title: { fontSize: 25, color: 'black', fontWeight: '600', marginBottom: 20 },
  inputError: 'red',
  inputCommonColor: 'black',
  submitButton: {
    marginTop: 15,
    marginBottom: 35,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  submitButtonText: { fontSize: 20 },
})

export default authStyles
