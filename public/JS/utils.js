import { initMenuHamburguer } from './header.js';

export function getBasePath() {
    if (window.location.hostname === "adopets-eight.vercel.app") {
      return "";  
    } else {
      return "/public"; 
    }
  }
  


export function getAssetBasePath() {
    const path = window.location.pathname;
    if (path.includes('pages')) {
      return "../../assets";  
    } else {
      return "./assets";  
    }
  }
  
  export function loadHeaderFooter(headerPath, footerPath, headerContainerId, footerContainerId) {
    // Carregar o header dinamicamente
    fetch(headerPath)
      .then(res => res.text())
      .then((data) => {
        const baseAssetPath = getAssetBasePath();
        const updatedHeader = data.replace(/{{path_to_assets}}/g, baseAssetPath); 
        document.getElementById(headerContainerId).innerHTML = updatedHeader;
  
        // Após o header ser carregado, ajustar o link do "Painel Admin"
        const path = window.location.pathname;
        const linkAdmin = document.getElementById('link-admin');
        const basePath = getBasePath(); // Pega o basePath correto para cada ambiente
  
        // Ajusta o href do "Painel Admin" baseado no ambiente
        if (linkAdmin) {
          linkAdmin.href = basePath + "/pages/admin/admin.html";
        }
  
        // Ajusta os links do logo e "Início"
        const linkInicio = document.getElementById("link-inicio");
        const logoLink = document.getElementById("logo-link");
  
        if (path.includes("index.html") || path === "/" || path.endsWith("/index")) {
          linkInicio.href = "#home";
          logoLink.href = "#home";
        } else {
          linkInicio.href = "../../index.html";
          logoLink.href = "../../index.html";
        }
  
        // Inicia o menu hambúrguer
        initMenuHamburguer();
  
        // Impede redirecionamento para a mesma página
        const menuLinks = document.querySelectorAll('.nav_header');
        menuLinks.forEach(link => {
          preventRedirectionToSamePage(link);
        });
      });
  
    // Carregar o footer dinamicamente
    fetch(footerPath)
      .then(res => res.text())
      .then((data) => {
        const basePath = getAssetBasePath();
        const updatedFooter = data.replace(/{{path_to_assets}}/g, basePath); 
        document.getElementById(footerContainerId).innerHTML = updatedFooter;
      });
  }
  export function preventRedirectionToSamePage(linkElement) {
    linkElement.addEventListener('click', function(event) {
      const currentPath = window.location.pathname.split("/").slice(-1)[0].split("#")[0];
      console.log("Página atual:", currentPath);
      
      // Verifica a página de destino
      const targetPage = linkElement.getAttribute("href").split("/").slice(-1)[0].split("#")[0];
      console.log("Página de destino:", targetPage);
      
      // Se a página de destino for a mesma, previne o redirecionamento
      if (currentPath === targetPage) {
        event.preventDefault();  // Impede o redirecionamento
        console.log("Você já está na página " + targetPage);
        window.scrollTo(0, 0);  // Rolagem até o topo (opcional)
      } else {
        // Caso contrário, o redirecionamento é permitido
        console.log("Redirecionando para " + targetPage);
      }
    });
  }