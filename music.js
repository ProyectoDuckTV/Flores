const music = document.querySelector('#background-music');
const musicControl = document.querySelector('#music-control');
const musicLabel = document.querySelector('#music-label');

function updateMusicControl(isPlaying) {
  musicControl.setAttribute('aria-pressed', String(isPlaying));
  musicControl.setAttribute('aria-label', isPlaying ? 'Pausar música' : 'Reproducir música');
  musicLabel.textContent = isPlaying ? 'Pausar música' : 'Reproducir música';
}

musicControl.addEventListener('click', async () => {
  if (music.paused) {
    try {
      await music.play();
    } catch (error) {
      console.error('No se pudo reproducir musica.mp3:', error);
    }
  } else {
    music.pause();
  }
});

music.addEventListener('play', () => updateMusicControl(true));
music.addEventListener('pause', () => updateMusicControl(false));
music.addEventListener('error', () => {
  musicLabel.textContent = 'Falta musica.mp3';
  musicControl.disabled = true;
  musicControl.setAttribute('aria-label', 'Agrega musica.mp3 junto a index.html para reproducir música');
  console.error('No se pudo cargar musica.mp3. Coloca el archivo junto a index.html.');
});

music.play().catch(error => {
  updateMusicControl(false);
  if (error.name !== 'NotAllowedError') {
    console.error('No se pudo iniciar la reproducción automática de musica.mp3:', error);
  }
});
