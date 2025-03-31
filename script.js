
onload = () => {
    const darkSwalTheme = {
        customClass: {
            popup: 'swal2-dark-popup',
            title: 'swal2-dark-title',
            htmlContainer: 'swal2-dark-html-container',
            confirmButton: 'swal2-dark-confirm',
            input: 'swal2-dark-input'
        }
    };

    const state = {
        userName: 'Dear Friend',
        currentWishIndex: 0
    };

    const config = {
        batchSize: 3,
        wishDelay: 4000,
        circles: [
            {
                size: 80,
                color: '#ff4500',
                top: '5%',
                left: '10%',
                duration: '5s'
            },
            {
                size: 120,
                color: '#1e90ff',
                top: '50%',
                left: '70%',
                duration: '7s'
            },
            {
                size: 60,
                color: '#ffd700',
                top: '75%',
                left: '50%',
                duration: '6s'
            },
            {
                size: 100,
                color: '#00ff99',
                top: '35%',
                left: '5%',
                duration: '8s'
            },
            {
                size: 90,
                color: '#ff69b4',
                top: '25%',
                left: '75%',
                duration: '6.5s'
            },
            {
                size: 110,
                color: '#32cd32',
                top: '80%',
                left: '5%',
                duration: '7.5s'
            }
        ],
        textArray: [
            '🌙',
            'E',
            'i',
            'd',
            ' ',
            'M',
            'u',
            'b',
            'a',
            'r',
            'a',
            'k',
            '🌙'
        ],
        wishes: [
            "May this Eid bring you joy, peace, and prosperity! 🌟",
            "Eid Mubarak! Wishing you a day filled with love and happiness. 💖",
            "May your heart be filled with warmth and gratitude this Eid. 😊",
            "Sending you blessings of health, wealth, and success! ✨",
            "Eid Mubarak! May your home be filled with light and laughter. 🏡🌙",
            "Wishing you and your family an Eid full of harmony and blessings. 🤗",
            "May your prayers be answered and your heart be filled with peace. 🙏",
            "Celebrate Eid with a heart full of love and kindness! ❤️",
            "Eid Mubarak! May your dreams and hopes come true. 🌈",
            "Happiness, prosperity, and success – may they all be yours this Eid! 🎉"
        ]
    };


    const sleep = ms => new Promise(res => setTimeout(res, ms));
    const getById = id => document.getElementById(id);

    /*** ✨ Visual Effects ***/
    const createFloatingCircles = () => {
        const container = getById('circleContainer');
        config.circles.forEach(({ size, color, top, left, duration }) => {
            const div = document.createElement('div');
            div.classList.add('circle');
            Object.assign(div.style, {
                width: `${size}px`,
                height: `${size}px`,
                background: color,
                top,
                left,
                animationDuration: duration
            });
            container.appendChild(div);
        });
    };

    const createStars = count => {
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.textContent = '*';
            Object.assign(star.style, {
                zIndex: '-1',
                position: 'absolute',
                color: 'white',
                fontSize: '12px',
                opacity: Math.random(),
                left: `${Math.random() * window.innerWidth}px`,
                top: `${Math.random() * window.innerHeight}px`,
                animation: `twinkle ${Math.random() * 1.5 + 1}s infinite alternate`
            });
            document.body.appendChild(star);
        }
    };

    const animateText = () => {
        const container = getById('eidText');
        config.textArray.forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            char === ' ' ? span.classList.add('space') : (span.style.animationDelay = `${index * 0.15}s`);
            container.appendChild(span);
        });
    };

    const playMusicOnClick = () => {
        const music = getById('music');
        document.addEventListener('click', () => {
            music.load();
            music.volume = 0.5;
            music.play();
        }, { once: true });
    };


    const generateWish = () => {
        const wishText = getById('wishText');
        const wishBox = getById('wishBox');
        wishBox.classList.add('clicked');
        let index = 0;

        const showNextWish = () => {
            if (index < config.wishes.length) {
                wishText.style.opacity = 0;
                setTimeout(() => {
                    wishText.textContent = config.wishes[index];
                    wishText.style.opacity = 1;
                    wishBox.classList.add("clicked");
                    index++;
                    setTimeout(showNextWish, 3000);
                }, 500);
            } else {
                setTimeout(() => {
                    wishBox.classList.remove('clicked');
                }, 1000);
            }
        };

        requestAnimationFrame(showNextWish);
    };

    window.generateWish = generateWish;


    const setNameText = () => {
        const nameText = getById('nameText');
        nameText.textContent = `❤️To you❤️, ${state.userName}🥰`;
        nameText.style.opacity = 1;
    };

    const showWishBox = () => {
        getById('wishBox').style.opacity = 1;
    };

    const showWelcomeSwal = () => {
        return Swal.fire({
            title: 'Enter your sweet name 🤗',
            input: 'text',
            inputPlaceholder: 'Your lovely name...',
            confirmButtonText: "Let's Go! 🎉",
            allowOutsideClick: false,
            backdrop: true,
            inputAttributes: { autocapitalize: 'off' },
            ...darkSwalTheme
        });
    };

    const showIntroSwal = () => {
        return Swal.fire({
            title: '🎉Welcome to the Eid Celebration! 🌙',
            html: 'Click the <h2><b style ="color:yellow;">Click Me</b></h2> button to receive random special Eid wishes! 🎁',
            icon: 'success',
            confirmButtonText: 'Got it! ✨',
            allowOutsideClick: false,
            backdrop: true,
            ...darkSwalTheme
        });
    };

    const startEidAnimation = async () => {
        createFloatingCircles();
        createStars(150); // ✅ Reduce from 150 to 50
        animateText();
        playMusicOnClick();

        await showIntroSwal();
        setTimeout(setNameText, 2000);
        setTimeout(showWishBox, 3000);
    };


    Swal.fire({
        title: 'Happy Eid 2025! 🎉',
        html: 'Wishing you all <h2><b style="color: orange;">Happy Eid</b></h2> May this Eid bring Joys and Happiness! 🙌✨',
        icon: 'success',
        confirmButtonText: 'Awesome! 😍',
        allowOutsideClick: false,
        backdrop: true,
        ...darkSwalTheme
    }).then(() => {
        showWelcomeSwal().then(result => {
            if (result.value && result.value.trim()) {
                state.userName = result.value.trim();
            }
            startEidAnimation();
        });
    });
};
