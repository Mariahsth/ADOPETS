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
    fetch(headerPath)
      .then(res => res.text())
      .then((data) => {
        const basePath = getAssetBasePath();
        const updatedHeader = data.replace(/{{path_to_assets}}/g, basePath); 
        document.getElementById(headerContainerId).innerHTML = updatedHeader;
  
        const path = window.location.pathname;
        const linkInicio = document.getElementById("link-inicio");
        const logoLink = document.getElementById("logo-link");
  
        if (path.includes("index.html") || path === "/" || path.endsWith("/index")) {
          linkInicio.href = "#home";
          logoLink.href = "#home";
        } else {
          linkInicio.href = "../../index.html";
          logoLink.href = "../../index.html";
        }
  
        initMenuHamburguer();
      });
  
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