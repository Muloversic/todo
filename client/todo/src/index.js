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
            border: '1px solid white',
            padding: '5px 50px',
            backgroundColor: 'rgb(204, 232, 255)',
            marginTop: 15,
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
