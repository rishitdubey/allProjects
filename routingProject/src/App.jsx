import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import About from './Components/About.jsx'
import Layout from './Components/Layout.jsx'
import Home from './Components/Home.jsx'
import GitHub from './Components/GitHub.jsx'
import Contact from './Components/Contact.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/home" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/github/:userid?" element={<GitHub />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App