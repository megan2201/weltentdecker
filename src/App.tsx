import './App.css'
import Home from "@/components/pages/home"
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Destinations from './components/pages/destinations'
import Layout from './components/layout/layout'
import DestinationDetail from './components/pages/destinations/destinations-detail'
import { useEffect } from 'react'
import Stays from './components/pages/stays'
import StaysDetail from './components/pages/stays/stays-detail'
import Booking from './components/pages/stays/stays-booking'

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {

  return (
    <BrowserRouter basename='/weltentdecker'>
      <ScrollToTop />
      <Routes>
        {/* Home */}
        <Route
          element={<Layout transparentNavbar />}
        >
          <Route
            path="/"
            element={<Home />}
          />
        </Route>

        {/* Standard pages */}
        <Route element={<Layout />}>
          <Route
            path="/destinations"
            element={<Destinations />}
          />

          <Route
            path="/destinations/:slug"
            element={<DestinationDetail />}
          />

          <Route
            path="/stays"
            element={<Stays />}
          />

          <Route
            path="/stays/:id"
            element={<StaysDetail />}
          />

          <Route
            path="/booking/:stayid"
            element={<Booking />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
