import { getBasePath } from "./utils.js";

const API_URL = "https://adopets-ndrs.onrender.com"; 


export async function verificarToken() {
  const basePath = getBasePath(); 
    const token = localStorage.getItem('token');
  
    if (!token) {
      window.location.href = basePath + '/pages/login/login.html';
      return;
    }
  
    try {
      const res = await fetch(`${API_URL}/admin`, {
        headers: { 'Authorization': 'Bearer ' + token }
      });
  
      if (!res.ok) {
        localStorage.removeItem('token');
        window.location.href = basePath +'/pages/login/login.html';
      }
    } catch (error) {
      console.error('Erro ao verificar token:', error);
      localStorage.removeItem('token');
      window.location.href = basePath + '/pages/login/login.html';
    }
  }
  

  export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Realizando Logout")
    window.location.href = "../../pages/login/login.html";
  }