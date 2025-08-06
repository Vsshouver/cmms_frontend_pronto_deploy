import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { isAuthenticated } from './config/auth'
import Layout from './components/Layout'

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />
}

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      }>
        <Route index element={<Dashboard />} />
        import Equipamentos from "./pages/Equipamentos"

<Route path="equipamentos" element={<Equipamentos />} />
        import OrdensServico from "./pages/OrdensServico"

<Route path="ordens" element={<OrdensServico />} />
        import Estoque from "./pages/Estoque"

<Route path="estoque" element={<Estoque />} />
        import Backlog from "./pages/Backlog"

<Route path="backlog" element={<Backlog />} />
        import Preventiva from "./pages/Preventiva"

<Route path="preventiva" element={<Preventiva />} />
        import Pneus from "./pages/Pneus"

<Route path="pneus" element={<Pneus />} />
        import AnalisesOleo from "./pages/Oleo"

<Route path="oleo" element={<AnalisesOleo />} />
      </Route>
    </Routes>
  )
}

export default App
