import React, { useEffect, useState } from 'react'
import axios from 'axios'
import API_BASE_URL from '../config/api'

const Equipamentos = () => {
  const [equipamentos, setEquipamentos] = useState([])
  const [descricao, setDescricao] = useState("")
  const [tipo, setTipo] = useState("")

  const token = localStorage.getItem("token")

  const fetchEquipamentos = async () => {
    const res = await axios.get(`${API_BASE_URL}/equipamentos/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setEquipamentos(res.data)
  }

  useEffect(() => {
    fetchEquipamentos()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post(`${API_BASE_URL}/equipamentos/`, {
      descricao,
      tipo
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setDescricao("")
    setTipo("")
    fetchEquipamentos()
  }

  const handleDelete = async (id) => {
    if (confirm("Deseja remover este equipamento?")) {
      await axios.delete(`${API_BASE_URL}/equipamentos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchEquipamentos()
    }
  }

  return (
    <div>
      <h2>Equipamentos</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          placeholder="Descrição"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
        />
        <input
          placeholder="Tipo"
          value={tipo}
          onChange={e => setTipo(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {equipamentos.map(e => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.descricao}</td>
              <td>{e.tipo}</td>
              <td>
                <button onClick={() => handleDelete(e.id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Equipamentos
