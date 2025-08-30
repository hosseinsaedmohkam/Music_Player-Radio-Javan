
    const audio = new Audio();
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playPrevBtn = document.getElementById('play-prev-btn');
    const playNextBtn = document.getElementById('play-next-btn');
    const progressBar = document.getElementById('progress-bar');
    const volumeSlider = document.getElementById('volume-slider');
    const currentTimeSpan = document.getElementById('current-time');
    const durationSpan = document.getElementById('duration');
    const currentSongTitle = document.getElementById('current-song-title');
    const currentArtist = document.getElementById('current-artist');
    const musicCards = document.querySelectorAll('.music-card');
    const albumCover = document.getElementById('album-cover');

    const playlist = [
        { title: ' Ashkaye Abi ', artist: 'Seper', src: 'music1/Seper - Ashkaye Abi (320).mp3', img: "Ashkaye Abi - Seper.jpg" },
        { title: 'ya chi', artist: 'masih & arash', src: 'music1/Arash & Masih - Ya Chi (320).mp3', img: "ya chi-masih & arash.jpg" },
        { title: ' Do Del', artist: ' Pakan ', src: 'music1/Pakan - Do Del [SevilMusic].mp3', img: 'Do Del - Pakan.jpg' },
        { title: ' Eshghe Alaki  ', artist: 'Sijal & Sepehr Khalse & Sohrab MJ & Heliyom', src: 'music1/Sijal & Sepehr Khalse & Sohrab MJ & Heliyom - Eshghe Alaki (320).mp3', img: "Eshghe Alaki (Ft Sohrab MJ & Heliyom) - Sijal & Sepehr Khalse.jpg " },
        { title: ' Ghesse Kootah', artist: 'Kiarash & AAren', src: 'music1/Kiarash & AAren - Ghesse Kootah (320).mp3', img: "Ghese Kootah - Kiyarash & Aaren.jpg" },
        { title: ' Ehaam ', artist: 'Gharib E Ashena ', src: 'music1/Ehaam - Gharib E Ashena.mp3', img: 'Gharib E Ashena - Ehaam.jpg' },
        { title: 'Mahi', artist: 'Naser Zeynali', src: 'music1/Naser Zeynali - Mahi.mp3', img: 'Mahi - Naser Zeynali.jpg' },
        { title: ' Mastam Baat', artist: 'Erfan & Shahin Najafi & Morvarid ', src: 'music1/Erfan & Shahin Najafi & Morvarid - Mastam Baat (320).mp3', img: "Mastam Baat - Erfan, Shahin Najafi, & Morvarid.jpg" },
        { title: 'Mowja', artist: ' Lara', src: 'music1/Lara - Mowja (320).mp3', img: "Mowja - Lara & Azi.jpg" },
        { title: 'Nade Ghol', artist: 'Ali Yasini ', src: 'music1/Ali Yasini - Nade Ghol.mp3', img: 'nade ghol.jpg' },
        { title: ' Sokoot', artist: 'Farzad Farzin', src: 'music1/Farzad Farzin - Sokoot.mp3', img: 'Sokoot - Farzad Farzin.jpg' },
        { title: '  Bi Janbeh ', artist: 'Arash ', src: 'music1/Arash - Bi Janbeh (320).mp3', img: "Bi Janbeh (Alfred Parx Remix) - Arash.jpg" },
        { title: 'Estefa', artist: 'Shahin Loo', src: 'music1/Shahin Loo - Estefa.mp3', img: "Estefa-Shahin Loo.jpg" },
        { title: 'Dooset Daram', artist: 'Armin Zarei ', src: 'music1/Armin Zarei - Dooset Daram (320).mp3', img: 'Dooset Daram - Armin 2AFM.jpg' },
    ];
    //////////////////اطلاعات آهنگ فعلی/در منو پلیر //////////////////////////
    let currentSongIndex = 0;
    const IMAGE_BASE = 'img/';
    function loadSong(index) {
        const song = playlist[index];
        audio.src = song.src;
        currentSongTitle.textContent = song.title;
        currentArtist.textContent = song.artist;
        albumCover.src = IMAGE_BASE + song.img;
        audio.load();
    }
    ////////////////////////توابع منو پلیر شروع و استپ کردن اهنگ////////////

    function playSong() {
        audio.play();
        playPauseBtn.innerHTML = `<i class="bi bi-pause-circle-fill"></i>`;
    }

    function pauseSong() {
        audio.pause();
        playPauseBtn.innerHTML = `<i class="bi bi-play-circle-fill"></i>`;
    }

    function togglePlayPause() {
        if (audio.paused) {
            playSong();
        } else {
            pauseSong();
        }
    }

    function playNextSong() {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        loadSong(currentSongIndex);
        playSong();
    }

    function playPrevSong() {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        loadSong(currentSongIndex);
        playSong();
    }


    playPauseBtn.addEventListener('click', togglePlayPause);
    playNextBtn.addEventListener('click', playNextSong);
    playPrevBtn.addEventListener('click', playPrevSong);

    /////////////////////لوود اهنگ و محاسبه زمان اهنگ در هر لحظه//////////////

    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100 || 0;
        progressBar.value = progress;

        const formatTime = (seconds) => {
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
        };

        currentTimeSpan.textContent = formatTime(audio.currentTime);
        if (audio.duration) {
            durationSpan.textContent = formatTime(audio.duration);
        }
    });

    audio.addEventListener('loadedmetadata', () => {
        const formatTime = (seconds) => {
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
        };
        durationSpan.textContent = formatTime(audio.duration);
    });

    progressBar.addEventListener('input', () => {
        const seekTime = (progressBar.value / 100) * audio.duration;
        audio.currentTime = seekTime;
    });
    ///////////////تنظیمات صدای پلیر//////////////////////////////////
    volumeSlider.addEventListener('input', () => {
        audio.volume = volumeSlider.value / 100;
    });

    audio.addEventListener('ended', () => {
        playNextSong();
    });

    ////////// کلیک روی کارت آهنگ‌ها//////////////////////
    musicCards.forEach((card, i) => {
        card.addEventListener("click", () => {
            currentSongIndex = i;
            loadSong(currentSongIndex);
            playSong();
        });
    });

    ///////// صدای اهنگ ///لود آهنگ اول///////////////////////////
    loadSong(currentSongIndex);
    audio.volume = volumeSlider.value / 100;

    /////////////////////باز و بسته کردن منو در حالت موبایل//////////////

    const toggleButton = document.getElementById('mobile-toggle');
    const closeButton = document.querySelector('.mobile-close');
    const overlay = document.querySelector('.overlay');
    const sidebar = document.querySelector('.sidebar');

    function toggleSidebar() {
        sidebar.classList.toggle("-translate-x-full");
        overlay.classList.toggle("hidden");
    }

    toggleButton.addEventListener('click', toggleSidebar);
    closeButton.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);

