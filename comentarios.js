const formComentario = document.getElementById('formComentario');
const comentarioTexto = document.getElementById('comentarioTexto');
const listaComentarios = document.getElementById('listaComentarios');
const contador = document.getElementById('contador');

let comentarios = JSON.parse(localStorage.getItem('comentariosBlog')) || [];

function guardarComentarios() {
    localStorage.setItem('comentariosBlog', JSON.stringify(comentarios));
}

function mostrarComentarios() {
    listaComentarios.innerHTML = '';

    if (comentarios.length === 0) {
        listaComentarios.innerHTML = '<div class="comentarios-vacio">Todavía no hay comentarios. Sé el primero en comentar.</div>';
        return;
    }

    comentarios.forEach(comentario => {
        const tarjeta = document.createElement('article');
        tarjeta.classList.add('comentario-card');

        tarjeta.innerHTML = `
            <div class="comentario-top">
                <span class="usuario-anonimo">👤 ${comentario.usuario}</span>
                <span class="fecha-comentario">${comentario.fecha}</span>
            </div>
            <p>${comentario.texto}</p>
        `;

        listaComentarios.appendChild(tarjeta);
    });
}

function limpiarTexto(texto) {
    return texto
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

comentarioTexto.addEventListener('input', () => {
    contador.textContent = `${comentarioTexto.value.length} / 280`;
});

formComentario.addEventListener('submit', function(e) {
    e.preventDefault();

    const texto = comentarioTexto.value.trim();

    if (texto === '') {
        return;
    }

    const nuevoComentario = {
        usuario: 'anónimo',
        texto: limpiarTexto(texto),
        fecha: new Date().toLocaleDateString('es-MX', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };

    comentarios.unshift(nuevoComentario);
    guardarComentarios();
    mostrarComentarios();

    comentarioTexto.value = '';
    contador.textContent = '0 / 280';
});

// Inicializar la lista al cargar la página
mostrarComentarios();