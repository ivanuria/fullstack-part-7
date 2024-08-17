import ReactDOM from 'react-dom/client'
import App from './App'
import Providers from './contexts/Providers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationsContextProvider } from './contexts/NotificationsContext'
import { LoginContextProvider } from './contexts/LoginContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <Providers
    providers={[
      LoginContextProvider,
      NotificationsContextProvider,
      [QueryClientProvider, { client: queryClient }],
    ]}
  >
    <App />
  </Providers>,
)
