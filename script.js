// Aguarda todo o HTML ser carregado antes de executar o script
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. LÓGICA DO POPUP DE ALERTA DE FECHAMENTO DE TURMA (16/10)
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

    // 2. CRONÔMETRO REGRESSIVO PARA O DIA 16/10
    const dataAlvo = new Date("2026-10-16T23:59:59").getTime();

    const spanDias = document.getElementById("dias");
    const spanHoras = document.getElementById("horas");
    const spanMinutos = document.getElementById("minutos");
    const spanSegundos = document.getElementById("segundos");

    function atualizarCronometro() {
        const agora = new Date().getTime();
        const distancia = dataAlvo - agora;

        if (distancia < 0) {
            if (spanDias) spanDias.textContent = "00";
            if (spanHoras) spanHoras.textContent = "00";
            if (spanMinutos) spanMinutos.textContent = "00";
            if (spanSegundos) spanSegundos.textContent = "00";
            return;
        }

        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

        if (spanDias) spanDias.textContent = String(dias).padStart(2, '0');
        if (spanHoras) spanHoras.textContent = String(horas).padStart(2, '0');
        if (spanMinutos) spanMinutos.textContent = String(minutos).padStart(2, '0');
        if (spanSegundos) spanSegundos.textContent = String(segundos).padStart(2, '0');
    }

    setInterval(atualizarCronometro, 1000);
    atualizarCronometro();


    // 3. EFEITO DE REVELAR AO ROLAR A PÁGINA (Scroll Reveal)
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


    // 4. ROLAGEM SUAVE AO CLICAR NOS LINKS DO MENU
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