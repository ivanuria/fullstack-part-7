import { createTheme } from '@mui/material/styles'
// fonts
import '@fontsource/nanum-gothic'
import '@fontsource/love-ya-like-a-sister'

let theme = createTheme({
  palette: {
    primary: {
      main: 'hsl(280, 50%, 50%)'
    },
    secondary: {
      main: 'hsl(50, 50%, 75%)'
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
        '::-webkit-scrollbar': {
          width: 10
        },
        '::-webkit-scrollbar-track': {
          backgroundColor: theme.palette.primary.light,
        },
        '::-webkit-scrollbar-thumb': {
          backgroundImage: `radial-gradient(circle at center, ${theme.palette.primary.dark} 50%, ${theme.palette.primary.main})`
        },
        '::-webkit-scrollbar-thumb:hover': {
          backgroundColor: theme.palette.primary.light
        },
        body: {
          backgroundColor: theme.palette.secondary.light
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