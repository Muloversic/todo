import { StyleSheet } from 'react-native'

export const authStyles = StyleSheet.create({
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

export const TodoContainerStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgb(204, 255, 252)',
    height: '100%',
  },
  user: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgb(129, 134, 218)',
    padding: 10,
  },
  userFonts: {
    fontSize: 20,
    color: 'white',
  },
})

export const todoFormStyles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginTop: 15,
  },
  form: {
    alignItems: 'center',
  },
  inputError: 'red',
  inputCommonColor: 'black',
  title: {
    color: 'black',
    fontSize: 30,
    textTransform: 'capitalize',
    marginBottom: 15,
  },
  button: {
    fontSize: 20,
    marginTop: 10,
    backgroundColor: 'rgb(129, 134, 218)',
    color: 'white',
    borderRadius: 10,
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
  },
})

export const todoFilterStyles = StyleSheet.create({
  wrapper: {
    marginTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  filtersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  counter: {
    fontSize: 16,
  },
  removeButton: {
    fontSize: 20,
    color: 'red',
  },
})

export const todoItemStyles = StyleSheet.create({
  todosContainer: {
    padding: 10,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    padding: 7,
    backgroundColor: 'rgb(129, 134, 218)',
    height: 45,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
    paddingRight: 20,
  },
  itemText: {
    fontSize: 18,
    color: '#fff',
    width: '60%',
  },
  actionElem: {
    fontSize: 20,
    color: 'white',
  },
})
