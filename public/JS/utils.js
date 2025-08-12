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
        const baseAssetPath = getAssetBasePath();
        const updatedHeader = data.replace(/{{path_to_assets}}/g, baseAssetPath); 
        document.getElementById(headerContainerId).innerHTML = updatedHeader;
  
        const path = window.location.pathname;
        const linkAdmin = document.getElementById('link-admin');
        const linkAbout = document.getElementById('link-about');
        const linkFeiras = document.getElementById('link-feiras');
        const linkPartners = document.getElementById('link-partners');

        const basePath = getBasePath(); 
  
        if (linkAdmin) {
          linkAdmin.href = basePath + "/pages/admin/admin.html";
        }
        if (linkAbout) {
            linkAbout.href = basePath + "/pages/about/about.html";
        }
        if (linkFeiras) {
          linkFeiras.href = basePath + "/pages/feiras/feiras.html";
        }
        if (linkPartners) {
          linkPartners.href = basePath + "/pages/partners/partners.html";
        }
  
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
  
        const menuLinks = document.querySelectorAll('.nav_header');
        menuLinks.forEach(link => {
          preventRedirectionToSamePage(link);
        });
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
      
      const targetPage = linkElement.getAttribute("href").split("/").slice(-1)[0].split("#")[0];
      console.log("Página de destino:", targetPage);
      
      if (currentPath === targetPage) {
        event.preventDefault();  
        console.log("Você já está na página " + targetPage);
        window.scrollTo(0, 0);  
      } else {
        console.log("Redirecionando para " + targetPage);
      }
    });
  }