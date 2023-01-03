import '../styles/globals.css'
import '../styles/home.css'
import Script from 'next/script'
import { store } from '../app/store'
import { Provider } from 'react-redux'
import { AnimatePresence } from 'framer-motion';

export default function App({ Component, pageProps }) {
  return(
    <>
    <Provider store={store}>
      {/* <AnimatePresence exitBeforeEnter> */}
    <Component {...pageProps} />
      {/* </AnimatePresence> */}
    </Provider>
    <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" />

    </>
    )
}
