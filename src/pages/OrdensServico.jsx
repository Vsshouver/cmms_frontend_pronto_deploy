import React, { useEffect, useState } from 'react'
import axios from 'axios'
import API_BASE_URL from '../config/api'

const OrdensServico = () => {
  const [ordens, setOrdens] = useState([])
  const [equipamentos, setEquipamentos] = useState([])
  const [descricao, setDescricao] = useState("")
  const [prioridade, setPrioridade] = useState("MÉDIA")
  const [equipamentoId, setEquipamentoId] = useState("")
  const token = localStorage.getItem("token")

  const headers = { Authorization: `Bearer ${token}` }

  const fetchOrdens = async () => {
    const res = await axios.get(`${API_BASE_URL}/ordens_servico/`, { headers })
    setOrdens(res.data)
  }

  const fetchEquipamentos = async () => {
    const res = await axios.get(`${API_BASE_URL}/equipamentos/`, { headers })
    setEquipamentos(res.data)
  }

  useEffect(() => {
    fetchOrdens()
    fetchEquipamentos()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post(`${API_BASE_URL}/ordens_servico/`, {
      descricao,
      prioridade,
      status: "PENDENTE",
      equipamento_id: Number(equipamentoId),
      mecanicos: [],
      itens: []
    }, { headers })
    setDescricao("")
    setEquipamentoId("")
    fetchOrdens()
  }

  const finalizarOS = async (id) => {
    await axios.post(`${API_BASE_URL}/ordens_servico/${id}/finalizar`, {}, { headers })
    fetchOrdens()
  }

  return (
    <div>
      <h2>Ordens de Serviço</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          placeholder="Descrição"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
        />
        <select value={prioridade} onChange={e => setPrioridade(e.target.value)}>
          <option value="BAIXA">BAIXA</option>
          <option value="MÉDIA">MÉDIA</option>
          <option value="ALTA">ALTA</option>
        </select>
        <select value={equipamentoId} onChange={e => setEquipamentoId(e.target.value)}>
          <option value="">Selecione um equipamento</option>
          {equipamentos.map(e => (
            <option key={e.id} value={e.id}>{e.descricao}</option>
          ))}
        </select>
        <button type="submit">Criar OS</button>
      </form>

      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Equipamento</th>
            <th>Prioridade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {ordens.map(o => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.descricao}</td>
              <td>{o.status}</td>
              <td>{o.equipamento_id}</td>
              <td>{o.prioridade}</td>
              <td>
                {o.status !== "FINALIZADA" && (
                  <button onClick={() => finalizarOS(o.id)}>Finalizar</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrdensServico
