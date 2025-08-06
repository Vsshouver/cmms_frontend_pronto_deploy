import React, { useEffect, useState } from 'react'
import axios from 'axios'
import API_BASE_URL from '../config/api'

const Backlog = () => {
  const [itens, setItens] = useState([])
  const [equipamentos, setEquipamentos] = useState([])
  const [titulo, setTitulo] = useState("")
  const [descricao, setDescricao] = useState("")
  const [prioridade, setPrioridade] = useState("MÉDIA")
  const [status, setStatus] = useState("ABERTO")
  const [numeroProcesso, setNumeroProcesso] = useState("")
  const [equipamentoId, setEquipamentoId] = useState("")

  const token = localStorage.getItem("token")
  const headers = { Authorization: `Bearer ${token}` }

  const fetchBacklog = async () => {
    const res = await axios.get(`${API_BASE_URL}/backlog/`, { headers })
    setItens(res.data)
  }

  const fetchEquipamentos = async () => {
    const res = await axios.get(`${API_BASE_URL}/equipamentos/`, { headers })
    setEquipamentos(res.data)
  }

  useEffect(() => {
    fetchBacklog()
    fetchEquipamentos()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post(`${API_BASE_URL}/backlog/`, {
      titulo,
      descricao,
      prioridade,
      status,
      numero_processo: numeroProcesso,
      equipamento_id: Number(equipamentoId)
    }, { headers })
    setTitulo("")
    setDescricao("")
    setPrioridade("MÉDIA")
    setStatus("ABERTO")
    setNumeroProcesso("")
    setEquipamentoId("")
    fetchBacklog()
  }

  const atualizarStatus = async (id, novoStatus) => {
    await axios.patch(`${API_BASE_URL}/backlog/${id}`, {
      status: novoStatus
    }, { headers })
    fetchBacklog()
  }

  const handleDelete = async (id) => {
    if (confirm("Excluir item do backlog?")) {
      await axios.delete(`${API_BASE_URL}/backlog/${id}`, { headers })
      fetchBacklog()
    }
  }

  return (
    <div>
      <h2>Backlog</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)} />
        <input placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} />
        <select value={prioridade} onChange={e => setPrioridade(e.target.value)}>
          <option value="ALTA">ALTA</option>
          <option value="MÉDIA">MÉDIA</option>
          <option value="BAIXA">BAIXA</option>
        </select>
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="ABERTO">ABERTO</option>
          <option value="EM ANDAMENTO">EM ANDAMENTO</option>
          <option value="CONCLUÍDO">CONCLUÍDO</option>
        </select>
        <input placeholder="Nº Processo Compra" value={numeroProcesso} onChange={e => setNumeroProcesso(e.target.value)} />
        <select value={equipamentoId} onChange={e => setEquipamentoId(e.target.value)}>
          <option value="">Equipamento</option>
          {equipamentos.map(e => (
            <option key={e.id} value={e.id}>{e.descricao}</option>
          ))}
        </select>
        <button type="submit">Cadastrar</button>
      </form>

      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Status</th>
            <th>Prioridade</th>
            <th>Equipamento</th>
            <th>Processo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {itens.map(i => (
            <tr key={i.id}>
              <td>{i.id}</td>
              <td>{i.titulo}</td>
              <td>{i.status}</td>
              <td>{i.prioridade}</td>
              <td>{i.equipamento_id}</td>
              <td>{i.numero_processo}</td>
              <td>
                <select value={i.status} onChange={e => atualizarStatus(i.id, e.target.value)}>
                  <option value="ABERTO">ABERTO</option>
                  <option value="EM ANDAMENTO">EM ANDAMENTO</option>
                  <option value="CONCLUÍDO">CONCLUÍDO</option>
                </select>
                <button onClick={() => handleDelete(i.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Backlog
