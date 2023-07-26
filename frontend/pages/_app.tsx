import { AuthProvider } from '../context/auth-context'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
  return (<AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>)
}

