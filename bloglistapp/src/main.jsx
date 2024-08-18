import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './store'

import { ThemeProvider, createTheme } from '@mui/material/styles'
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ThemeProvider>
)
