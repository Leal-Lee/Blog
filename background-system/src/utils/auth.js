// 我们使用的是JWT,直接保存在localStorage
export function getToken() {
  return localStorage.getItem('token');

}

export function setToken(token) {
  return localStorage.setItem('token',`Bearer ${token}`)
}

export function removeToken() {
  return localStorage.removeItem('token')
}
