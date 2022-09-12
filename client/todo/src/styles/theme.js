import { createTheme } from '@mui/material/styles'

const colorTheme = createTheme({
  palette: {
    todoInput: {
      main: 'rgb(74, 226, 214)',
    },
    button: {
      active: 'rgb(204, 232, 255)',
      main: 'white',
      hover: 'rgb(0, 78, 141)',
    },
    modal: {
      main: 'rgb(129, 134, 218)',
    },
  },
})

const theme = createTheme(colorTheme, {
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'submit' },
          style: {
            padding: '5px 50px',
            backgroundColor: colorTheme.palette.common.white,
            marginTop: 15,
            textTransform: 'capitalize',
            borderRadius: 5,
            '&:hover': {
              backgroundColor: colorTheme.palette.button.hover,
              color: colorTheme.palette.common.white,
            },
          },
        },
        {
          props: { variant: 'delete' },
          style: {
            padding: '5px 50px',
            backgroundColor: colorTheme.palette.error.main,
            color: colorTheme.palette.common.white,
            marginTop: 15,
            textTransform: 'capitalize',
            borderRadius: 5,
            '&:hover': {
              backgroundColor: colorTheme.palette.error.light,
            },
          },
        },
      ],
    },
  },
})

export default theme
