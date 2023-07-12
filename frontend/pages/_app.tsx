import { WebflixProvider } from '../context/webflix-context'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
  return (<WebflixProvider>
            <Component {...pageProps} />
          </WebflixProvider>)
}

