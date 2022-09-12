import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import store from './store/store'
import App from './App'
import './index.css'

const container = document.getElementById('root')
const root = createRoot(container)

const theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'submit' },
          style: {
            padding: '5px 50px',
            backgroundColor: 'white',
            marginTop: 15,
            textTransform: 'capitalize',
            '&:hover': {
              backgroundColor: 'rgb(0, 78, 141)',
              color: 'white',
            },
          },
        },
      ],
    },
  },
  palette: {
    todoInput: {
      main: 'rgb(74, 226, 214)',
    },
    button: {
      active: 'rgb(204, 232, 255)',
      main: 'white',
    },
  },
})

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
