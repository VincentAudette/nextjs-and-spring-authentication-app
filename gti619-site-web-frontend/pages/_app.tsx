import { NotificationProvider } from 'context/notification-context';
import { AuthProvider } from '../context/auth-context'
import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query';


const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }) {
  return (<AuthProvider>
    <NotificationProvider>
        <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            </QueryClientProvider>
            </NotificationProvider>
          </AuthProvider>)
}

