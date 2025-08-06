import React, { useEffect, useState } from 'react'
import axios from 'axios'
import API_BASE_URL from '../config/api'

const Preventiva = () => {
  const [planos, setPlanos] = useState([])
  const [equipamentos, setEquipamentos] = useState([])
  const [nome, setNome] = useState("")
  const [frequencia, setFrequencia] = useState("")
  const [equipamentoId, setEquipamentoId] = useState("")
  const [checklist, setChecklist] = useState([""])

  const token = localStorage.getItem("token")
  const headers = { Authorization: `Bearer ${token}` }

  const fetchPlanos = async () => {
    const res = await axios.get(`${API_BASE_URL}/preventiva/`, { headers })
    setPlanos(res.data)
  }

  const fetchEquipamentos = async () => {
    const res = await axios.get(`${API_BASE_URL}/equipamentos/`, { headers })
    setEquipamentos(res.data)
  }

  useEffect(() => {
    fetchPlanos()
    fetchEquipamentos()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const checklistItems = checklist.filter(item => item.trim() !== "").map(descricao => ({ descricao }))
    await axios.post(`${API_BASE_URL}/preventiva/`, {
      nome,
      frequencia_dias: parseInt(frequencia),
      equipamento_id: Number(equipamentoId),
      checklist: checklistItems
    }, { headers })
    setNome("")
    setFrequencia("")
    setChecklist([""])
    setEquipamentoId("")
    fetchPlanos()
  }

  const updateChecklistItem = (index, value) => {
    const updated = [...checklist]
    updated[index] = value
    setChecklist(updated)
  }

  const addChecklistItem = () => setChecklist([...checklist, ""])
  const removeChecklistItem = (index) => {
    const updated = checklist.filter((_, i) => i !== index)
    setChecklist(updated)
  }

  return (
    <div>
      <h2>Planos de Preventiva</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input placeholder="Nome do Plano" value={nome} onChange={e => setNome(e.target.value)} />
        <input placeholder="Frequência (dias)" type="number" value={frequencia} onChange={e => setFrequencia(e.target.value)} />
        <select value={equipamentoId} onChange={e => setEquipamentoId(e.target.value)}>
          <option value="">Equipamento</option>
          {equipamentos.map(e => (
            <option key={e.id} value={e.id}>{e.descricao}</option>
          ))}
        </select>

        <h4>Checklist:</h4>
        {checklist.map((item, idx) => (
          <div key={idx}>
            <input
              value={item}
              onChange={e => updateChecklistItem(idx, e.target.value)}
              placeholder={`Item ${idx + 1}`}
            />
            <button type="button" onClick={() => removeChecklistItem(idx)}>Remover</button>
          </div>
        ))}
        <button type="button" onClick={addChecklistItem}>Adicionar Item</button><br /><br />
        <button type="submit">Criar Plano</button>
      </form>

      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Equipamento</th>
            <th>Frequência (dias)</th>
            <th>Checklist</th>
          </tr>
        </thead>
        <tbody>
          {planos.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nome}</td>
              <td>{p.equipamento_id}</td>
              <td>{p.frequencia_dias}</td>
              <td>
                <ul>
                  {p.checklist?.map((c, i) => (
                    <li key={i}>{c.descricao}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Preventiva
