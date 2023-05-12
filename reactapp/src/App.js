import './App.css'
import 'sanitize.css'
import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Help from './pages/help/help'
import Newcalcul from './pages/home/newcalcul'
import Logout from './pages/logout/logout'
import Search from './pages/search/search'
import Admin from './pages/admin/admin'
import View from './pages/search/view'

function App(props) {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' exact element={<Newcalcul />} />
          <Route path='/search' element={<Search />} />
          <Route path='/help' element={<Help />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/search/view/:id' element={<View />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
