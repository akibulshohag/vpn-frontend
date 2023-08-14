import Layout from '../components/Layout/Layout'
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css'
import 'antd/dist/antd.css';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { StatusProvider } from '../context/ContextStatus';

function MyApp({ Component, pageProps }) {
  return (
    <StatusProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StatusProvider>
  )
}

export default MyApp
