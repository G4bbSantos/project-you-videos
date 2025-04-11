document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
  
    // Responsável por abrir o menu mobile
    const toggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('.nav');
    toggle?.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get('v');
    const title = urlParams.get('t');
  
    // -----------------------------
    // Adicionar aos favoritos (apenas na video.html)
    // -----------------------------
    const favBtn = document.getElementById('add-fav');
    if (favBtn && videoId) {
      favBtn.addEventListener('click', () => {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  
        const jaExiste = favoritos.some(v => v.id === videoId);
        if (!jaExiste) {
          favoritos.push({
            id: videoId,
            titulo: decodeURIComponent(title),
            thumb: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
          });
          localStorage.setItem('favoritos', JSON.stringify(favoritos));
          favBtn.textContent = "✅ Adicionado aos Favoritos";
          favBtn.disabled = true;
        }
      });
    }
  
    // -----------------------------
    // Página HOME - Carregar favoritos
    // -----------------------------
    const favSection = document.getElementById('favoritos-section');
    const favGrid = document.getElementById('video-grid');
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  
    if (favSection && favoritos.length > 0) {
      favSection.classList.remove('hidden');
      favoritos.forEach(video => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.innerHTML = `
          <a href="video.html?v=${video.id}&t=${encodeURIComponent(video.titulo)}">
            <img class="video-thumb" src="${video.thumb}" alt="${video.titulo}" />
            <div class="video-title">${video.titulo}</div>
          </a>
        `;
        favGrid.appendChild(card);
      });
    }
  
    // -----------------------------
    // Página HOME - Carregar recomendados
    // -----------------------------
    const recomendados = [
      {
        titulo: "React em 10 minutos",
        thumb: "https://img.youtube.com/vi/N3AkSS5hXMA/hqdefault.jpg",
        id: "N3AkSS5hXMA"
      },
      {
        titulo: "Aprenda Tailwind CSS",
        thumb: "https://img.youtube.com/vi/dFgzHOX84xQ/hqdefault.jpg",
        id: "dFgzHOX84xQ"
      },
      {
        titulo: "Dicas de UI para devs",
        thumb: "https://img.youtube.com/vi/EZ8F0nW6S-w/hqdefault.jpg",
        id: "EZ8F0nW6S-w"
      },
      {
        titulo: "Como fazer um site moderno",
        thumb: "https://img.youtube.com/vi/lz5PkxCL2VQ/hqdefault.jpg",
        id: "lz5PkxCL2VQ"
      }
    ];
  
    const recSection = document.getElementById('recomendados-section');
    const recGrid = document.getElementById('recomendados-grid');
  
    if (recSection && recomendados.length > 0) {
      recSection.classList.remove('hidden');
      recomendados.forEach(video => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.innerHTML = `
          <a href="video.html?v=${video.id}&t=${encodeURIComponent(video.titulo)}">
            <img class="video-thumb" src="${video.thumb}" alt="${video.titulo}" />
            <div class="video-title">${video.titulo}</div>
          </a>
        `;
        recGrid.appendChild(card);
      });
    }

    // Exibir player do vídeo (em video.html)
    if (videoId) {
    const videoContainer = document.getElementById('video-container');
    const videoTitle = document.getElementById('video-title');

    videoContainer.innerHTML = `
        <iframe 
        src="https://www.youtube.com/embed/${videoId}" 
        title="${decodeURIComponent(title)}" 
        allowfullscreen
        ></iframe>
    `;

    videoTitle.textContent = decodeURIComponent(title);
    }

  });

  document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.querySelector('.comentarios textarea');
    const enviarBtn = document.querySelector('.comentar');
    const listaComentarios = document.querySelector('.comentarios-lista');
  
    const videoId = new URLSearchParams(window.location.search).get('v');
  
    function carregarComentarios() {
      const todosComentarios = JSON.parse(localStorage.getItem('comentarios')) || {};
      const comentariosDoVideo = todosComentarios[videoId] || [];
  
      listaComentarios.innerHTML = '';
  
      if (comentariosDoVideo.length === 0) {
        listaComentarios.innerHTML = `<p>Nenhum comentário ainda.</p>`;
      } else {
        comentariosDoVideo.forEach(comentario => {
          const p = document.createElement('p');
          p.textContent = `🗨️ ${comentario}`;
          listaComentarios.appendChild(p);
        });
      }
    }
  
    enviarBtn.addEventListener('click', () => {
      const texto = textarea.value.trim();
      if (!texto) return;
  
      const todosComentarios = JSON.parse(localStorage.getItem('comentarios')) || {};
      if (!todosComentarios[videoId]) todosComentarios[videoId] = [];
  
      todosComentarios[videoId].push(texto);
      localStorage.setItem('comentarios', JSON.stringify(todosComentarios));
  
      textarea.value = '';
      carregarComentarios();
    });
  
    carregarComentarios();
  });
  
  