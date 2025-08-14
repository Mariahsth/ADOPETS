import { getBasePath } from "./utils";

const basePath = getBasePath(); 


export async function verificarToken() {
    const token = localStorage.getItem('token');
  
    if (!token) {
      window.location.href = basePath + '/pages/login/login.html';
      return;
    }
  
    try {
      const res = await fetch('http://localhost:3000/admin', {
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
    window.location.href = "../../pages/login/login.html";
  }