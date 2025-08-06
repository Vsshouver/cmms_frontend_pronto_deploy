import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <aside style={{ width: '220px', background: '#1f2937', color: '#fff', padding: '1rem' }}>
        <h3>CMMS</h3>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link to="/" style={{ color: '#fff' }}>Dashboard</Link></li>
            <li><Link to="/equipamentos" style={{ color: '#fff' }}>Equipamentos</Link></li>
            <li><Link to="/ordens" style={{ color: '#fff' }}>Ordens de Serviço</Link></li>
            <li><Link to="/estoque" style={{ color: '#fff' }}>Estoque</Link></li>
            <li><Link to="/backlog" style={{ color: '#fff' }}>Backlog</Link></li>
            <li><Link to="/preventiva" style={{ color: '#fff' }}>Planos Preventiva</Link></li>
            <li><Link to="/pneus" style={{ color: '#fff' }}>Pneus</Link></li>
            <li><Link to="/oleo" style={{ color: '#fff' }}>Análises de Óleo</Link></li>
          </ul>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '2rem', background: '#f9fafb' }}>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
