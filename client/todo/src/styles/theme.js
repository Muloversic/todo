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
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            top: '-10px',
          },
          '& label.Mui-focused:not(.Mui-error)': {
            color: colorTheme.palette.todoInput.main,
          },
          '& label.MuiFormLabel-filled:not(.Mui-focused)': {
            top: 0,
          },
          '& label.Mui-focused:not(.MuiFormLabel-filled)': {
            top: 0,
          },
          '& label.MuiFormLabel-filled.Mui-focused': {
            top: 0,
          },
          '& .MuiOutlinedInput-root:not(.Mui-error)': {
            '&.Mui-focused fieldset': {
              borderColor: colorTheme.palette.todoInput.main,
            },
            'fieldset, &:hover fieldset': {
              borderColor: colorTheme.palette.common.white,
            },
          },
          '& .MuiOutlinedInput-root': {
            width: '35em',
            color: colorTheme.palette.common.white,
            input: {
              padding: '4px 8px 5px 8px',
            },
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.Mui-error': {
            borderColor: colorTheme.palette.error.main,
          },
        },
      },
    },
  },
})

export default theme
