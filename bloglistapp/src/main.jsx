import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './store'

import { ThemeProvider, createTheme } from '@mui/material/styles'

let theme = createTheme({
  palette: {
    primary: {
      main: 'hsl(280, 100%, 50%)'
    },
    secondary: {
      main: 'hsl(50, 100%, 75%)'
    }
  }
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


ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ThemeProvider>
)
