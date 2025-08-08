export function initMenuHamburguer() {
    const menuToggle = document.getElementById('menu-toggle');
    const listaHeader = document.querySelector('.lista_header');
  
    if (menuToggle && listaHeader) {
      menuToggle.addEventListener('click', () => {
        listaHeader.classList.toggle('ativo');
      });
    }
  }
  