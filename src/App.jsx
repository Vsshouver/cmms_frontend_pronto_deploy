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
        <Route path="ordens" element={<div>Ordens de Serviço</div>} />
        <Route path="estoque" element={<div>Estoque</div>} />
        <Route path="backlog" element={<div>Backlog</div>} />
        <Route path="preventiva" element={<div>Planos Preventiva</div>} />
        <Route path="pneus" element={<div>Pneus</div>} />
        <Route path="oleo" element={<div>Análises de Óleo</div>} />
      </Route>
    </Routes>
  )
}

export default App
