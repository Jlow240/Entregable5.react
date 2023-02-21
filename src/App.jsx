import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProtectedHome from './components/ProtectedHome'
import ProteectedRoutes from './components/ProteectedRoutes'
import Config from './pages/Config'
import Home from './pages/Home'
import Pokedex from './pages/Pokedex'
import Pokemon from './pages/Pokemon'

function App() {
  const [theme, setTheme] = useState("light")

  const changeTheme = () => setTheme(theme === "dark" ? "light" : "dark")

  return (
    <div className="App" id={theme}>
      <Routes>

        <Route path='/config' element={<Config changeTheme={changeTheme} />} />

        <Route element={<ProtectedHome />}>
          <Route path='/' element={<Home />} />
        </Route>

        <Route element={<ProteectedRoutes />}>
          <Route path='/pokedex' element={<Pokedex />} />
          <Route path='/pokedex/:id' element={<Pokemon />} />
        </Route>

      </Routes>
    </div>
  )
}

export default App
