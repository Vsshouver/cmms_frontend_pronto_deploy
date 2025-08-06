import jwt_decode from "jwt-decode"

export const isAuthenticated = () => {
  const token = localStorage.getItem("token")
  if (!token) return false

  try {
    const decoded = jwt_decode(token)
    const now = Date.now() / 1000
    return decoded.exp > now
  } catch {
    return false
  }
}
