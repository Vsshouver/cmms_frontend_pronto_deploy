import React, { useEffect, useState } from 'react'
import axios from 'axios'
import API_BASE_URL from '../config/api'

const Dashboard = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchIndicators = async () => {
      const token = localStorage.getItem("token")
      const response = await axios.get(`${API_BASE_URL}/dashboard/indicadores`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setData(response.data)
    }
    fetchIndicators()
  }, [])

  if (!data) return <div>Carregando indicadores...</div>

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
      <ul>
        <li>Total de OS: {data.total_ordens_servico}</li>
        <li>Finalizadas: {data.finalizadas}</li>
        <li>Pendentes: {data.pendentes}</li>
        <li>Em andamento: {data.em_andamento}</li>
        <li>MTTR (h): {data.mttr_horas}</li>
        <li>MTBF (h): {data.mtbf_horas}</li>
      </ul>
    </div>
  )
}

export default Dashboard
