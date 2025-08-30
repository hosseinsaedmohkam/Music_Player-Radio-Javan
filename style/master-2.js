

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
    const albumCover = document.getElementById('album-cover');

    ////////// تعریف مسیرهای پایه برای موسیقی و تصاویر/////////////////
    const MUSIC_BASE_PATH = 'radiosam/';
    //////////  فرض می‌کنیم تصاویر در پوشه قرار دارن///////////////////
    const IMAGE_BASE_PATH = 'img/';


    const playlist = [
        {
            title: 'فردوسی-داستان بیژن و منیژه ',
            artist: 'پارسا قربانیان',
            src: 'cn0hHUHmPEqRu7ojFHk4mCCTWAQyyk.mp3',
            img: 'بیژن ومنیژه.webp',
        },

        {
            title: 'یوتوری ژاپنی',
            artist: 'پارسا قربانیان',
            src: 'd8KaWzCdHGBja5rdHOVJnhKiJUUyXe.mp3',
            img: 'یوتوری.webp',
        },

        {
            title: 'سه اصل شادی میخاییل سیکسن',
            artist: 'پارسا قربانیان',
            src: 'uJmagf4pIPSjdj1bSYHFuooep7X0kQ.mp3',
            img: 'سه اصل شادی.jpg',
        },
        {
            title: 'آلکساندر آلخین، قهرمان شطرنج',
            artist: 'پارسا قربانیان',
            src: 'lOfr77vvHTXvPxDcC8kRYLHTn2vxYP.mp3',
            img: 'الخین.jpg',
        },
        {
            title: 'اصل مارشمالو',
            artist: 'پارسا قربانیان',
            src: 'GaZdnf3slDmR9dfdNiF9bGKKoEPWbp.mp3',
            img: 'اصل مارشمالو.webp',
        },

    ];
    let currentSongIndex = 0;
    let isPlaying = false; ////// وضعیت پخش//////

    ///////////////// تابع کمکی برای فرمت کردن زمان //////////////
    function formatTime(seconds) {
        if (isNaN(seconds) || seconds < 0) return "0:00";
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    ///////////////// تابع بارگذاری آهنگ جدید///////////////////
    function loadSong(index) {
        if (index < 0 || index >= playlist.length) {
            console.error("شاخص آهنگ نامعتبر است.");
            return;
        }
        const song = playlist[index];
        audio.src = MUSIC_BASE_PATH + song.src;
        currentSongTitle.textContent = song.title;
        currentArtist.textContent = song.artist;
        albumCover.src = IMAGE_BASE_PATH + song.img;
        audio.load(); // بارگذاری آهنگ جدید

        ////////// اگر آهنگ قبلی در حال پخش بوده، آهنگ جدید را هم پخش کن/////////////
        if (isPlaying) {
            playSong();
        } else {
            pauseSong();
        }
    }

    /////////////////// تابع پخش آهنگ///////////////////////////////
    function playSong() {
        audio.play();
        isPlaying = true;
        playPauseBtn.querySelector('i').classList.replace('bi-play-circle-fill', 'bi-pause-circle-fill');
    }

    ////////////////// تابع مکث آهنگ//////////////////////////
    function pauseSong() {
        audio.pause();
        isPlaying = false;
        playPauseBtn.querySelector('i').classList.replace('bi-pause-circle-fill', 'bi-play-circle-fill');
    }

    ////////////// جابجایی بین پخش و مکث//////////////////////
    function togglePlayPause() {
        if (audio.paused) {
            playSong();
        } else {
            pauseSong();
        }
    }

    /////////////////////// پخش آهنگ بعدی/////////////////////////////
    function playNextSong() {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        loadSong(currentSongIndex);
    }

    /////////////////////پخش آهنگ قبلی/////////////////////////////
    function playPrevSong() {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        loadSong(currentSongIndex);
    }

    playPauseBtn.addEventListener('click', togglePlayPause);
    playNextBtn.addEventListener('click', playNextSong);
    playPrevBtn.addEventListener('click', playPrevSong);

    //////////// به‌روزرسانی نوار پیشرفت و زمان////////////////////////////////////////
    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100 || 0;
        progressBar.value = progress;
        currentTimeSpan.textContent = formatTime(audio.currentTime);
    });

    ////////////// به‌روزرسانی مدت زمان کلی آهنگ وقتی دیتا بارگذاری شد///////////////////////
    audio.addEventListener('loadedmetadata', () => {
        durationSpan.textContent = formatTime(audio.duration);
    });

    ///////// کنترل نوار پیشرفت با کشیدن و رها کردن/////////////////////////////
    progressBar.addEventListener('input', () => {
        const seekTime = (progressBar.value / 100) * audio.duration;
        audio.currentTime = seekTime;
    });

    /////////// کنترل صدا///////////////////////////////
    volumeSlider.addEventListener('input', () => {
        audio.volume = volumeSlider.value / 100;
    });

    /////// وقتی آهنگ تموم شد، آهنگ بعدی رو پخش کن//////////////
    audio.addEventListener('ended', () => {
        playNextSong();
    });

    ////////// مدیریت خطا در بارگذاری آهنگ////////////////
    audio.addEventListener('error', () => {
        console.error("خطا در بارگذاری آهنگ: ", audio.error.message);
        currentSongTitle.textContent = "خطا در بارگذاری!";
        currentArtist.textContent = "فایل یافت نشد یا خراب است.";
    });

    /////////// مقداردهی اولیه پلیر با اولین آهنگ////////////////
    if (playlist.length > 0) {
        loadSong(currentSongIndex);
        audio.volume = volumeSlider.value / 100; // تنظیم اولیه صدا//
    } else {
        currentSongTitle.textContent = "لیست پخش خالی است.";
        currentArtist.textContent = "آهنگی برای پخش وجود ندارد.";
    }
