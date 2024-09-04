var audioPlayer = document.getElementById('audio-player');
var playPauseBtn = document.getElementById('play-pause-btn');
var currentTimeDisplay = document.getElementById('current-time');
var durationTimeDisplay = document.getElementById('duration-time');
var progressBar = document.getElementById('progress-bar');
var volumeControl = document.getElementById('volume-control');

// Define o volume inicial
audioPlayer.volume = 0.1;

// Atualiza a duração total da música quando os metadados são carregados
audioPlayer.addEventListener('loadedmetadata', function() {
    durationTimeDisplay.textContent = formatTime(audioPlayer.duration);
    progressBar.max = audioPlayer.duration;
    progressBar.value = audioPlayer.currentTime; // Inicializa o valor da barra de progresso
});

// Atualiza o tempo atual e a barra de progresso durante a reprodução
audioPlayer.addEventListener('timeupdate', function() {
    currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
    progressBar.value = audioPlayer.currentTime;
    updateProgressBar();
});

function updateProgressBar() {
    var percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.background = `linear-gradient(to right, #0300ca ${percentage}%, rgba(0, 0, 0, 0.489) ${percentage}%)`;
}

// Função para alternar entre play e pause
function togglePlayPause() {
    if (audioPlayer.paused || audioPlayer.ended) {
        audioPlayer.play();
        playPauseBtn.innerHTML = '&#10074;&#10074;'; // Ícone de Pause
    } else {
        audioPlayer.pause();
        playPauseBtn.innerHTML = '&#9658;'; // Ícone de Play
    }
}

// Função para ajustar o volume
function setVolume(value) {
    audioPlayer.volume = value;
}

// Atualiza o volume quando o usuário interage com o controle de volume
volumeControl.addEventListener('input', function() {
    setVolume(volumeControl.value);
    updateVolumeControl();
});

function updateVolumeControl() {
    var percentage = volumeControl.value * 100;
    volumeControl.style.background = `linear-gradient(to right, #0300ca ${percentage}%, rgba(0, 0, 0, 0.489) ${percentage}%)`;
}

// Função para formatar o tempo em minutos e segundos
function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var seconds = Math.floor(seconds % 60);
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
}

// Função para ajustar o tempo da música com a barra de progresso
progressBar.addEventListener('input', function() {
    var value = progressBar.value;
    audioPlayer.currentTime = value;
    updateProgressBar();
});

// Muda o ícone para "Play" quando a música termina
audioPlayer.addEventListener('ended', function() {
    playPauseBtn.innerHTML = '&#9658;';
});
