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




// Inicializa EmailJS con tu Public Key
(function() {
    emailjs.init('D9ohq1cBqCzmFWTkb'); // Reemplaza con tu Public Key
})();

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let isValid = true;

    // Obtener los valores del formulario
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    // Resetear errores
    document.querySelectorAll('.error').forEach(error => error.textContent = '');
    document.querySelectorAll('input').forEach(input => input.classList.remove('error')); // Limpiar clases de error

    // Validar campos
    if (firstName === '') {
        document.getElementById('error-first-name').textContent = 'Este campo es obligatorio.';
        document.getElementById('first-name').classList.add('error'); // Agregar clase de error
        isValid = false;
    }
    if (lastName === '') {
        document.getElementById('error-last-name').textContent = 'Este campo es obligatorio.';
        document.getElementById('last-name').classList.add('error'); // Agregar clase de error
        isValid = false;
    }
    if (email === '' || !/\S+@\S+\.\S+/.test(email)) {
        document.getElementById('error-email').textContent = 'Por favor ingrese un email válido.';
        document.getElementById('email').classList.add('error'); // Agregar clase de error
        isValid = false;
    }
    if (phone === '' || !/^\+?\d{1,3}?[-.\s]?(\d{10})$/.test(phone)) {
        document.getElementById('error-phone').textContent = 'Por favor ingrese un número de teléfono válido, que puede incluir el prefijo de país.';
        document.getElementById('phone').classList.add('error'); // Agregar clase de error
        isValid = false;
    }

    if (isValid) {
        // Enviar el formulario por correo electrónico usando EmailJS
        emailjs.send('service_o9thf3v', 'template_bqh8jsb', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            to_name: 'AgroGI', // Reemplaza con el nombre real
            from_name: firstName + ' ' + lastName // Nombre completo
        }, 'D9ohq1cBqCzmFWTkb') // Public Key
        .then(function(response) {
            console.log('Correo enviado con éxito:', response);
            window.open('https://chat.whatsapp.com/LsU3ymA3nUTEMxau5hJEdp', '_blank');
        })
        .catch(function(error) {
            console.error('Error al enviar el correo:', error);
        });
    }
});

// Agregar evento click a los labels para borrar el valor de los inputs
document.querySelector('label[for="phone"]').addEventListener('click', function() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput.value === 'Ejemplo: +5492364260929') {
        phoneInput.value = '';
    }
});

document.querySelector('label[for="email"]').addEventListener('click', function() {
    const emailInput = document.getElementById('email');
    if (emailInput.value === 'Ejemplo: nombre@dominio.com') {
        emailInput.value = '';
    }
});
