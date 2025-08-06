import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("https://cmmsbackendcompleto-production.up.railway.app/auth/login", {
        username,
        password
      })
      localStorage.setItem("token", response.data.access_token)
      navigate("/")
    } catch (err) {
      alert("Credenciais inválidas")
    }
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input placeholder="Usuário" value={username} onChange={e => setUsername(e.target.value)} /><br />
        <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} /><br />
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}

export default Login
