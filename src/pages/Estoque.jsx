import React, { useEffect, useState } from 'react'
import axios from 'axios'
import API_BASE_URL from '../config/api'

const Estoque = () => {
  const [itens, setItens] = useState([])
  const [grupos, setGrupos] = useState([])
  const [descricao, setDescricao] = useState("")
  const [grupoId, setGrupoId] = useState("")
  const [unidade, setUnidade] = useState("UN")
  const [quantidade, setQuantidade] = useState(0)

  const token = localStorage.getItem("token")
  const headers = { Authorization: `Bearer ${token}` }

  const fetchItens = async () => {
    const res = await axios.get(`${API_BASE_URL}/estoque/`, { headers })
    setItens(res.data)
  }

  const fetchGrupos = async () => {
    const res = await axios.get(`${API_BASE_URL}/estoque/grupos`, { headers })
    setGrupos(res.data)
  }

  useEffect(() => {
    fetchItens()
    fetchGrupos()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post(`${API_BASE_URL}/estoque/`, {
      descricao,
      grupo_id: Number(grupoId),
      unidade,
      quantidade: Number(quantidade)
    }, { headers })
    setDescricao("")
    setGrupoId("")
    setUnidade("UN")
    setQuantidade(0)
    fetchItens()
  }

  const handleDelete = async (id) => {
    if (confirm("Deseja excluir este item?")) {
      await axios.delete(`${API_BASE_URL}/estoque/${id}`, { headers })
      fetchItens()
    }
  }

  return (
    <div>
      <h2>Estoque</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          placeholder="Descrição"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
        />
        <select value={grupoId} onChange={e => setGrupoId(e.target.value)}>
          <option value="">Grupo</option>
          {grupos.map(g => (
            <option key={g.id} value={g.id}>{g.codigo} - {g.nome}</option>
          ))}
        </select>
        <input
          placeholder="Unidade"
          value={unidade}
          onChange={e => setUnidade(e.target.value)}
        />
        <input
          type="number"
          placeholder="Qtd"
          value={quantidade}
          onChange={e => setQuantidade(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </form>

      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Grupo</th>
            <th>Unidade</th>
            <th>Qtd</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {itens.map(i => (
            <tr key={i.id}>
              <td>{i.id}</td>
              <td>{i.descricao}</td>
              <td>{i.grupo?.codigo}</td>
              <td>{i.unidade}</td>
              <td>{i.quantidade}</td>
              <td>
                <button onClick={() => handleDelete(i.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Estoque
