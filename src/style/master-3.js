
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
        { title: 'اهای مردم دنیا', artist: 'داریوش', src: 'music2/01 Ahay Mardome Donya.mp3', img: "dariosh-ahi mardom.jpg" },
        { title: 'چشم', artist: 'داریوش', src: 'music2/Dariush - Cheshme Man.mp3', img: "dariosh-chashm.webp" },
        { title: 'نون و پنیر و سبزی', artist: 'داریوش و ابی', src: 'music2/04 Noon o Panir o Sabzi.mp3', img: 'Dariush-Ebi-Noon-O-Panir-O-Sabzi.jpg' },
        { title: ' ستاره های سربی', artist: 'ابی', src: 'music2/02 - Ki Ashkato Pak Mikononeh.mp3', img: "ebi-setarehai sorbi.jpeg" },
        { title: 'مداد رنگی', artist: 'ابی', src: 'music2/Ebi - Madad Rangi (128).mp3', img: "آهنگ-مداد-رنگی-از-ابی-متن-ترانه-و-نسخه-بیکلام.webp" },
        { title: 'حریق سبز', artist: ' ابی', src: 'music2/Harighe Sabz-Ebi.mp3', img: 'آهنگ-حریق-سبز-ابی-متن-و-نسخه-بی-کلام.webp' },
        { title: 'فرنگیس', artist: 'سیاوش قمیشی', src: 'music2/Siavash Ghomayshi - Farangis (128).mp3', img: 'farangis.jpg' },
        { title: ' جزیره', artist: 'سیاوش قمیشی', src: 'music2/Siavash Ghomayshi - Jazireh (128).mp3', img: "Jazireh-Siavash-1.jpg" },
        { title: 'میلاد', artist: 'سیاوش قمیشی', src: 'music2/Siavash Ghomayshi - Milad (128).mp3', img: "Milad-Siavash-ghomayshi.jpg" },
        { title: 'دنیا', artist: ' حبیب', src: 'music2/Habib - Donya.mp3', img: 'آهنگ-حریق-سبز-ابی-متن-و-نسخه-بی-کلام.webp' },
        { title: 'بزن تار', artist: 'هایده', src: 'music2/2.Bezan Tar.mp3', img: 'Hayedeh-Bezan-Taar-Remix.jpg' },
        { title: ' عسل چشم', artist: 'هایده', src: 'music2/8.Asal Chesham.mp3', img: "هایده عسل چشم.jfif" },
        { title: 'ساقی', artist: 'هایده', src: 'music2/07 Saghi.mp3', img: "Hayedeh-Saghi-Noyan-Bahadori-Remix.jpg" },
        { title: 'حسرت', artist: 'شکیلا ', src: 'music2/Shakila - Hasrat [320].mp3', img: 'شکیلا-حسرت.jpg' },
        { title: 'غوغای ستارگان', artist: 'شکیلا ', src: 'music2/03 Ghoghaye Setaregan.mp3', img: 'Shakila-Ghoghaye-Setaregan-432Hz.jpg' },
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
