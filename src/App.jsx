import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import NavigationBar from './components/NavigationBar'
import get from './api/get'
import LandingPage from './pages/LandingPage'
import Layout from './components/Layout'
import Footer from './components/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import List from './pages/List'
import SearchPage from './pages/SearchPage'
import TopRatedList from './pages/TopRatedList'

function App() {
  const contentWrap = (component) => (
    <div className='d-flex flex-column gap-3 bg-dark'>
      <NavigationBar />
      <Layout Component={component} />
      <Footer />
    </div>
  )

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={contentWrap(LandingPage)}
        />
        <Route
          path='/:type/:genreId/:genreName'
          element={contentWrap(List)}
        />
        <Route
          path='/search/:title'
          element={contentWrap(SearchPage)}
        />
        <Route
          path='/top_rated/:type'
          element={contentWrap(TopRatedList)}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
