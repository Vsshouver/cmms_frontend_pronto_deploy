import React, { useEffect, useState } from 'react'
import axios from 'axios'
import API_BASE_URL from '../config/api'

const AnalisesOleo = () => {
  const [analises, setAnalises] = useState([])
  const [equipamentos, setEquipamentos] = useState([])
  const [form, setForm] = useState({
    equipamento_id: '',
    resultado: '',
    viscosidade: '',
    contaminacao: '',
    tratativa: ''
  })

  const token = localStorage.getItem("token")
  const headers = { Authorization: `Bearer ${token}` }

  const fetchAnalises = async () => {
    const res = await axios.get(`${API_BASE_URL}/analises_oleo/`, { headers })
    setAnalises(res.data)
  }

  const fetchEquipamentos = async () => {
    const res = await axios.get(`${API_BASE_URL}/equipamentos/`, { headers })
    setEquipamentos(res.data)
  }

  useEffect(() => {
    fetchAnalises()
    fetchEquipamentos()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post(`${API_BASE_URL}/analises_oleo/`, {
      ...form,
      equipamento_id: Number(form.equipamento_id),
      viscosidade: parseFloat(form.viscosidade || 0)
    }, { headers })
    setForm({ equipamento_id: '', resultado: '', viscosidade: '', contaminacao: '', tratativa: '' })
    fetchAnalises()
  }

  return (
    <div>
      <h2>Análises de Óleo</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <select name="equipamento_id" value={form.equipamento_id} onChange={handleChange}>
          <option value="">Equipamento</option>
          {equipamentos.map(e => (
            <option key={e.id} value={e.id}>{e.descricao}</option>
          ))}
        </select>
        <input name="resultado" placeholder="Resultado" value={form.resultado} onChange={handleChange} />
        <input name="viscosidade" placeholder="Viscosidade" type="number" value={form.viscosidade} onChange={handleChange} />
        <input name="contaminacao" placeholder="Contaminação" value={form.contaminacao} onChange={handleChange} />
        <input name="tratativa" placeholder="Tratativa" value={form.tratativa} onChange={handleChange} />
        <button type="submit">Registrar Análise</button>
      </form>

      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>ID</th>
            <th>Equipamento</th>
            <th>Resultado</th>
            <th>Viscosidade</th>
            <th>Contaminação</th>
            <th>Tratativa</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {analises.map(a => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.equipamento_id}</td>
              <td>{a.resultado}</td>
              <td>{a.viscosidade}</td>
              <td>{a.contaminacao}</td>
              <td>{a.tratativa}</td>
              <td>{new Date(a.data_analise).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AnalisesOleo
