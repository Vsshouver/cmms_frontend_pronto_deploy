import React, { useEffect, useState } from 'react'
import axios from 'axios'
import API_BASE_URL from '../config/api'

const Pneus = () => {
  const [pneus, setPneus] = useState([])
  const [equipamentos, setEquipamentos] = useState([])
  const [form, setForm] = useState({
    numero_fogo: '',
    dot: '',
    marca: '',
    fornecedor: '',
    profundidade_sulco: '',
    status: 'DISPONIVEL',
    equipamento_id: '',
    posicao: ''
  })

  const token = localStorage.getItem("token")
  const headers = { Authorization: `Bearer ${token}` }

  const fetchPneus = async () => {
    const res = await axios.get(`${API_BASE_URL}/pneus/`, { headers })
    setPneus(res.data)
  }

  const fetchEquipamentos = async () => {
    const res = await axios.get(`${API_BASE_URL}/equipamentos/`, { headers })
    setEquipamentos(res.data)
  }

  useEffect(() => {
    fetchPneus()
    fetchEquipamentos()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post(`${API_BASE_URL}/pneus/`, {
      ...form,
      profundidade_sulco: parseFloat(form.profundidade_sulco || 0),
      equipamento_id: form.equipamento_id ? Number(form.equipamento_id) : null
    }, { headers })
    setForm({
      numero_fogo: '',
      dot: '',
      marca: '',
      fornecedor: '',
      profundidade_sulco: '',
      status: 'DISPONIVEL',
      equipamento_id: '',
      posicao: ''
    })
    fetchPneus()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleDelete = async (id) => {
    if (confirm("Deseja remover o pneu?")) {
      await axios.delete(`${API_BASE_URL}/pneus/${id}`, { headers })
      fetchPneus()
    }
  }

  return (
    <div>
      <h2>Controle de Pneus</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input name="numero_fogo" placeholder="Número de Fogo" value={form.numero_fogo} onChange={handleChange} />
        <input name="dot" placeholder="DOT" value={form.dot} onChange={handleChange} />
        <input name="marca" placeholder="Marca" value={form.marca} onChange={handleChange} />
        <input name="fornecedor" placeholder="Fornecedor" value={form.fornecedor} onChange={handleChange} />
        <input name="profundidade_sulco" placeholder="Prof. Sulco" type="number" value={form.profundidade_sulco} onChange={handleChange} />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="DISPONIVEL">DISPONÍVEL</option>
          <option value="EM USO">EM USO</option>
          <option value="DESCARTADO">DESCARTADO</option>
        </select>
        <select name="equipamento_id" value={form.equipamento_id} onChange={handleChange}>
          <option value="">Sem equipamento</option>
          {equipamentos.map(e => (
            <option key={e.id} value={e.id}>{e.descricao}</option>
          ))}
        </select>
        <input name="posicao" placeholder="Posição" value={form.posicao} onChange={handleChange} />
        <button type="submit">Cadastrar</button>
      </form>

      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>#</th>
            <th>Fogo</th>
            <th>DOT</th>
            <th>Marca</th>
            <th>Status</th>
            <th>Eqpto</th>
            <th>Posição</th>
            <th>Sulco</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pneus.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.numero_fogo}</td>
              <td>{p.dot}</td>
              <td>{p.marca}</td>
              <td>{p.status}</td>
              <td>{p.equipamento_id}</td>
              <td>{p.posicao}</td>
              <td>{p.profundidade_sulco}</td>
              <td><button onClick={() => handleDelete(p.id)}>Remover</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Pneus
