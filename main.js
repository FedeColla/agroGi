let fecha = new Date(2024 , 9, 17, 18);
//let fecha = new Date(2024 , 8, 28, 0 , 13); con hora incluida
let msFecha = fecha.getTime();

let parrafoDias = document.querySelector("#dias");
let parrafoHoras = document.querySelector("#horas");
let parrafominutos = document.querySelector("#minutos");
let counter = document.querySelector("#counter");

let intervalo = setInterval(()=> {
    let hoy = new Date().getTime();
    let distancia = msFecha - hoy;

    let msPorDia = 1000 * 60 * 60 *24;
    let msPorHora = 1000 * 60 * 60;
    let msPorMinuto = 1000 * 60;

    let dias = Math.floor(distancia / msPorDia);
    let horas = Math.floor((distancia % msPorDia) / msPorHora);
    let minutos = Math.floor((distancia % msPorHora) / msPorMinuto);

    parrafoDias.innerText = dias < 10 ? "0" + dias:dias;
    parrafoHoras.innerText = horas < 10 ? "0" + horas:horas;
    parrafominutos.innerText = minutos < 10 ? "0" + minutos:minutos;

    if (distancia < 0) {
        clearInterval(intervalo);
        counter.innerHTML = "<p class='grande'>¡Estamos en vivo!</p>"
    }

}, 1000)



//---------- Carousel ----------

document.addEventListener('DOMContentLoaded', () => {
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const carouselInner = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    let index = 0;

    function showItem(index) {
        const offset = -index * 100;
        carouselInner.style.transform = `translateX(${offset}%)`;
    }

    prevButton.addEventListener('click', () => {
        index = (index > 0) ? index - 1 : items.length - 1;
        showItem(index);
    });

    nextButton.addEventListener('click', () => {
        index = (index < items.length - 1) ? index + 1 : 0;
        showItem(index);
    });
});


//Animación con scroll que se activa tanto en bajada como en subida

// document.addEventListener('DOMContentLoaded', () => {
//     const sections = document.querySelectorAll('section:not(#counter)'); // Selecciona todas las secciones menos la excluida

//     const handleScroll = () => {
//         sections.forEach(section => {
//             const rect = section.getBoundingClientRect();
//             // Comprueba si la sección está en la vista
//             if (rect.top < window.innerHeight && rect.bottom > 0) {
//                 section.classList.add('in-view');
//             } else {
//                 section.classList.remove('in-view');
//             }
//         });
//     };

//     // Añade el evento de scroll
//     window.addEventListener('scroll', handleScroll);
//     // Llama a la función una vez para detectar las secciones que ya están en la vista al cargar la página
//     handleScroll();
// });


//Animación con scroll que se activa solo en bajada y luego queda permanente

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section:not(#counter)'); // Selecciona todas las secciones menos la excluida

    const handleScroll = () => {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            // Comprueba si la sección está en la vista
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                // Si la sección aún no ha sido vista
                if (!section.classList.contains('in-view')) {
                    section.classList.add('in-view');
                }
            }
        });
    };

    // Añade el evento de scroll
    window.addEventListener('scroll', handleScroll);
    // Llama a la función una vez para detectar las secciones que ya están en la vista al cargar la página
    handleScroll();
});