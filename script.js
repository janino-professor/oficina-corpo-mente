// Aguarda todo o HTML ser carregado antes de executar o script
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. LÓGICA DO POPUP DE ALERTA DE AULAS ONLINE
    const popupOverlay = document.getElementById("popup-overlay");
    const closeX = document.getElementById("popup-close-x");
    const closeBtn = document.getElementById("popup-close-btn");

    function fecharPopup() {
        if (popupOverlay) {
            popupOverlay.classList.remove("active");
        }
    }

    if (popupOverlay) {
        // Exibe o popup com um pequeno atraso de 400ms para entrada suave
        setTimeout(() => {
            popupOverlay.classList.add("active");
        }, 400);

        // Eventos de fechamento
        if (closeX) closeX.addEventListener("click", fecharPopup);
        if (closeBtn) closeBtn.addEventListener("click", fecharPopup);

        // Fechar ao clicar fora do conteúdo do card
        popupOverlay.addEventListener("click", (e) => {
            if (e.target === popupOverlay) {
                fecharPopup();
            }
        });
    }


    // 2. EFEITO DE REVELAR AO ROLAR A PÁGINA (Scroll Reveal)
    const elementosParaAnimar = document.querySelectorAll('.main-col h2, .main-col p, .card, .dark');

    const observador = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Se o elemento estiver visível na tela, adiciona a classe que ativa a animação
            if (entry.isIntersecting) {
                entry.target.classList.add('elemento-visivel');
            }
        });
    }, {
        threshold: 0.15 // Dispara a animação quando 15% do elemento aparece na tela
    });

    // Aplica a preparação e o observador em cada elemento selecionado
    elementosParaAnimar.forEach(elemento => {
        elemento.classList.add('elemento-escondido'); // Esconde inicialmente pelo JS
        observador.observe(elemento);
    });


    // 3. ROLAGEM SUAVE AO CLICAR NOS LINKS DO MENU
    const linksMenu = document.querySelectorAll('nav a');

    linksMenu.forEach(link => {
        link.addEventListener('click', (e) => {
            // Verifica se o link é interno (começa com #)
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault(); // Evita o pulo brusco padrão
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth', // Aplica o deslize suave
                        block: 'start'
                    });
                }
            }
        });
    });
});