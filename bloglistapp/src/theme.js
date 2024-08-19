import { createTheme } from '@mui/material/styles'
// fonts
import '@fontsource/nanum-gothic'
import '@fontsource/love-ya-like-a-sister'

let theme = createTheme({
  palette: {
    primary: {
      main: 'hsl(280, 100%, 50%)'
    },
    secondary: {
      main: 'hsl(50, 100%, 75%)'
    }
  },
  typography: {
    fontFamily: 'Nanum Gothic, sans serif',
    h1: {
      fontFamily: 'Love Ya Like A Sister'
    }
  },
})

theme = createTheme(theme, {
  palette: {
    tertiary: theme.palette.augmentColor({
      color: {
        main: 'hsl(110, 100%, 75%)'
      },
      name: 'tertiary'
    })
  }
})

theme = createTheme(theme, {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: theme.palette.secondary.light,
          boxSizing: 'border-box'
        },
        'main a': {
          color: theme.palette.primary.light,
          fontWeight: 'normal',
          textDecoration: 'none',
          backgroundImage: 'linear-gradient(to top, currentcolor 1px, transparent 1px)',
          padding: 4,
          margin: -4
        },
        'main a:visited': {
          color: theme.palette.primary.dark
        },
        table: {
          width: '100%'
        }
      }
    }
  }
})

export default theme