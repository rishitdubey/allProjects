import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { Outlet } from 'react-router-dom'

const Layout = () => {

  return (
    <>
      <Header /><br/>
      <Outlet /><br/>
      <Footer />
    </>
  )
}

export default Layout;